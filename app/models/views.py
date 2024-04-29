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
    # print(data_response)
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
