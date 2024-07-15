FROM  python:3.9
EXPOSE 8000

WORKDIR /app 
COPY requirements.txt .

RUN pip install -r requirements.txt
RUN playwright install


COPY . .
ENTRYPOINT ["python3", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]