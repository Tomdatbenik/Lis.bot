export class Phonetic {
  text: string;
  audio: string;
}

export class Definition {
  definition: string;
  example: string;
  synonyms: string[];
}

export class Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export class Dictionary {
  constructor(word?: string) {
    this.word = word
  }
  
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}


