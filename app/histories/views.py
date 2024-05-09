from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import datetime
import json
from dotenv import load_dotenv
from django.core.paginator import Paginator

from users.models import User
from histories.models import Result_file , Result_text
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
            listHistory = Result_text.objects.filter(user=user_id)
            # Paginator page
            if len(listHistory) > 0:
                paginator = Paginator(listHistory, page_size)
                page = request.GET.get("page", 1)
                page_obj = paginator.get_page(page)
                
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
            else :
                data_loads = []
            
            number_page = int(len(data_loads)/5) + 1
           

            return JsonResponse({"history": data_loads , "numberPage" : number_page}, status=200)

        else:
            return JsonResponse({"message": "Can not find User "}, status=404)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )