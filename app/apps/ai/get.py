# importing the requests library
import requests


def get(msg):
    # api-endpoint
    URL = "http://localhost:8079/message/bag"

    # defining a params dict for the parameters to be sent to the API
    PARAMS = {'message': msg}

    # sending get request and saving the response as response object
    r = requests.get(url=URL, params=PARAMS)

    # extracting data in json format
    data = r.json()
    return data['bag']
