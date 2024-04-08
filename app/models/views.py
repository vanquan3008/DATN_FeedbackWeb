from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import json
import datetime


@csrf_exempt
def get_text(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        return data


@csrf_exempt
def sentiment_analysis(request):
    if request.method == "POST":
        data = get_text(request)
        return JsonResponse({"data": data})
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def get_file(request):
    return "file"
