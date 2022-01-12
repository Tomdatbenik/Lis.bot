from nltk.stem import WordNetLemmatizer
import nltk
nltk.download('punkt')
nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()

def prepareWords(words, intents, ignore_words,classes, documents):
    for intent in intents:
        for pattern in intent['patterns']:

            # take each word and tokenize it
            w = nltk.word_tokenize(pattern)
            words.extend(w)
            # adding documents
            documents.append((w, intent['tag']))

            # adding classes to our class list
            if intent['tag'] not in classes:
                classes.append(intent['tag'])

    words = [lemmatizer.lemmatize(w.lower())
             for w in words if w not in ignore_words]
    words = sorted(list(set(words)))
    return words
