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


# Create your views here.
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

        print(r_email, r_password)

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
def analyze_json_file(request):
    if request.method == "POST":
        data = request.body.decode("utf-8")
        print(data)
        return data
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def analyze_csv_file(request):
    if request.method == "POST":
        data = request.body
        print(data)
        return data
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def post_status(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            r_user_id = data.get("user_id")
            r_content_post = data.get("content")
            r_image_content_url = data.get("image_content_url")

            time_post = datetime.datetime.now()

            Post.objects.create(
                user_id=User.objects.get(user_id=r_user_id),
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
                id_post=Post.objects.get(id_post=r_post_id),
                user_id=User.objects.get(user_id=r_user_id),
                comment_content=r_comment_content,
            )
            print(r_user_id, r_post_id, r_comment_content)
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
def get_all_post(request):
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
                print(posts_data)
                return JsonResponse(
                    {"message": "Get all post successfully"}, status=200
                )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def get_all_comments_on_post(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            r_user_id = data.get("user_id")
            r_post_id = data.get("id_post")
            if r_user_id is None or r_post_id is None:
                raise ValueError("user_id and id_post are required")

            # Check exist post
            if not Post.objects.filter(user_id=r_user_id, id_post=r_post_id).exists():
                return JsonResponse({"error": "Post not found"}, status=404)

            # Get all comment of post
            post_comments = Detail_post.objects.filter(id_post=r_post_id)
            comments_data = [
                {"id": comment.comment_id, "content": comment.comment_content}
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
