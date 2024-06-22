from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

# Create your views here.
from scrapegraphai.graphs import SmartScraperGraph


def crawl_comments_by_ollama(url):
    graph_config = {
        "llm": {
            "model": "ollama/mistral",  # Kiểm tra tên và phiên bản mô hình
            "temperature": 0,
            "format": "json",
            "base_url": "http://localhost:11434",
        },
        "embeddings": {
            "model": "ollama/nomic-embed-text",  # Kiểm tra tên và phiên bản mô hình
            "base_url": "http://localhost:11434",
        },
        "verbose": True,
    }

    smart_scraper_graph = SmartScraperGraph(
        prompt="Hãy lấy tất cả comment trong trang web này và giữ nguyên ngôn ngữ gốc",
        source="http://localhost:1000/page/page1",
        config=graph_config,
    )

    result = smart_scraper_graph.run()
    print(result)


@csrf_exempt
def comments_ollama_analysis(request):
    if request.method == "POST":
        data = json.loads(request.body)
        url = data.get("url")
        crawl_comments_by_ollama(url)
        return JsonResponse({"message": url}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )
