from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_page1(request):
    if request.method == "POST" or request.method == "GET":
        return render(request, "newspaper/page1.html")


@csrf_exempt
def get_page2(request):
    if request.method == "POST" or request.method == "GET":
        return render(request, "newspaper/page2.html")


@csrf_exempt
def get_page3(request):
    if request.method == "POST" or request.method == "GET":
        return render(request, "newspaper/page3.html")


@csrf_exempt
def get_page4(request):
    if request.method == "POST" or request.method == "GET":
        return render(request, "newspaper/page4.html")


@csrf_exempt
def get_page5(request):
    if request.method == "POST" or request.method == "GET":
        return render(request, "newspaper/page5.html")
