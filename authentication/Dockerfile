FROM python:2.7-slim

WORKDIR /app

ADD . /app

RUN pip install -r requirements.txt

EXPOSE 5555

ENV SSL_CLIENT_S_DN_Email test

CMD ["python","certificate/app.py"]
