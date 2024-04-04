from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from .models import user
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.hashers import make_password, check_password
import datetime
import jwt


@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        r_fullname = data.get("fullname")
        r_email = data.get("email")
        r_password = data.get("password")
        hashed_password = make_password(r_password)

        if not user.objects.filter(email=r_email).exists():
            user.objects.create(
                fullname=r_fullname,
                email=r_email,
                password=hashed_password,
            )
            return JsonResponse({"message": "User registered successfully"}, status=200)
        else:
            return JsonResponse({"error": "Email already exists"}, status=400)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=405
        )


@csrf_exempt
def signin(request):
    if request.method == "POST":
        data = json.loads(request.body)
        r_email = data.get("email")
        r_password = data.get("password")

        user_signin = user.objects.filter(email=r_email)

        if (
            len(user_signin) == 1
            and user_signin[0].email == r_email
            and check_password(r_password, user_signin[0].password)
        ):
            data = "Sign in successful"

            loadjwt = {
                "email": user_signin[0].email,
                "expire": (
                    datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
                ).isoformat(),
                "timestart": (datetime.datetime.utcnow()).isoformat(),
            }
            token = jwt.encode(loadjwt, "secret", algorithm="HS256")

            response = JsonResponse({"status": data, "jwt": token})
            response.set_cookie(key="jwt", value=token, httponly=True)
        else:
            data = "Sign in failed"
            response = JsonResponse({"status": data})

        return response


@csrf_exempt
def logout(request):
    response = JsonResponse({"message": "Logged out successfully"})
    response.delete_cookie("jwt")
    return response
