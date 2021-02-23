FROM python:3.8-slim-buster

RUN mkdir -p /api
WORKDIR /api
RUN python3 -m venv ftx-env
RUN source ftx-env/bin/activate
RUN pip3 install -r requirements.txt
COPY . .

EXPOSE 8000

CMD [ "uvicorn", "main:app"]