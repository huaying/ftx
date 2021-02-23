FROM python:3.8

# Set up and activate virtual environment
ENV VIRTUAL_ENV "/ftx-env"
RUN python -m venv $VIRTUAL_ENV
ENV PATH "$VIRTUAL_ENV/bin:$PATH"

RUN mkdir -p /api
WORKDIR /api
COPY . /api
RUN cd /api/ && /bin/bash -c "source ftx-env/bin/activate"
RUN cd /api/ && /ftx-env/bin/python -m pip install --upgrade pip
RUN cd /api/ && /ftx-env/bin/pip3 install -r requirements.txt

EXPOSE 8000

CMD [ "uvicorn", "main:app"]