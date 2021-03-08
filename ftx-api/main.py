from tinydb import TinyDB
import asyncio
from ftx_client import FtxClient
from fastapi import FastAPI
from utils.update_payment import update_payment
from config import settings

api_key = settings.api_key
api_secret = settings.api_secret

app = FastAPI()

@app.get("/")
def read_root():
    asyncio.run(update_payment())
    accounts_db = TinyDB(settings.root_dir + '/db/accounts.json')
    accounts = accounts_db.all()

    all_balances = FtxClient(
        api_key=api_key, api_secret=api_secret).get_all_balances()

    all_usd_value = sum(
        balance['usdValue']
        for account_balances in all_balances.values()
        for balance in account_balances
    )
    return {"accounts": accounts, "total": all_usd_value}
