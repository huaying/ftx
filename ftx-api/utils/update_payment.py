from tinydb import TinyDB
import asyncio
import time
from ftx_client import FtxClient
from config import settings

api_key = settings.api_key
api_secret = settings.api_secret

async def _collect_payments(name):
    loop = asyncio.get_event_loop()
    payments = await loop.run_in_executor(None, FtxClient(api_key=api_key, api_secret=api_secret,
                                                   subaccount_name=name).get_funding_payments)
    return {"name": name, "payments": payments[:48]}

async def update_payment():
    accounts_db = TinyDB(settings.root_dir + '/db/accounts.json')
    subaccounts = FtxClient(api_key=api_key, api_secret=api_secret).get_subaccounts()
    account_names = [''] + [s['nickname'] for s in subaccounts]

    accounts = await asyncio.gather(
        *[asyncio.create_task(_collect_payments(name)) for name in account_names]
    )

    accounts_db.truncate()
    for account in accounts:
        accounts_db.insert(account)


if __name__ == '__main__':
    asyncio.run(update_payment())
