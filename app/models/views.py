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


def sentiment_a_sentence(sentence):
    prompt = f"""You are trained to analyze and detect the sentiment of the given text.
    If you are unsure of an answer, you can say "not sure" and recommend the user review manually.

    Analyze the following text and determine if the sentiment is: Positive, Negative, or Neutral.
    {sentence}"""

    # Call the OpenAI API to generate a response
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Use a powerful model for sentiment analysis
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=1,  # Limit response to a single word
        temperature=0,  # Keep response consistent
    )

    # Extract the sentiment from the response
    sentiment = response.choices[0].message.content.strip().lower()

    return sentiment


def sentiment_basedaspect_a_sentence(sentence):
    prompt = f"""You are trained to analyze and extract sentiment based-aspect opinion pairs from the given text. \nI want result has performance: this is json format include\n\"sentence analyze\":\"part of sentence that you analyze aspect and sentiment\",\"sentiment\": \"sentiment\",\"aspect\": \"aspect\",\"opinion\":\"opinion\"\\n\n\n{sentence}"""
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
    print(data_response)
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
