from words import prepareWords
from keras.models import load_model
import numpy as np
from tensorflow.keras.optimizers import SGD
from keras.models import Sequential
from keras.layers import Dense, Dropout
import random
import pickle
import json
from nltk.stem import WordNetLemmatizer
import nltk
nltk.download('punkt')
nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()
import requests

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(
        word.lower()) for word in sentence_words]
    return sentence_words

# return bag of words array: 0 or 1 for each word in the bag that exists in the sentence


def bow(sentence, words, show_details=True):
    # tokenize the pattern
    sentence_words = clean_up_sentence(sentence)
    # bag of words - matrix of N words, vocabulary matrix

    bag = [0]*len(words)
    print(bag)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                # assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return(np.array(bag))


def predict_class(sentence, model, words, classes):
    # filter out predictions below a threshold
    p = bow(sentence, words, False)

    res = model.predict(np.array([p]))[0]

    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list


def getResponse(ints, intents):
    print(ints)
    tag = ints[0]['intent']
    list_of_intents = intents
    for i in list_of_intents:
        if(i['tag'] == tag):
            result = random.choice(i['responses'])
            break
    return result


def predict(msg, data, model=None):
    words = []
    classes = []
    documents = []
    ignore_words = ['?', '!']

    URL = "http://localhost:8079/message/ai/data"
    # sending get request and saving the response as response object
    r = requests.get(url = URL)

    intents = r.json()

    prepareWords(words, intents, ignore_words, classes, documents)

    if model is None:
        model = load_model('chatbot_model.h5')

    ints = predict_class(msg, model, words, classes)
    return getResponse(ints, intents)
