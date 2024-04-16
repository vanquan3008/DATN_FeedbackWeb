from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import json
import datetime
import re
import openpyxl
from openpyxl import load_workbook
import io
import pandas as pd
from io import StringIO


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


def find_filename(data):
    match = re.search(r'filename="([^"]+)"', data)
    if match:
        filename = match.group(1)
        return filename
    else:
        return None


def extract_json_string(data):
    match = re.search(r"\[([\s\S]*)\]", data)
    if match:
        json_string = match.group(0)  # get [ ]
        return json_string
    else:
        return None


@csrf_exempt
def sentiment_file_json_analysis(request):
    if request.method == "POST":
        data = request.body.decode("utf-8")
        json_data = json.loads(extract_json_string(data))

        print(json_data)

        return JsonResponse({"data": data})

    else:
        return HttpResponse("Method not allowed.")


def extract_csv_from_string(data_bytes):
    data_string = data_bytes.decode()
    # find index of start and end of csv data
    start_index = data_string.find("\r\n\r\n") + len("\r\n\r\n")
    end_index = data_string.rfind("\r\n----------------------------")

    csv_data = data_string[start_index:end_index].strip()
    return csv_data


@csrf_exempt
def sentiment_file_csv_analysis(request):  # error when has many , in csv
    if request.method == "POST":
        data = request.body
        csv_data = extract_csv_from_string(data)
        # read data to csv
        df = pd.read_csv(StringIO(csv_data))

        print(df)
        return JsonResponse({"data": csv_data})
    else:
        return HttpResponse("Method not allowed.")
