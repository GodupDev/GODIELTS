const getPromptTypeOfInput = (word) => {
  return `Analyze the input '${word}' and classify it into one of the following categories:
      1. 'word' - if it is a single valid English word.
      2. 'sentence' - if it consists of multiple words, regardless of grammar correctness. 
      3. 'phrase' - if it is a group of words forming a phrase.
      4. 'invalid' - if it is not a recognizable English word or phrase.
      Respond with only one of the three options: 'word', 'sentence', 'phrase' or 'invalid'. No additional text or explanation.`;
};

const getPromptWordData = (word) => {
  return `
    Imagine you are a highly accurate, detailed Cambridge dictionary. Generate a JSON object that provides a comprehensive analysis of the English word "${word}" for IELTS preparation. The JSON should include:
  
<<<<<<< HEAD
=======
    -**"word"**: "${word}".
>>>>>>> e9703c6 (1.12 fix dictionary logic)
    - **"level"**: The CEFR level of the word (A1, A2, B1, B2, C1, C2).
    - **"type"**: The grammatical category of the word (e.g., "verb", "noun", "adjective", "adverb", "preposition").
    - **"generalDescription"**: A short yet comprehensive description of the word, including its meaning and any differences between British and American English.
    - **"originAndHistory"**: The etymology of the word, explaining its linguistic roots and how its meaning has evolved.
    - **"frequencyAndContext"**: Information on how frequently the word is used, its contexts, and real-world example sentences.
    - **"ipaTranscription"**: The IPA transcriptions for both UK and US pronunciation.
  
    **Meanings (Array)**
    - **"meanings"**: An array of different meanings, each containing:
      - **"key"**: A unique identifier for the meaning.
      - **"level"**: The CEFR level range for this meaning.
      - **"label"**: A category or label describing the meaning.
      - **"meaning"**: A clear definition.
      - **"examples"**: Example sentences demonstrating the meaning.
  
    **Common Collocations**
    - **"collocations"**: A list of common collocations with the word, each including:
      - **"collocation"**: The full phrase.
      - **"category"**: The grammatical category (e.g., "verb + noun").
      - **"meaning"**: The Vietnamese meaning.
      - **"example"**: An English sentence using the collocation.
      - **"translation"**: A Vietnamese translation of the example.
  
    **Word Forms (By Part of Speech)**
    - **"wordForms"**: An object where each key is a part of speech (e.g., "verb", "noun") and its value is an array of word variations:
      - **"word"**: The specific word form.
      - **"phonetic"**: IPA transcription.
      - **"meaning"**: The meaning of this form.
      - **"example"**: A sentence using this form.
  
    Example format:
    \`\`\`json
    "wordForms": {
      "verb": [
        { "word": "run", "phonetic": "/rʌn/", "meaning": "...", "example": "..." },
        { "word": "ran", "phonetic": "/ræn/", "meaning": "...", "example": "..." }
      ],
      "noun": [
        { "word": "runner", "phonetic": "/ˈrʌn.ər/", "meaning": "...", "example": "..." }
      ]
    }
    \`\`\`
  
    **Synonyms and Antonyms**
    - **"synonymsAntonyms"**: A list of related words, each including:
      - **"type"**: Either "synonym" or "antonym".
      - **"word"**: The related word.
      - **"meaning"**: The Vietnamese meaning.
      - **"example"**: A sentence using the synonym/antonym.
      - **"level"**: The CEFR level of the synonym/antonym.
  
    **Idiomatic Expressions**
    - **"idioms"**: A list of idioms that include the word, each containing:
      - **"idiom"**: The full idiomatic phrase.
      - **"level"**: The CEFR level of the idiom.
      - **"meaning"**: A brief definition.
      - **"example"**: An example sentence.
      - **"translation"**: The Vietnamese translation of the example.
  
    Return a well-structured JSON object in this format, adapted to the word "${word}".
    `;
};

const getPromptSentenceData = (sentence) => {
  return `Analyze the following English sentence:
  
  "${sentence}"
  
  1. Identify any grammar or word usage mistakes. Provide:
     - The incorrect word/phrase.
     - The correct version.
     - A brief explanation of the mistake.
     - The type of mistake (e.g., verb, word choice, preposition, etc.).
  
  2. Paraphrase the sentence in different ways with various difficulty levels:
     - Include at least 5 paraphrased sentences.
     - Specify the meaning in Vietnamese.
     - Assign a CEFR level (A1, A2, B1, B2).
  
  Return the data in a structured JSON format like this:
  {
    "basicInformation": {
      "sentence": "<original_sentence>",
      "meaning": "<Vietnamese_translation_corrected_sentence>",
      "grammarErrors": [
        {
          "incorrect": "<wrong_word>",
          "correct": "<correct_word>",
          "explanation": "<why_it's_wrong>",
          "type": "<error_type>"
        }
      ]
    },
    "paraphrasedData": [
      {
        "sentence": "<paraphrased_sentence>",
        "meaning": "<Vietnamese_translation>",
        "level": "<CEFR_level>"
      }
    ]
  }`;
};

export { getPromptTypeOfInput, getPromptWordData, getPromptSentenceData };
