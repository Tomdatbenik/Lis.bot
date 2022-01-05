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

export class Dictonairy {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}


