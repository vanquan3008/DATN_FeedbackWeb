from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from dotenv import load_dotenv
import os
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
)
from others.views import (
    count_unique_emotions_sentences,
    count_unique_attitudes_sentences,
)
import nest_asyncio

load_dotenv()
API_SECRET_KEY = os.getenv("api_gpt_key")

nest_asyncio.apply()


def crawl_comments_by_ollama(url):
    graph_config = {
        "llm": {
            "api_key": API_SECRET_KEY,
            "model": "gpt-3.5-turbo",
        },
        "embeddings": {
            "model": "ollama/nomic-embed-text",
            "base_url": "http://localhost:11434",  # set ollama URL arbitrarily
        },
    }

    smart_scraper_graph = SmartScraperGraph(
        prompt="""Phân tích trang web này và thu thập tất cả các ý kiến cá nhân của người dùng liên quan đến bài viết.
            1. Lấy tất cả ý kiến độc giả, bình luận của người dùng ở dưới nội dung chính của bài viết.
            2. Trả về một danh sách các ý kiến với thông tin:
                - Nội dung ý kiến, bình luận
            3. Loại bỏ tất cả các phần không liên quan đến ý kiến hoặc bình luận.
            4. Đảm bảo rằng tất cả ý kiến và bình luận là thật, không tự tạo ra.
            5. Trả về kết quả dưới dạng  Object với cấu trúc như sau:{
                'user_opinions' = [
                    {
                        "comment": "Nội dung ý kiến hoặc bình luận"
                    },
                    ...
                ]
                }
            6. Đảm bảo rằng tất cả ý kiến và bình luận được lấy đầy đủ.""",
        source=f"{url}",
        config=graph_config,
    )

    result = smart_scraper_graph.run()
    return result


@csrf_exempt
def comments_detail_sentiment_ollama(request):
    if request.method == "POST":
        data = json.loads(request.body)
        url = data.get("url")
        data_crawing = crawl_comments_by_ollama(url)
        comments = data_crawing["user_opinions"]
        texts = []

        for comment in comments:
            texts.append(comment["comment"])
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
        data_crawing = crawl_comments_by_ollama(url)
        comments = data_crawing["user_opinions"]
        texts = []

        for comment in comments:
            texts.append(comment["comment"])
        # texts = [
        #     "Sản phẩm này thật sự tuyệt vời, tôi chưa từng thấy gì tốt hơn.",
        #     "Chất lượng của sản phẩm quá kém, tôi rất thất vọng.",
        #     "Tôi nghĩ sản phẩm này ổn, nhưng vẫn cần cải thiện thêm một số tính năng.",
        #     "Thiết kế của sản phẩm rất đẹp mắt và sang trọng.",
        #     "Giá cả hợp lý, nhưng dịch vụ hỗ trợ khách hàng cần, cải thiện.",
        # ]

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
