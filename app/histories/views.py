from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import datetime
import json
from dotenv import load_dotenv
from django.core.paginator import Paginator

from users.models import User
from histories.models import Result_file, Result_text

from users.permissions import verify_token


# Create your views here.
# http://127.0.0.1:8000/get_list_history_sentiment/?page=2
@csrf_exempt
def get_list_history_sentiment(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        page_size = 5
        user_id = data["user_id"]
        user = User.objects.filter(user_id=user_id)
        if user.exists():
            lHistory = Result_text.objects.filter(user=user_id)
            listHistory = lHistory[::-1]
            # Paginator page
            if len(listHistory) > 0:
                paginator = Paginator(listHistory, page_size)
                page = request.GET.get("page", 1)
                page_obj = paginator.get_page(page)
                number_page = int((len(listHistory) - 1) / 5) + 1
                print(number_page)

                data_loads = [
                    {
                        "id_text": history.id_text,
                        "text_content": history.text_content,
                        "date_save": history.date_save,
                        "sentiment": history.sentiment,
                        "detail_sentiment": history.detail_sentiment,
                    }
                    for history in page_obj
                ]
            else:
                data_loads = []
                number_page = 0
            return JsonResponse(
                {"history": data_loads, "numberPage": number_page}, status=200
            )

        else:
            return JsonResponse({"message": "Can not find User "}, status=404)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def get_list_file_history_sentiment(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        page_size = 5
        user_id = data["user_id"]
        user = User.objects.filter(user_id=user_id)
        if user.exists():
            lHistory = Result_file.objects.filter(user=user_id)
            listHistory = lHistory[::-1]
            # Paginator page
            if len(listHistory) > 0:
                paginator = Paginator(listHistory, page_size)
                page = request.GET.get("page", 1)
                page_obj = paginator.get_page(page)
                number_page = int((len(listHistory) - 1) / 5) + 1
                print(number_page)

                data_loads = [
                    {
                        "id_file": history.id_file,
                        "file_name": history.file_name,
                        "date_save": history.date_save,
                        "emotion_sentiment": history.emotion_sentiment,
                        "attitude_sentiment": history.attitude_sentiment,
                        "number_pos": history.number_pos,
                        "number_neg": history.number_neg,
                        "number_neu": history.number_neu,
                    }
                    for history in page_obj
                ]
            else:
                data_loads = []
                number_page = 0
            return JsonResponse(
                {"history": data_loads, "numberPage": number_page}, status=200
            )

        else:
            return JsonResponse({"message": "Can not find User "}, status=404)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
@require_http_methods(["POST"])
def delete_text_history(request, text_id):
    if request.method == "POST":
        data = json.loads(request.body)
        token = request.headers.get("token")
        r_email = data.get("email")
        if verify_token(token, email=r_email):
            text_history = Result_text.objects.filter(id_text=text_id)
            if text_history:
                if text_history.first().user.email == r_email:
                    text_history.delete()
                    res = JsonResponse(
                        {"Status": "Delete history is Successfully"}, status=200
                    )

                else:
                    res = JsonResponse(
                        {"error": "Result history does not belong for you"}, status=200
                    )
            else:
                res = JsonResponse(
                    {"error": "Result text history is not found"}, status=404
                )
        else:
            res = JsonResponse({"error": "Can not Authentication"}, status=403)

        return res
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )
