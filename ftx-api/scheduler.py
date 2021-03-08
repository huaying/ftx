import schedule
import json
from datetime import datetime

from ftx_client import FtxClient
from config import settings

api_key = settings.api_key
api_secret = settings.api_secret

client = FtxClient(api_key=api_key, api_secret=api_secret)


def pprint(dic):
    print(json.dumps(dic, indent=2, sort_keys=True))


def _get_spot_perp_diff(spot, prep):
    return (spot - prep) / spot

def _get_first_order(orders):
    '''
        過濾掉一些亂入的 order (size 很小 eg 0.1, 0.2)
        選擇價值超過 10 usd 的 order
    '''
    min_size_req = 10 # 10 usd
    for idx, order in enumerate(orders):
        if order[1] > min_size_req * order[0]:
            return idx
    return -1

def _find_price_and_size():
    '''
        找出對應的合約與現貨價格
        1. 價差 < -0.15%
        2. 兩者都有足夠的size x
    '''
    # expected_diff = -0.0015
    expected_diff = -0.0015
    spot_asks = client.get_orderbook('BTMX/USD', 20)['asks']
    perp_bids = client.get_orderbook('BTMX-PERP', 20)['bids']
    spot_idx = _get_first_order(spot_asks)
    perp_idx = _get_first_order(perp_bids)

    if spot_idx > 0 and perp_idx > 0:
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")

        diff = _get_spot_perp_diff(spot_asks[spot_idx][0],perp_bids[perp_idx][0])
        if diff < 0:
            print('v', current_time, spot_asks[spot_idx][0], perp_bids[perp_idx][0], diff, min(
                spot_asks[spot_idx][1], perp_bids[perp_idx][1]), flush=True)
        else:
            print(current_time, spot_asks[spot_idx][0], perp_bids[perp_idx][0], diff, min(
                spot_asks[spot_idx][1], perp_bids[perp_idx][1]), flush=True)
        if diff < expected_diff:
            return (
                spot_asks[spot_idx][0],
                perp_bids[perp_idx][0],
                min(spot_asks[spot_idx][1], perp_bids[perp_idx][1])
            )

    return None, None, None

def enter_market():  # enter market
    _find_price_and_size()


def exit_market():  # exit
    pass


schedule.every(8).seconds.do(enter_market)

while True:
    schedule.run_pending()
