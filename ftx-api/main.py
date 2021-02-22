from ftx_client import FtxClient
from fastapi import FastAPI
from config import settings

app = FastAPI()

api_key = settings.api_key
api_secret = settings.api_secret

@app.get("/")
def read_root():
    subaccounts = FtxClient(api_key=api_key, api_secret=api_secret).get_subaccounts();
    account_names = [''] + [s['nickname'] for s in subaccounts]

    accounts = []

    for name in account_names:
        payments = FtxClient(api_key=api_key, api_secret=api_secret,
                             subaccount_name=name).get_funding_payments()
        accounts.append({"name": name, "payments": payments[:48]})

    all_balances = FtxClient(api_key=api_key, api_secret=api_secret).get_all_balances()

    all_usd_value = sum(
        balance['usdValue']
        for account_balances in all_balances.values()
        for balance in account_balances
    )
    return {"accounts": accounts, "total": all_usd_value}
