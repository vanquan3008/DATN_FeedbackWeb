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


load_dotenv()
API_SECRET_KEY = os.getenv("api_gpt_key")
openai.api_key = API_SECRET_KEY
# Initialize the OpenAI client
client = OpenAI(api_key=openai.api_key)


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
                "content": 'You are trained to analyze and detect the sentiment of the given text.\n\n    i want output sentiment is a number has float type and value has range from -1 to 1. The closer -1, the sentiment more negative, the closer 1, the sentiment more postive. And the closer 0, the sentiment more neural. \nThe most important that output only a float number.\n\n"There are many book. They are old and ugly, but in my opinion, I see there are new. So , i decide buy it in the future. Besides, I hope everyone like this",    \n',
            }
        ],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )
    score_sentiment = response.choices[0].message.content.strip().lower()
    return float(score_sentiment)

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
        'You are trained to analyze and detect the attitude of the given text.\n\n i want output attitude only one of there: liking, loving, hating, valuing, desiring . And if you do not sure, you can return "not sure". The important is that output has one word.\n'
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