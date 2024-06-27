from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from django.core.paginator import Paginator

# Create your views here.
from scrapegraphai.graphs import SmartScraperGraph
from models.views import (
    sentiment_a_sentence,
    count_pos_neg_neu_sentences,
    sentiment_basedaspect_a_sentence,
    emotion_a_sentence,
    attitude_a_sentence,
    score_sentiment_a_sentence,
    mapping_detail_sentiment,
    count_exactly_sentiment,
    API_SECRET_KEY,
)
from others.views import (
    count_unique_emotions_sentences,
    count_unique_attitudes_sentences,
)


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
        source=f"{url}",
        config=graph_config,
    )

    result = smart_scraper_graph.run()
    return result


def crawl_comments_by_ollama_openai(url):
    graph_config = {
        "llm": {
            "api_key": API_SECRET_KEY,
            "model": "gpt-3.5-turbo",
            # "model":"gpt-4.0-turbo",
        },
        "verbose": True,
    }
    smart_scrape_graph = SmartScraperGraph(
        prompt="Lấy và trả về những bình luận trong bài viết.",
        source=url,
        config=graph_config,
    )

    result = smart_scrape_graph.run()
    return result


@csrf_exempt
def comments_detail_sentiment_ollama(request):
    if request.method == "POST":
        data = json.loads(request.body)
        url = data.get("url")
        # texts = crawl_comments_by_ollama(url)
        texts = [
            "Sản phẩm này thật sự tuyệt vời, tôi chưa từng thấy gì tốt hơn.",
            "Chất lượng của sản phẩm quá kém, tôi rất thất vọng.",
            "Tôi nghĩ sản phẩm này ổn, nhưng vẫn cần cải thiện thêm một số tính năng.",
            "Thiết kế của sản phẩm rất đẹp mắt và sang trọng.",
            "Giá cả hợp lý, nhưng dịch vụ hỗ trợ khách hàng cần cải thiện.",
        ]
        sentiment_sentences = []
        for text in texts:
            score = score_sentiment_a_sentence(text)
            float_score = float(score)
            sentiment = mapping_detail_sentiment(float_score)
            # Create a dictionary with the desired structure
            sentiment_sentence = {"text": text, "sentiment": sentiment}
            sentiment_sentences.append(sentiment_sentence)

        page_size = 5

        if len(sentiment_sentences) > 0:
            paginator = Paginator(sentiment_sentences, page_size)
            page = request.GET.get("page", 1)
            page_obj = paginator.get_page(page)
            number_page = int((len(sentiment_sentences) - 1) / 5) + 1
            data_loads = [
                {
                    "sentiment": comment["sentiment"],
                    "text": comment["text"],
                }
                for comment in page_obj
            ]
        else:
            data_loads = []
            number_page = 0
        return JsonResponse(
            {"sentiment_detail_comments": data_loads, "page": number_page}, status=200
        )
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def comments_count_sentiment_ollama(request):
    if request.method == "POST":
        data = json.loads(request.body)
        url = data.get("url")
        # texts= crawl_comments_by_ollama(url)

        texts = [
            "Sản phẩm này thật sự tuyệt vời, tôi chưa từng thấy gì tốt hơn.",
            "Chất lượng của sản phẩm quá kém, tôi rất thất vọng.",
            "Tôi nghĩ sản phẩm này ổn, nhưng vẫn cần cải thiện thêm một số tính năng.",
            "Thiết kế của sản phẩm rất đẹp mắt và sang trọng.",
            "Giá cả hợp lý, nhưng dịch vụ hỗ trợ khách hàng cần, cải thiện.",
        ]

        emotion_sentiment = count_unique_emotions_sentences(texts)
        attitude_sentiment = count_unique_attitudes_sentences(texts)
        data_response_show = count_exactly_sentiment(texts)
        data_response = count_pos_neg_neu_sentences(texts)
        pos_count = data_response["positive"]
        neg_count = data_response["negative"]
        neu_count = data_response["neutral"]

        return JsonResponse(
            {
                "emotion_sentiment": emotion_sentiment,
                "attitude_sentiment": attitude_sentiment,
                "detail_sentiment": data_response_show,
                "positive_count": pos_count,
                "negative_count": neg_count,
                "neutral_count": neu_count,
            },
            status=200,
        )
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )
