FROM  python:3.9
EXPOSE 8000

WORKDIR /app 
COPY requirements.txt .

RUN python3 -m ensurepip
RUN pip3 install -r requirements.txt
RUN playwright install
RUN playwright install-deps


COPY . .



ENTRYPOINT ["python3"]

CMD ["manage.py", "runserver", "0.0.0.0:8000"]