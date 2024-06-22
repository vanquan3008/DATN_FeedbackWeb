from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import datetime
import jwt
import json
from django.forms.models import model_to_dict
import re
import pandas as pd
import io, csv
import os
from dotenv import load_dotenv
import openai

from openai import OpenAI


load_dotenv()
API_SECRET_KEY = os.getenv("api_gpt_key")
openai.api_key = API_SECRET_KEY
# Initialize the OpenAI client
client = OpenAI(api_key=openai.api_key)


def check_legal_emotion(word):
    word_lower = word.lower()
    legal_words = [
        "angry",
        "joyful",
        "sad",
        "fearful",
        "ashame",
        "pround",
        "elated",
        "not sure",
    ]
    if word_lower in legal_words:
        return True
    return False


def check_legal_attitude(word):
    word_lower = word.lower()
    legal_words = [
        "liking",
        "loving",
        "hating",
        "valuing",
        "desiring",
        "not sure",
    ]
    if word_lower in legal_words:
        return True
    return False


def mapping_sentiment(score):
    if round(score, 3) > 0.333:
        return "Positive"
    elif round(score, 3) < -0.333:
        return "Negative"
    elif round(score, 3) >= -0.333 and round(score, 3) <= 0.333:
        return "Neutral"


def mapping_detail_sentiment(score):
    if round(score, 3) >= -1 and round(score, 3) <= -0.8:
        return "Strong negative"
    elif round(score, 3) > -0.8 and round(score, 3) <= -0.5:
        return "Negative"
    elif round(score, 3) > -0.5 and round(score, 3) <= -0.3:
        return "Light negative"
    elif round(score, 3) > -0.3 and round(score, 3) <= -0.15:
        return "Neutral negative"
    elif round(score, 3) >= -0.15 and round(score, 3) <= 0.15:
        return "Neutral"
    elif round(score, 3) > 0.15 and round(score, 3) <= 0.3:
        return "Neutral positive"
    elif round(score, 3) > 0.3 and round(score, 3) <= 0.5:
        return "Light positive"
    elif round(score, 3) > 0.5 and round(score, 3) <= 0.8:
        return "Positive"
    elif round(score, 3) > 0.8 and round(score, 3) <= 1:
        return "Strong positive"


def score_sentiment_a_sentence(sentence):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"You are trained to analyze and detect the sentiment of the given text.\n\nPlease provide the sentiment score as a single float number ranging from -1 to 1. The closer the score is to -1, the more negative the sentiment; the closer to 1, the more positive the sentiment; and the closer to 0, the more neutral the sentiment. Make sure the output is only a float number, without any additional text or explanation.\n\n{sentence}",
            }
        ],
        temperature=1,
        max_tokens=5,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )
    score_sentiment = response.choices[0].message.content.strip().lower()

    try:
        score_sentiment = float(score_sentiment)
    except ValueError:
        # If conversion fails, return 0.0
        score_sentiment = 0.0

    return score_sentiment


def sentiment_a_sentence(sentence):
    prompt = f"""You are trained to analyze and detect the sentiment of the given text.\n    If you are unsure of an answer, you can say \"not sure\" and recommend the user review manually.\n\n    i want output sentiment only are one word: Positive, Negative,Neutral.\n\n
    {sentence}"""

    # Call the OpenAI API to generate a response
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Use a powerful model for sentiment analysis
        messages=[
            {"role": "user", "content": prompt},
        ],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    # Extract the sentiment from the response
    sentiment = response.choices[0].message.content.strip().lower()
    return sentiment


def sentiment_basedaspect_a_sentence(sentence):
    prompt = """You are trained to analyze and extract sentiment based-aspect opinion pairs from the given text. I want result has performance: this is json format only include
\"sentence analyze\":\"part of sentence that you analyze aspect and sentiment\",\"sentiment\": \"sentiment\",\"aspect\": \"aspect\",\"opinion\":\"opinion\"
I have many note: sentiment only are  Positive, Negative, Neutral. The important that There only are in results: [ ]. For example architecture for json: { "results": [{ "sentence analyze": "this product is low battery","sentiment":"Negative","aspect": "battery","opinion": "low"},{ "sentence analyze": "I love the product very much",
      "Sentiment": "Positive",
      "Aspect": "product",
      "Opinion": "love"
    }, {"sentence analyze": "my wife do not like it","sentiment": "Negative","aspect": "product", "opinion": "not like"},
    { "sentence analyze": "It is beautiful",  "sentiment": "Positive","aspect": "product","opinion": "beautiful" },{"sentence analyze": "I regret to this","sentiment": "Negative", "aspect": "product", "opinion": "regret"},]}
"""
    prompt += sentence
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=1.15,
        max_tokens=676,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )
    data_response = response.choices[0].message.content
    # print(data_response)
    return data_response


@csrf_exempt
def test_sentiment_basedaspect_level(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        detail_sentiment = sentiment_basedaspect_a_sentence(text)
        processed_results = []
        try:
            sentiment_data = json.loads(detail_sentiment)
            results = sentiment_data.get("results", [])
            print(results)
            # Process each result

            for result in results:
                sentence_analyze = result.get("sentence analyze", "")
                sentiment = result.get("sentiment", "")
                aspect = result.get("aspect", "")
                opinion = result.get("opinion", "")

                processed_results.append(
                    {
                        "sentence analyze": sentence_analyze,
                        "sentiment": sentiment,
                        "aspect": aspect,
                        "opinion": opinion,
                    }
                )
        except:
            JsonResponse({"error": "Can not decode json file"}, status=500)

        return JsonResponse({"message": processed_results}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


def count_pos_neg_neu_sentences(sentences):
    num_positive = 0
    num_negative = 0
    num_neutral = 0
    for sentence in sentences:
        sentiment = sentiment_a_sentence(sentence)
        if sentiment == "positive" or sentiment == "Positive":
            num_positive += 1
        elif sentiment == "negative" or sentiment == "Negative":
            num_negative += 1
        elif sentiment == "neutral" or sentiment == "Neutral":
            num_neutral += 1
    data_response = {
        "positive": num_positive,
        "negative": num_negative,
        "neutral": num_neutral,
    }
    return data_response


def count_exactly_sentiment(sentences):
    num_strong_neg = 0
    num_neg = 0
    num_light_neg = 0
    num_neu_neg = 0
    num_neu = 0
    num_neu_pos = 0
    num_light_pos = 0
    num_pos = 0
    num_strong_neg = 0
    for sentence in sentences:
        score = score_sentiment_a_sentence(sentence)
        float_score = float(score)
        sentiment = mapping_detail_sentiment(float_score)
        if sentiment == "Strong negative":
            num_strong_neg += 1
        elif sentiment == "Negative":
            num_neg += 1
        elif sentiment == "Light negative":
            num_light_neg += 1
        elif sentiment == "Neutral negative":
            num_neu_neg += 1
        elif sentiment == "Neutral":
            num_neu += 1
        elif sentiment == "Neutral positive":
            num_neu_pos += 1
        elif sentiment == "Light positive":
            num_light_pos += 1
        elif sentiment == "Positive":
            num_pos += 1
        elif sentiment == "Strong positive":
            num_strong_neg += 1
    data_response = {
        "strong_negative": num_strong_neg,
        "negative": num_neg,
        "light_negative": num_light_neg,
        "neutral_negative": num_neu_neg,
        "neutral": num_neu,
        "neutral_positive": num_neu_pos,
        "light_positive": num_light_pos,
        "positive": num_pos,
        "strong_positive": num_strong_neg,
    }
    return data_response


def emotion_a_sentence(sentence):
    prompt = (
        'You are trained to analyze and detect the emotion of the given text.\n\n    i want output emotion only one of there: angry, joyful, sad, fearful, ashame, pround, elated. And if you do not sure, you can return "not sure". The important is that output has one word.\n'
        + sentence
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=1,
        max_tokens=10,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )
    emotion = response.choices[0].message.content
    return emotion


def attitude_a_sentence(sentence):
    prompt = (
        'You are trained to analyze and detect the attitude of the given text.\n\n    i want output attitude only one of there: liking, loving, hating, valuing, desiring . And if you do not sure, you can return "not sure". The important is that output has one word.\n'
        + sentence
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=1,
        max_tokens=10,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )
    attitude = response.choices[0].message.content.strip().lower()
    return attitude


@csrf_exempt
def test_model_emotion(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        detail_sentiment = emotion_a_sentence(text)
        print(detail_sentiment)
        return JsonResponse({"message": detail_sentiment}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def test_model_attitude(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        detail_sentiment = attitude_a_sentence(text)

        return JsonResponse({"message": detail_sentiment}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


@csrf_exempt
def test_score_sentiment(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        detail_sentiment = score_sentiment_a_sentence(text)

        return JsonResponse({"message": detail_sentiment}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


def implicit_sentiment_analysis(text):
    # Set the prompt for GPT-3.5
    prompt = (
        f"Phân tích tình cảm tiềm ẩn và giải thích trong phần sau. text:\n\n{text}\n\nSentiment: "
        f"Các từ gây ra tình cảm tiềm ẩn là gì "
    )

    # Send the request to the OpenAI API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Use "gpt-3.5-turbo" for GPT-3.5
        messages=[
            {"role": "system", "content": "You are a sentiment analysis assistant."},
            {"role": "user", "content": prompt},
        ],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    # Get the result from the API
    sentiment = response.choices[0].message.content.strip().lower()
    return sentiment


@csrf_exempt
def test_implicit_sentiment_model(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        detail_sentiment = implicit_sentiment_analysis(text)
        print(detail_sentiment)
        return JsonResponse({"message": detail_sentiment}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


def detect_hate_speech(text):
    # Set the prompt for GPT-3.5 or GPT-4
    prompt = (
        f"Phân tích đoạn văn sau để xác định liệu nó chứa lời lẽ kích động thù địch hay không "
        f" Nếu nó chứa lời lẽ kích động thù địch, hãy chỉ ra 'Lời lẽ kích động thù địch' và cung cấp từ hoặc cụm từ cụ thể gây ra điều này."
        f"Nếu không chứa lời nói hate Speech thì trả về 'Không có từ gây căm thù'.\n\n"
        f"Trả về object theo từng mục"
        f"Text: {text}\n\nResponse:"
    )

    # Send request to OpenAI API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a sentiment analysis assistant."},
            {"role": "user", "content": prompt},
        ],
    )

    # Get the result from the API
    result = response.choices[0].message.content.strip().lower()
    return result


@csrf_exempt
def test_hate_detect_model(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        detail_sentiment = detect_hate_speech(text)
        print(detail_sentiment)
        return JsonResponse({"message": detail_sentiment}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


def detect_offensive_language(text):
    # Set the prompt for GPT-3.5 or GPT-4
    prompt = (
        f"Phân tích đoạn văn sau để xác định liệu nó chứa ngôn ngữ xúc phạm hay không. "
        f"Nếu nó chứa ngôn ngữ xúc phạm, hãy chỉ ra 'Ngôn ngữ xúc phạm' và cung cấp từ hoặc cụm từ cụ thể gây ra điều này, cùng với mô tả ngắn gọn về ngôn ngữ xúc phạm là gì? "
        f"Nếu nó không chứa ngôn ngữ xúc phạm, hãy chỉ ra 'Không chứa ngôn ngữ xúc phạm'.'.\n\n"
        f"Text: {text}\n\nResponse:"
    )

    # Send request to OpenAI API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a language analysis assistant."},
            {"role": "user", "content": prompt},
        ],
    )

    # Get the result from the API
    result = response.choices[0].message.content.strip().lower()
    return result


@csrf_exempt
def test_offensive_detection_model(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        detail_sentiment = detect_offensive_language(text)
        print(detail_sentiment)
        return JsonResponse({"message": detail_sentiment}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


def detect_irony(text):
    # Đặt prompt để phát hiện mỉa mai
    prompt = (
        f"Phân tích văn bản sau để xác định xem nó có chứa mỉa mai hay không. "
        f"Nếu có chứa mỉa mai, hãy ghi 'Mỉa mai' và cung cấp một giải thích ngắn gọn về sự mỉa mai này. "
        f"Nếu không chứa mỉa mai, hãy ghi 'Không mỉa mai'.\n\n"
        f'Văn bản: "{text}"\n\nPhản hồi:'
    )

    # Gửi yêu cầu tới OpenAI API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a language analysis assistant."},
            {"role": "user", "content": prompt},
        ],
    )

    # Lấy kết quả từ API
    result = response.choices[0].message.content.strip().lower()
    return result


@csrf_exempt
def test_detect_irony_model(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        detail_sentiment = detect_irony(text)
        print(detail_sentiment)
        return JsonResponse({"message": detail_sentiment}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )


def emotion_recognition(text):
    prompt = (
        f"Phân tích cảm xúc trong đoạn văn . "
        f"Cảm xúc của đoạn văn là gì (Chỉ đưa ra từ đó không cần dài dòng) và giải thích ngắn gọn ý nghĩa của câu"
        f"Các từ nào liên quan đến việc cảm xúc trong câu.\n\n"
        f'Văn bản: "{text}"\n\nPhản hồi:'
    )

    # Gửi yêu cầu tới OpenAI API
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a language analysis assistant."},
            {"role": "user", "content": prompt},
        ],
    )

    # Lấy kết quả từ API
    result = response.choices[0].message.content.strip().lower()
    return result


@csrf_exempt
def test_emotion_recognition_model(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        detail_sentiment = emotion_recognition(text)
        print(detail_sentiment)
        return JsonResponse({"message": detail_sentiment}, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )
