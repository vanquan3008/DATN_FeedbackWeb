from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import datetime
import json

import jwt

from django.forms.models import model_to_dict
import re
import pandas as pd
import io, csv
import os
from dotenv import load_dotenv

import openai

from openai import OpenAI
from .serializers import UserSerializer
from django.core.paginator import Paginator
from .models import User

from models.views import (
    sentiment_a_sentence,
    count_pos_neg_neu_sentences,
    sentiment_basedaspect_a_sentence,
)

from users.permissions import generate_tokens, generate_refreshtokens, verify_token


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
            token = generate_tokens(user_signin)
            user_login = model_to_dict(user_signin[0])
            user_login.pop("password_user", None)
            # Refresh token
            refreshToken = generate_refreshtokens(user_signin)
            response = JsonResponse(
                {"status": "Sign in successful", "jwt": token, "userLogin": user_login}
            )
            response.set_cookie(
                key="refreshToken", value=refreshToken, httponly=True, secure=True
            )
        else:
            response = JsonResponse({"error": "Login fail"}, status=404)

        return response
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def logout(request):
    if request.method == "POST":
        response = JsonResponse({"message": "Logged out successfully"})
        authorization_header = request.headers.get("token")
        data = json.loads(request.body)

        if authorization_header:
            email = data.get("email")

            if verify_token(authorization_header, email):
                response = JsonResponse({"status": "User is logout"}, status=200)
            else:
                response = JsonResponse({"status": "Can not verify token"}, status=403)
        else:
            response = JsonResponse(
                {"status": "Can not token have authorization"}, status=404
            )

        return response

    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


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
def get_user_by_id(request):
    if request.method == "GET":
        try:
            user_id = request.GET.get("id")
            user = UserSerializer.get_user_id(user_id)
            if not user.exists():
                return JsonResponse({"error": "Do not have user"}, status=404)
            else:
                return JsonResponse(
                    {"message": "Get all post successfully" , "user" : user}, status=200
                )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )

@csrf_exempt
def refresh_token(request):
    if request.method == "POST":
        gettoken = request.COOKIES.get("refreshToken")
        if gettoken:
            token_ref = jwt.decode(gettoken, "secret", algorithms=["HS256"])
            user = User.objects.filter(email=token_ref["email"])
            newToken = generate_tokens(user)
            refresh = generate_refreshtokens(user)

            response = JsonResponse(
                {"status": "Sign in successful", "jwt": newToken}, status=200
            )
            response.set_cookie(
                key="refreshToken", value=refresh, httponly=True, secure=True
            )
            return response
        else:
            return JsonResponse({"error": "You are not Authentications"}, status=401)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )
