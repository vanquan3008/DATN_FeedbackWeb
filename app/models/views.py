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
