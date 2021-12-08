from nltk.stem import WordNetLemmatizer
import nltk
nltk.download('punkt')
nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()
import json
import pickle
import random
from keras.layers import Dense, Dropout
from keras.models import Sequential
from tensorflow.keras.optimizers import SGD
import numpy as np

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
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                # assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return(np.array(bag))


def predict_class(sentence, model):
    # take each word and tokenize it
    words = []
    w = nltk.word_tokenize(sentence)
    words.extend(w)

    print(words)

    # filter out predictions below a threshold
    p = bow(sentence, words, show_details=False)
    print(p)
    print(np.array([p]))
    # res = model.predict(np.array([p]))[0]

    # print("result ==============================================")
    # print(res)

    # ERROR_THRESHOLD = 0.25
    # results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    # # sort by strength of probability
    # results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    # for r in results:
    #     return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list


def getResponse(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if(i['tag'] == tag):
            result = "no clue"
            break
    return result
