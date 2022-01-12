from nltk.util import pr
from numpy import chararray
from createModel import createModel
from predict import predict
from flask import Flask, request
from os import getenv
import json


app = Flask(__name__)


@app.route("/create", methods=["POST"])
def create() -> json:
    createModel(request.data)
    return {}

@app.route("/learn", methods=["get"])
def learn() -> json:
    print("Started learning!" )
    createModel()
    return {}


@app.route("/chat", methods=["POST"])
def chat() -> chararray:
    msg = request.args.get('msg')

    prediction = predict(msg,request.data)

    print(prediction)
    return prediction


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3002)
