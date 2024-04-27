from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from .models import User, Post, Report, Detail_post, Result_file, Result_text
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import datetime
import jwt
import json
from django.forms.models import model_to_dict
import re
import pandas as pd
import io, csv
import os
from dotenv import load_dotenv
import openai
from openai import OpenAI
from .serializers import UserSerializer

from models.views import (
    sentiment_a_sentence,
    count_pos_neg_neu_sentences,
    sentiment_basedaspect_a_sentence,
)


############### User ###############


@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        r_fullname = data.get("fullname")
        r_email = data.get("email")
        r_password = data.get("password")
        hashed_password = make_password(r_password)

        if not User.objects.filter(email=r_email).exists():
            User.objects.create(
                fullname=r_fullname,
                email=r_email,
                password_user=hashed_password,
            )
            return JsonResponse({"message": "User registered successfully"}, status=200)
        else:
            return JsonResponse({"error": "Email already exists"}, status=400)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def signin(request):
    if request.method == "POST":
        data = json.loads(request.body)
        r_email = data.get("email")
        r_password = data.get("password")
        user_signin = User.objects.filter(email=r_email)
        if (
            len(user_signin) == 1
            and user_signin[0].email == r_email
            and check_password(r_password, user_signin[0].password_user)
        ):
            data = "Sign in successful"
            loadjwt = {
                "email": user_signin[0].email,
                "expire": (
                    datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
                ).isoformat(),
                "timestart": (datetime.datetime.utcnow()).isoformat(),
            }
            user_login = model_to_dict(user_signin[0])
            user_login.pop("password", None)

            token = jwt.encode(loadjwt, "secret", algorithm="HS256")
            response = JsonResponse(
                {"status": data, "jwt": token, "userLogin": user_login}
            )

            response.set_cookie(key="jwt", value=token, httponly=True, secure=True)

        else:
            response = JsonResponse({"error": "Login fail"}, status=404)

        return response
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def logout(request):
    response = JsonResponse({"message": "Logged out successfully"})
    response.delete_cookie("jwt")
    return response


@csrf_exempt
def get_all_user(request):
    if request.method == "GET":
        try:
            user_all = User.objects.all()
            if not user_all.exists():
                return JsonResponse({"error": "Do not have user"}, status=404)
            else:
                user_data = [
                    {
                        "user_id": user.user_id,
                        "fullname": user.fullname,
                        "email": user.email,
                    }
                    for user in user_all
                ]
                print(user_data)
                return JsonResponse(
                    {"message": "Get all post successfully"}, status=200
                )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


####################################################################


############## Text analysis ###############


def extract_detail_basedaspect_from_response(json_data):
    text_data = ""
    for key, value in json_data.items():
        if isinstance(value, list):
            # Xử lý các khóa có giá trị là danh sách
            for item in value:
                # Duyệt qua từng mục trong danh sách
                item_text = f"'sentence analyze': '{item['sentence analyze']}', 'sentiment': '{item['sentiment']}', 'aspect': '{item['aspect']}', 'opinion': '{item['opinion']}'"  # Tạo chuỗi văn bản từ từ điển mục
                text_data += f"{{{item_text}}}\n"
            text_data += "\n"
        else:
            pass
    return text_data


@csrf_exempt
def analyze_text(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        user_id = data["user_id"]
        # print(text)
        sentiment = sentiment_a_sentence(text)
        detail_sentiment = json.loads(sentiment_basedaspect_a_sentence(text))
        detail_sentiment = extract_detail_basedaspect_from_response(detail_sentiment)
        print(detail_sentiment)

        if user_id:
            time_save = datetime.datetime.now()
            result_text = Result_text.objects.create(
                user=user_id,
                text_content=text,
                sentiment=sentiment,
                date_save=time_save,
                detail_sentiment=json.dumps(
                    detail_sentiment
                ),  # Lưu dưới dạng chuỗi JSON
            )
            result_text.save()

        return JsonResponse({"message": sentiment}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def analyze_detail_text(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        print(text)
        detail_sentiment = sentiment_basedaspect_a_sentence(text)

        return JsonResponse({"message": detail_sentiment}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


####################################################################


############## Txt file analysis ###############


def extract_txt_string(data):
    start_index = data.find("Content-Type: text/plain\r\n\r\n") + len(
        "Content-Type: text/plain\r\n\r\n"
    )
    end_index = data.find("\r\n\r\n-")
    extracted_string = data[start_index:end_index]
    return extracted_string


@csrf_exempt
def analyze_txt_file(request):
    if request.method == "POST":
        data = request.body.decode("utf-8")
        txt_data = extract_txt_string(data).split("\r\n")
        sentences = [sentence for sentence in txt_data if len(sentence) > 0]

        data_response = count_pos_neg_neu_sentences(sentences)

        return JsonResponse({"message": data_response}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


####################################################################


############### CSV file Analysis ###############


def extract_string_csv(data):
    start_index = data.find("Content-Type: text/csv") + len("Content-Type: text/csv")
    end_index = start_index

    # Tìm index của dấu - kết thúc file csv, chọn là 5 dấu -
    string_end = "-"
    count = 0
    while end_index < len(data) and count < 5:
        if data[end_index] == string_end:
            count += 1
        else:
            count = 0
        end_index += 1
    end_index = end_index - 5

    extracted_string = data[start_index:end_index]
    return extracted_string


@csrf_exempt
def analyze_csv_file(request):
    if request.method == "POST":
        try:
            data = request.body.decode("utf-8")
            print(data)
            csv_string = extract_string_csv(data)
            df = pd.read_csv(io.StringIO(csv_string))

            key_word = "product_description"
            texts = df[key_word].tolist()

            data_response = count_pos_neg_neu_sentences(texts)

            return JsonResponse({"message": data_response}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


####################################################################


############### Json file Analysis ###############


def extract_json_string(data):
    start_index = data.find("Content-Type: application/json") + len(
        "Content-Type: application/json"
    )
    end_index = start_index

    # Tìm index của dấu - kết thúc file csv, chọn là 5 dấu -
    string_end = "-"
    count = 0
    while end_index < len(data) and count < 5:
        if data[end_index] == string_end:
            count += 1
        else:
            count = 0
        end_index += 1
    end_index = end_index - 5

    extracted_string = data[start_index:end_index]
    return extracted_string


@csrf_exempt
def analyze_json_file(request):
    if request.method == "POST":
        data = request.body.decode("utf-8")
        json_string = extract_json_string(data)
        json_data = json.loads(json_string)

        key_word = "review"
        texts = [json_data[i][key_word] for i in range(len(json_data))]

        data_response = count_pos_neg_neu_sentences(texts)

        return JsonResponse({"message": data_response}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


####################################################################


############### Handle with Post, Comment ###############


@csrf_exempt
def get_all_post(request):
    if request.method == "GET":
        try:
            all_post = Post.objects.all()
            serializer = UserSerializer()
            if not all_post.exists():
                return JsonResponse({"error": "Do not have user id"}, status=404)
            else:
                posts_data = [
                    {
                        "title": post.title_post,
                        "id_post": post.id_post,
                        "content": post.content_post,
                        "date_post": post.date_post,
                        "image_content_url": post.image_content_url,
                        "user_post": serializer.get_user_id(post.user.user_id),
                    }
                    for post in all_post
                ]

                return JsonResponse(
                    {"message": "Get all post successfully", "list_post": posts_data},
                    status=200,
                )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def create_post(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            r_user_id = data.get("user_id")
            r_content_post = data.get("content")
            r_image_content_url = data.get("image_content_url")

            time_post = datetime.datetime.now()

            Post.objects.create(
                user=User.objects.get(user_id=r_user_id),
                content_post=r_content_post,
                image_content_url=r_image_content_url,
                date_post=time_post,
            )
            return JsonResponse({"message": "Post status successfully"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def post_comment_to_status(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            r_user_id = data.get("user_id")
            r_post_id = data.get("id_post")
            r_comment_content = data.get("comment_content")

            Detail_post.objects.create(
                post=Post.objects.get(id_post=r_post_id),
                user=User.objects.get(user_id=r_user_id),
                comment_content=r_comment_content,
            )
            return JsonResponse(
                {"message": "Comment on status successfully"}, status=200
            )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def get_all_post_by_userid(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            r_user_id = data.get("user_id")
            user_posts = Post.objects.filter(user_id=r_user_id)
            if not user_posts.exists():
                return JsonResponse({"error": "Do not have user id"}, status=404)
            else:
                posts_data = [
                    {
                        "id_post": post.id_post,
                        "content": post.content_post,
                        "date_post": post.date_post,
                        "image_content_url": post.image_content_url,
                    }
                    for post in user_posts
                ]

                return JsonResponse({"message": posts_data}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def delete_post(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            r_post_id = data.get("id_post")
            if r_post_id is None:
                raise ValueError("id_post are required")

            # Check exist post
            if not Post.objects.filter(id_post=r_post_id).exists():
                return JsonResponse({"error": "Post not found"}, status=404)
            post_delete = Post.objects.get(id_post=r_post_id)
            post_delete.delete()
            return JsonResponse(
                {"message": "Delete  post successfully"},
                status=200,
            )

        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=400)

    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def get_all_comments_on_post(request):
    if request.method == "POST":
        data = json.loads(request.body)
        serializer = UserSerializer()
        try:
            r_post_id = data.get("id_post")
            if r_post_id is None:
                raise ValueError("id_post are required")

            # Check exist post
            if not Post.objects.filter(id_post=r_post_id).exists():
                return JsonResponse({"error": "Post not found"}, status=404)

            # Get all comment of post
            post_comments = Detail_post.objects.filter(post=r_post_id)
            comments_data = [
                {
                    "id": comment.comment_id,
                    "content": comment.comment_content,
                    "user_comment": serializer.get_user_id(comment.user.user_id),
                }
                for comment in post_comments
            ]

            return JsonResponse(
                {
                    "comments": comments_data,
                    "message": "Get all comments on post successfully",
                },
                status=200,
            )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def static_all_comments_on_post(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            r_post_id = data.get("id_post")
            if r_post_id is None:
                raise ValueError("id_post are required")

            # Check exist post
            if not Post.objects.filter(id_post=r_post_id).exists():
                return JsonResponse({"error": "Post not found"}, status=404)

            # Get all comment of post
            post_comments = Detail_post.objects.filter(post=r_post_id)
            comments_data = [
                {"id": comment.comment_id, "content": comment.comment_content}
                for comment in post_comments
            ]

            texts = [comment for comment in comments_data if len(comment) > 0]

            data_response = count_pos_neg_neu_sentences(texts)

            return JsonResponse(
                {
                    "comments": data_response,
                    "message": "Get all comments on post successfully",
                },
                status=200,
            )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


####################################################################
