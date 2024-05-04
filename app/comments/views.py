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

# Model
from .models import Detail_post
from posts.models import Post
from users.models import User

# Selilazer
from users.serializers import UserSerializer

from models.views import count_pos_neg_neu_sentences


# Create your views here.
@csrf_exempt
def create_comment_post(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            r_user_id = data.get("user_id")
            r_post_id = data.get("id_post")
            r_comment_content = data.get("comment_content")
            time_comment = datetime.datetime.now()

            Detail_post.objects.create(
                post=Post.objects.get(id_post=r_post_id),
                user=User.objects.get(user_id=r_user_id),
                comment_content=r_comment_content,
                date_comment=time_comment,
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
