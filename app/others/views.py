from django.shortcuts import render
import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import re
import json
import pandas as pd
from dotenv import load_dotenv
import openai
from openai import OpenAI
from collections import defaultdict

from models.views import (
    sentiment_a_sentence,
    count_pos_neg_neu_sentences,
    sentiment_basedaspect_a_sentence,
    emotion_a_sentence,
    attitude_a_sentence,
    score_sentiment_a_sentence,
    mapping_sentiment,
    mapping_detail_sentiment,
    count_exactly_sentiment,
    check_legal_emotion,
    check_legal_attitude,
)


from users.permissions import verify_token

headers_shopee = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "vi,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
    "Referer": "https://shopee.vn/",
    "Sec-Ch-Ua": '"Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
}


def extract_idshop_iditem_from_url_shopee(url):
    pattern = r"i\.(\d+)\.(\d+)"
    matches = re.findall(pattern, url)
    if matches:
        shop_id, item_id = matches[0]
        return shop_id, item_id
    else:
        return None, None


def fetch_shopee_ratings(shop_id, item_id, headers, offset=0, limit=6):
    url = f"https://shopee.vn/api/v2/item/get_ratings"
    params = {
        "exclude_filter": 2,
        "filter": 0,
        "filter_size": 0,
        "flag": 1,
        "fold_filter": 0,
        "itemid": item_id,
        "limit": limit,
        "offset": offset,
        "relevant_reviews": False,
        "request_source": 2,
        "shopid": shop_id,
        "tag_filter": "",
        "type": 0,
        "variation_filters": "",
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
        return data.get("data", {}).get("ratings", [])
    except requests.RequestException as e:
        print(f"Không thể lấy dữ liệu: {e}")
        return []


def crawl_shopee_comments(url):
    shop_id, item_id = extract_idshop_iditem_from_url_shopee(url)
    all_comments = []
    for offset in range(0, 1000, 6):
        ratings = fetch_shopee_ratings(shop_id, item_id, headers_shopee, offset=offset)
        if not ratings:
            break
        for rating in ratings:
            comment = rating.get("comment")
            if comment:
                all_comments.append(comment)
    return all_comments


def clean_text_comment_shopee(all_comments):
    cleaned_comments = [
        comment.replace("Chất lượng sản phẩm:", "")
        .replace("Tính năng nổi bật:", "")
        .replace("Hương vị:", "")
        .replace("Mẫu mã:", "")
        .replace("Bao bì/", "")
        .replace("\n", " ")
        .strip()
        for comment in all_comments
    ]
    return cleaned_comments


def count_unique_emotions_sentences(sentences):
    emotions = defaultdict(int)
    for sentence in sentences:
        emotion = emotion_a_sentence(sentence)
        if check_legal_emotion(emotion):
            emotions[emotion] += 1
    return emotions


def count_unique_attitudes_sentences(sentences):
    attitudes = defaultdict(int)
    for sentence in sentences:
        attitude = attitude_a_sentence(sentence)
        if check_legal_attitude(attitude):
            attitudes[attitude] += 1
    return attitudes


@csrf_exempt
def comments_shopee_count_sentiments(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = request.headers.get("token")
        r_email = data.get("email")
        if verify_token(token, email=r_email):
            url = data.get("url")
            if not url:
                return JsonResponse({"error": "url is required"}, status=400)

            comments = crawl_shopee_comments(url)
            comments = clean_text_comment_shopee(comments)

            emotion_sentiment = count_unique_emotions_sentences(comments)
            attitude_sentiment = count_unique_attitudes_sentences(comments)
            data_response = count_pos_neg_neu_sentences(comments)
            pos_count = data_response["positive"]
            neg_count = data_response["negative"]
            neu_count = data_response["neutral"]

            count_detail_sentiments = count_exactly_sentiment(comments)

            return JsonResponse(
                {
                    "emotion_sentiment": emotion_sentiment,
                    "attitude_sentiment": attitude_sentiment,
                    "detail_sentiment": count_detail_sentiments,
                    "positive_count" :pos_count ,
                    "negative_count" :neg_count,
                    "neutral_count":neu_count
                },
                status=200,)
        
        else:
            return JsonResponse({"Un Authenticated"} , status=401)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def comments_shopee_analysis(request):
    if request.method == "POST":
        data = json.loads(request.body)
        url = data.get("url")
        if not url:
            return JsonResponse({"error": "url is required"}, status=400)

        comments = crawl_shopee_comments(url)
        comments = clean_text_comment_shopee(comments)

        sentiment_comments = []
        for comment in comments:
            score = score_sentiment_a_sentence(comment)
            float_score = float(score)
            sentiment = mapping_detail_sentiment(float_score)
            # Create a dictionary with the desired structure
            sentiment_comment = {"text": comment, "sentiment": sentiment}
            sentiment_comments.append(sentiment_comment)

        return JsonResponse(
            {
                "sentiment_detail_comments": sentiment_comments,
            },
            status=200,
        )
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


#################### LAZADA ####################

headers_lazada = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "vi,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
    "Referer": "https://lazada.vn/",
    "Sec-Ch-Ua": '"Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
}


def extract_item_id_from_url(url):
    match = re.search(r"i(\d+)-", url)
    if match:
        return match.group(1)
    return None


def fetch_lazada_reviews(item_id, headers, page=1):
    url = "https://acs-m.lazada.vn/h5/mtop.lazada.review.item.getreviewlist/1.0/"
    params = {
        "jsv": "2.6.1",
        "appKey": "24677475",
        "t": "1716458217367",
        "sign": "4ed541065aced334b71a05258bfce034",
        "api": "mtop.lazada.review.item.getreviewlist",
        "v": "1.0",
        "type": "originaljson",
        "isSec": "1",
        "AntiCreep": "true",
        "timeout": "20000",
        "dataType": "json",
        "sessionOption": "AutoLoginOnly",
        "x-i18n-language": "vi",
        "x-i18n-regionID": "VN",
        "isFirstScreenRequest": "true",
        "data": json.dumps(
            {"itemId": item_id, "isHidden": 0, "hasPageVersion": 1, "pageNo": page}
        ),
    }
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json().get("data", {}).get("reviewList", [])
    return []


def crawl_lazada_comments(url):
    item_id = extract_item_id_from_url(url)
    all_comments = []
    if item_id:
        for page in range(1, 6):
            reviews = fetch_lazada_reviews(item_id, headers_lazada, page=page)
            if not reviews:
                break
            for review in reviews:
                comment = review.get("reviewContent")
                if comment:
                    all_comments.append(comment)
    return all_comments


@csrf_exempt
def comments_lazada_analysis(request):
    if request.method == "POST":
        data = json.loads(request.body)
        url = data.get("url")
        if not url:
            return JsonResponse({"error": "url is required"}, status=400)

        item_id = extract_item_id_from_url(url)
        comments = crawl_lazada_comments(url)
        # comments = clean_text_comment_lazada(comments)

        # emotion_sentiment = count_unique_emotions_sentences(comments)
        # attitude_sentiment = count_unique_attitudes_sentences(comments)
        # data_response = count_pos_neg_neu_sentences(comments)
        # pos_count = data_response["positive"]
        # neg_count = data_response["negative"]
        # neu_count = data_response["neutral"]

        return JsonResponse(
            {
                "comments": comments,
                "item_id": item_id,
                # "emotion_sentiment": emotion_sentiment,
                # "attitude_sentiment": attitude_sentiment,
                # "positive_count": pos_count,
                # "negative_count": neg_count,
                # "neutral_count": neu_count,
            },
            status=200,
        )
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


#################### TIKI ####################

headers_tiki = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "vi,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
    "Referer": "https://tiki.vn/",
    "Sec-Ch-Ua": '"Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
}


def extract_idshop_iditem_from_url_tiki(url):
    shop_id_pattern = re.compile(r"spid=(\d+)")
    product_id_pattern = re.compile(r"p(\d+)\.html")

    shop_id_match = shop_id_pattern.search(url)
    product_id_match = product_id_pattern.search(url)

    shop_id = shop_id_match.group(1) if shop_id_match else None
    product_id = product_id_match.group(1) if product_id_match else None

    return shop_id, product_id


def fetch_tiki_ratings(product_id, spid, headers, page=1, limit=10):
    url = "https://tiki.vn/api/v2/reviews"
    params = {
        "limit": limit,
        "include": "comments,contribute_info,attribute_vote_summary",
        "product_id": product_id,
        "sort": "score|desc,id|desc,stars|all",
        "page": page,
        "spid": spid,
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
        return data.get("data", {})
    except requests.RequestException as e:
        print(f"Không thể lấy dữ liệu: {e}")
        return []


def crawl_tiki_comments(url):
    shop_id, item_id = extract_idshop_iditem_from_url_tiki(url)
    all_comments = []
    if shop_id and item_id:
        for page in range(1, 100):
            ratings = fetch_tiki_ratings(item_id, shop_id, headers_tiki, page=page)
            if not ratings:
                break
            for rating in ratings:
                comment = rating.get("content")
                if comment:
                    all_comments.append(comment)
    return all_comments


@csrf_exempt
def comments_tiki_count_sentiments(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = request.headers.get("token")
        r_email = data.get("email")
        if verify_token(token, email=r_email):
            url = data.get("url")
            if not url:
                return JsonResponse({"error": "url is required"}, status=400)

        comments = crawl_tiki_comments(url)

        emotion_sentiment = count_unique_emotions_sentences(comments)
        attitude_sentiment = count_unique_attitudes_sentences(comments)
        data_response = count_pos_neg_neu_sentences(comments)
        pos_count = data_response["positive"]
        neg_count = data_response["negative"]
        neu_count = data_response["neutral"]
        count_detail_sentiments = count_exactly_sentiment(comments)

        return JsonResponse(
            {
                "emotion_sentiment": emotion_sentiment,
                "attitude_sentiment": attitude_sentiment,
                "detail_sentiment": count_detail_sentiments,
                "positive_count" :pos_count ,
                "negative_count" :neg_count,
                "neutral_count":neu_count
            },
            status=200,
        )
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def comments_tiki_analysis(request):
    if request.method == "POST":
        data = json.loads(request.body)
        url = data.get("url")
        if not url:
            return JsonResponse({"error": "url is required"}, status=400)

        comments = crawl_tiki_comments(url)

        sentiment_comments = []
        for comment in comments:
            score = score_sentiment_a_sentence(comment)
            float_score = float(score)
            sentiment = mapping_detail_sentiment(float_score)
            # Create a dictionary with the desired structure
            sentiment_comment = {"text": comment, "sentiment": sentiment}
            sentiment_comments.append(sentiment_comment)

        return JsonResponse(
            {
                "sentiment_detail_comments": sentiment_comments,
            },
            status=200,
        )
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )
