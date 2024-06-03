from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import json
from django.forms.models import model_to_dict
import re
import pandas as pd
import io, csv
import os
from dotenv import load_dotenv
import openai
from openai import OpenAI

from models.helper import (
    emotion_a_sentence ,
    attitude_a_sentence ,
    score_sentiment_a_sentence,
    mapping_detail_sentiment
)


load_dotenv()
API_SECRET_KEY = os.getenv("api_gpt_key")
openai.api_key = API_SECRET_KEY
# Initialize the OpenAI client
client = OpenAI(api_key=openai.api_key)


def mapping_sentiment(score):
    if round(score, 3) > 0.333:
        return "positive"
    elif round(score, 3) < -0.333:
        return "negative"
    elif round(score, 3) >= -0.333 and round(score, 3) <= 0.333:
        return "neutral"


def mapping_detail_sentiment(score):
    if round(score, 3) >= -1 and round(score, 3) <= -0.8:
        return "strong negative"
    elif round(score, 3) > -0.8 and round(score, 3) <= -0.5:
        return "negative"
    elif round(score, 3) > -0.5 and round(score, 3) <= -0.3:
        return "light negative"
    elif round(score, 3) > -0.3 and round(score, 3) <= -0.15:
        return "neural negative"
    elif round(score, 3) >= -0.15 and round(score, 3) <= 0.15:
        return "neutral"
    elif round(score, 3) > 0.15 and round(score, 3) <= 0.3:
        return "neural positive"
    elif round(score, 3) > 0.3 and round(score, 3) <= 0.5:
        return "light positive"
    elif round(score, 3) > 0.5 and round(score, 3) <= 0.8:
        return "positive"
    elif round(score, 3) > 0.8 and round(score, 3) <= 1:
        return "strong positive"


def score_sentiment_a_sentence(sentence):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"You are trained to analyze and detect the sentiment of the given text.\n\n i want output sentiment is a number has float type and value has range from -1 to 1. The closer -1, the sentiment more negative, the closer 1, the sentiment more postive. And the closer 0, the sentiment more neural. \nThe most important that output only a float number\n{sentence}",
            }
        ],
        temperature=1,
        max_tokens=5,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )
    score_sentiment = response.choices[0].message.content.strip().lower()
    return score_sentiment


def sentiment_a_sentence(sentence):
    prompt = f"""You are trained to analyze and detect the sentiment of the given text.\n    If you are unsure of an answer, you can say \"not sure\" and recommend the user review manually.\n\n    i want output sentiment only are one word: Positive, Negative,Neutral.\n\n
    {sentence}"""

    # Call the OpenAI API to generate a response
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Use a powerful model for sentiment analysis
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
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
I have many note: sentiment only are  positive, negative, neutral. The important that There only are in results: [ ]. For example architecture for json: { "results": [{ "sentence analyze": "this product is low battery","sentiment":"negative","aspect": "battery","opinion": "low"},{ "sentence analyze": "I love the product very much",
      "sentiment": "positive",
      "aspect": "product",
      "opinion": "love"
    }, {"sentence analyze": "my wife do not like it","sentiment": "negative","aspect": "product", "opinion": "not like"},
    { "sentence analyze": "It is beautiful",  "sentiment": "positive","aspect": "product","opinion": "beautiful" },{"sentence analyze": "I regret to this","sentiment": "negative", "aspect": "product", "opinion": "regret"},]}
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
    return data_response


def count_pos_neg_neu_sentences(sentences):
    num_positive = 0
    num_negative = 0
    num_neutral = 0
    for sentence in sentences:
        sentiment = sentiment_a_sentence(sentence)
        if sentiment == "positive":
            num_positive += 1
        elif sentiment == "negative":
            num_negative += 1
        else:
            num_neutral += 1
    data_response = {
        "positive": num_positive,
        "negative": num_negative,
        "neutral": num_neutral,
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

# Model Details

# Sentimet details 
@csrf_exempt
def sentiment_text_details(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        text = data["text"]
        score_details =float(score_sentiment_a_sentence(text))
        detail_sentiment = mapping_detail_sentiment(score_details)
        sentiment_basedaspect = sentiment_basedaspect_a_sentence(text)
        return JsonResponse({"message": detail_sentiment,"base_aspect" : sentiment_basedaspect }, status=200)
    else:
        return JsonResponse(
            {"error": "Only POST requests are allowed for this endpoint"}, status=500
        )