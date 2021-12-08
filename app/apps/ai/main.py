from createModel import createModel
from flask import Flask, request
from os import getenv
import json


app = Flask(__name__)


@app.route("/create", methods=["POST"])
def create() -> json:
    createModel(request.data)
    return {}


@app.route("/chat", methods=["GET"])
def chat() -> json:
    msg = request.args.get('msg')
    print(msg)
    model = load_model('chatbot_model.h5')
    print(model)
    ints = predict_class(msg, model)
    print(ints)

    return {ints}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
