from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import datetime
import json
from django.forms.models import model_to_dict
import re
import pandas as pd
import io, csv
import os
from dotenv import load_dotenv
import openai
from openai import OpenAI
from django.core.paginator import Paginator

# Models
from comments.models import Detail_post
from users.models import User
from posts.models import Post, Report
from histories.models import Result_file, Result_text
from users.permissions import verify_token
from users.serializers import UserSerializer

# Create your views here.
from models.views import (
    sentiment_a_sentence,
    count_pos_neg_neu_sentences,
    sentiment_basedaspect_a_sentence,
    emotion_a_sentence,
    attitude_a_sentence,
    score_sentiment_a_sentence,
    mapping_detail_sentiment,
    count_exactly_sentiment,
)




def extract_detail_basedaspect_from_response(json_data):
    text_data = ""
    for key, value in json_data.items():
        if isinstance(value, list):
            # Xử lý các khóa có giá trị là danh sách
            for item in value:
                # Duyệt qua từng mục trong danh sách
                item_text = f"'sentence analyze': '{item['sentence analyze']}', 'sentiment': '{item['sentiment']}', 'aspect': '{item['aspect']}', 'opinion': '{item['opinion']}'"
                text_data += f"{{{item_text}}}\n"
            text_data += "\n"
        else:
            pass
    return text_data


def extract_detail_emotion_a_sentence(sentences):
    text_data = ""
    for sentence in sentences:
        emotion = emotion_a_sentence(sentence)
        text_data += f"'sentence': '{sentence}', 'emotion': '{emotion}'\n"
    return text_data


def extract_detail_attitude_a_sentence(sentences):
    text_data = ""
    for sentence in sentences:
        attitude = attitude_a_sentence(sentence)
        text_data += f"'sentence': '{sentence}', 'attitude': '{attitude}'\n"
    return text_data


############### Text Analysis ###############


@csrf_exempt
def analyze_text(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        user_id = data["user_id"]
        detail_sentiment = json.loads(sentiment_basedaspect_a_sentence(text))
        # detail_sentiment = extract_detail_basedaspect_from_response(detail_sentiment)
        sentiment = sentiment_a_sentence(text)
        if user_id:
            try:
                user_instance = User.objects.get(pk=user_id)

            except User.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=404)
            time_save = datetime.datetime.now()
            result_text = Result_text.objects.create(
                user=user_instance,
                text_content=text,
                sentiment=sentiment,
                date_save=time_save,
                detail_sentiment=detail_sentiment,
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
        detail_sentiment = sentiment_basedaspect_a_sentence(text)

        return JsonResponse({"message": detail_sentiment}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


############## Txt file analysis ###############


def extract_txt_string(data):
    start_index = data.find("Content-Type: text/plain\r\n\r\n") + len(
        "Content-Type: text/plain\r\n\r\n"
    )
    end_index = data.find("\r\n\r\n-")
    extracted_string = data[start_index:end_index]

    return extracted_string


def extract_filename(data):
    start_index_filename = data.find("filename=") + len("filename=")
    end_index_filename = data.find("\nContent-Type")
    filename = data[start_index_filename:end_index_filename]
    filename = filename.split("\\")[-1]
    filename = filename.strip('"').strip()
    filename = filename.rstrip('"')
    return filename


@csrf_exempt
def analyze_txt_detail_sentiment_file(request):
    if request.method == "POST":
        data = request.body.decode("utf-8")
        user_id = request.POST.get("user_id")
        txt_data = extract_txt_string(data).split("\r\n")
        filename = extract_filename(data)
        sentences = [sentence for sentence in txt_data if len(sentence) > 0]

        sentiment_sentences = []
        for text in sentences:
            score = score_sentiment_a_sentence(text)
            float_score = float(score)
            sentiment = mapping_detail_sentiment(float_score)
            # Create a dictionary with the desired structure
            sentiment_sentence = {"text": text, "sentiment": sentiment}
            sentiment_sentences.append(sentiment_sentence)

        return JsonResponse({"message": sentiment_sentences}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def analyze_txt_file(request):
    if request.method == "POST":
        data = request.body.decode("utf-8")
        user_id = request.POST.get("user_id")
        txt_data = extract_txt_string(data).split("\r\n")
        filename = extract_filename(data)
        sentences = [sentence for sentence in txt_data if len(sentence) > 0]

        # based_aspect_sentiment = sentiment_basedaspect_a_sentence(sentences)
        emotion_sentiment = extract_detail_emotion_a_sentence(sentences)
        attitude_sentiment = extract_detail_attitude_a_sentence(sentences)
        data_response = count_pos_neg_neu_sentences(sentences)
        pos_count = data_response["positive"]
        neg_count = data_response["negative"]
        neu_count = data_response["neutral"]
        if user_id:
            try:
                user_instance = User.objects.get(pk=user_id)
            except User.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=404)
            time_save = datetime.datetime.now()
            result_file = Result_file.objects.create(
                user=user_instance,
                file_name=filename,
                date_save=time_save,
                emotion_sentiment=emotion_sentiment,
                attitude_sentiment=attitude_sentiment,
                number_pos=pos_count,
                number_neg=neg_count,
                number_neu=neu_count,
            )
            result_file.save()

        data_response_show = count_exactly_sentiment(sentences)

        return JsonResponse(
            {
                "count_sentiment": data_response_show,
                "attitude_sentiment": attitude_sentiment,
                "emotion_sentiment": emotion_sentiment,
            },
            status=200,
        )
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


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
            user_id = request.POST.get("user_id")
            
            filename = extract_filename(data)
            csv_string = extract_string_csv(data)
            df = pd.read_csv(io.StringIO(csv_string))
            texts = df['product_description'].tolist()
            
            emotion_sentiment = extract_detail_emotion_a_sentence(texts)
            attitude_sentiment = extract_detail_attitude_a_sentence(texts)
            data_response = count_pos_neg_neu_sentences(texts)
            
            pos_count = data_response["positive"]
            neg_count = data_response["negative"]
            neu_count = data_response["neutral"]

            if user_id:
                try:
                    user_instance = User.objects.get(pk=user_id)
                except User.DoesNotExist:
                    return JsonResponse({"error": "User not found"}, status=404)
                time_save = datetime.datetime.now()
                result_file = Result_file.objects.create(
                    user=user_instance,
                    file_name=filename,
                    date_save=time_save,
                    emotion_sentiment=emotion_sentiment,
                    attitude_sentiment=attitude_sentiment,
                    number_pos=pos_count,
                    number_neg=neg_count,
                    number_neu=neu_count,
                )
                result_file.save()
            else:
                print("Required login user")

            data_response_show = count_exactly_sentiment(texts)

            return JsonResponse(
                {
                    "count_sentiment": data_response_show,
                    "attitude_sentiment": attitude_sentiment,
                    "emotion_sentiment": emotion_sentiment,
                },
                status=200,
            )
        except Exception as e:
            return JsonResponse({"error message": e}, status=400)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def analyze_csv_detail_sentiment_file(request):
    if request.method == "POST":
        try:
            data = request.body.decode("utf-8")
            user_id = request.POST.get("user_id")
            filename = extract_filename(data)
            csv_string = extract_string_csv(data)
            df = pd.read_csv(io.StringIO(csv_string))

            key_word = "product_description"
            texts = df[key_word].tolist()

            sentiment_sentences = []
            for text in texts:
                score = score_sentiment_a_sentence(text)
                float_score = float(score)
                sentiment = mapping_detail_sentiment(float_score)
                # Create a dictionary with the desired structure
                sentiment_sentence = {"text": text, "sentiment": sentiment}
                sentiment_sentences.append(sentiment_sentence)

            return JsonResponse({"message": sentiment_sentences}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


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
        user_id = request.POST.get("user_id")
        filename = extract_filename(data)
        json_string = extract_json_string(data)

        json_data = json.loads(json_string)

        key_word = "review"
        texts = [json_data[i][key_word] for i in range(len(json_data))]

        emotion_sentiment = extract_detail_emotion_a_sentence(texts)
        attitude_sentiment = extract_detail_attitude_a_sentence(texts)
        data_response = count_pos_neg_neu_sentences(texts)
        pos_count = data_response["positive"]
        neg_count = data_response["negative"]
        neu_count = data_response["neutral"]

        if user_id:
            try:
                user_instance = User.objects.get(pk=user_id)

            except User.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=404)
            time_save = datetime.datetime.now()
            result_file = Result_file.objects.create(
                user=user_instance,
                file_name=filename,
                date_save=time_save,
                emotion_sentiment=emotion_sentiment,
                attitude_sentiment=attitude_sentiment,
                number_pos=pos_count,
                number_neg=neg_count,
                number_neu=neu_count,
            )
            result_file.save()

        data_response_show = count_exactly_sentiment(texts)

        return JsonResponse(
            {
                "count_sentiment": data_response_show,
                "attitude_sentiment": attitude_sentiment,
                "emotion_sentiment": emotion_sentiment,
            },
            status=200,
        )
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def analyze_json_detail_sentiment_file(request):
    if request.method == "POST":
        data = request.body.decode("utf-8")
        user_id = request.POST.get("user_id")
        filename = extract_filename(data)
        json_string = extract_json_string(data)

        json_data = json.loads(json_string)

        key_word = "review"
        texts = [json_data[i][key_word] for i in range(len(json_data))]

        sentiment_sentences = []
        for text in texts:
            score = score_sentiment_a_sentence(text)
            float_score = float(score)
            sentiment = mapping_detail_sentiment(float_score)
            # Create a dictionary with the desired structure
            sentiment_sentence = {"text": text, "sentiment": sentiment}
            sentiment_sentences.append(sentiment_sentence)

        return JsonResponse({"message": sentiment_sentences}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


############### Handle with Post ###############


@csrf_exempt
def create_post(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            r_user_id = data.get("user_id")
            r_content_post = data.get("content")
            r_title_post = data.get("title")
            r_image_content_url = data.get("image_content_url")
            user_created = User.objects.get(user_id=r_user_id)
            authorization_header = request.headers.get("token")

            if verify_token(authorization_header, user_created.email):
                time_post = datetime.datetime.now()

                Post.objects.create(
                    user=User.objects.get(user_id=r_user_id),
                    content_post=r_content_post,
                    title_post=r_title_post,
                    image_content_url=r_image_content_url,
                    date_post=time_post,
                )

                response = JsonResponse(
                    {"message": "Post status successfully"}, status=200
                )
            else:
                response = JsonResponse(
                    {"message": "You are not Authentication"}, status=403
                )

            return response
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def get_all_post(request):
    if request.method == "GET":
        try:
            all_post = Post.objects.all()
            serializer = UserSerializer()
            if not all_post.exists():
                return JsonResponse(
                    {"error": "Do not have user id", "list_post": []}, status=200
                )
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
            {"error": "Only GET requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def get_all_post_by_userid(request):
    if request.method == "POST":
        data = json.loads(request.body)
        authorization_header = request.headers.get("token")
        try:
            r_user_id = data.get("user_id")
            user = User.objects.get(user_id=r_user_id)
            user_posts = Post.objects.filter(user=r_user_id)

            if not user_posts.exists():
                return JsonResponse({"error": "Do not have user id"}, status=404)
            else:
                if verify_token(authorization_header, user.email):
                    posts_data = [
                        {
                            "id_post": post.id_post,
                            "content": post.content_post,
                            "date_post": post.date_post,
                            "image_content_url": post.image_content_url,
                            "title": post.title_post,
                            
                        }
                        for post in user_posts
                    ]
                    res = JsonResponse({"message": posts_data}, status=200)
                else:
                    res = JsonResponse(
                        {"error": "You are not Authentication"}, status=403
                    )

                return res
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
        r_post_id = data.get("id_post")
        r_user_id = data.get("user_id")
        try:
            user_delete = User.objects.get(user_id=r_user_id)
            authorization_header = request.headers.get("token")

            if r_post_id is None:
                raise ValueError("id_post are required")
            # Check exist post
            if not Post.objects.filter(id_post=r_post_id).exists():
                return JsonResponse({"error": "Post not found"}, status=404)

            if verify_token(authorization_header, user_delete.email):
                post_delete = Post.objects.get(id_post=r_post_id)
                post_delete.delete()
                res = JsonResponse(
                    {"message": "Delete  post successfully"},
                    status=200,
                )
            else:
                res = JsonResponse(
                    {"message": "Can not authentication user to delete post"},
                    status=403,
                )
            return res

        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=400)

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
