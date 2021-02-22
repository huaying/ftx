
## Getting Started

## .env
```
add .env in ftx-api and add your api key and secret:
API_KEY = "xxx"
API_SECRET = "xxx"

```

### api
```
# go to ftx-api
python3 -m venv ftx-env
source ftx-env/bin/activate
pip3 install -r requirements.txt
uvicorn main:app

# listen to the port 8000
```

### ui
```
# go to ftx-ui
yarn install
yarn build
yarn start

# listen to the port 3000
```