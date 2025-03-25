import LogoIELTS from "../../assets/images/GodIELTS.png";

export const sampleProfileData = {
  avatar: "", //default avatar from cloudinary
  displayName: "TIen",
  email: "",
  dob: "",
  gender: "",
  phone: "",
  address: "",
};

export const sampleWordData = {
  level: "",
  type: "",
  generalDescription: "",
  originAndHistory: "",
  frequencyAndContext: "",
  ipaTranscription: {
    UK: "",
    US: "",
  },
  meanings: [
    {
      key: "",
      level: "",
      label: "",
      meaning: "",
      examples: [""],
    },
    {
      key: "",
      level: "",
      label: "",
      meaning: "",
      examples: [""],
    },
  ],
  collocations: [
    {
      collocation: "",
      category: "",
      meaning: "",
      example: "",
      translation: "",
    },
  ],
  wordForms: {
    verb: [
      {
        word: "",
        phonetic: "",
        meaning: "",
        example: "",
      },
    ],
    noun: [
      {
        word: "",
        phonetic: "",
        meaning: "",
        example: "",
      },
    ],
  },
  synonymsAntonyms: [
    {
      type: "",
      word: "",
      meaning: "",
      example: "",
      level: "",
    },
  ],
  idioms: [
    {
      idiom: "",
      level: "",
      meaning: "",
      example: "",
      translation: "",
      separator: "-------------------------",
    },
  ],
};

export const sampleSentenceData = {
  basicInformation: {
    sentence: "Tiến đẹp trai nhất vũ trụ",
    meaning: "",
    grammarErrors: [],
  },
  paraphrasedData: [
    {
      sentence: "Người đẹp trai nhất là tiến",
      meaning: "",
      level: "",
    },
  ],
};

export const sampleTipData = {
  id: Date.now(),
  type: "listening",
  author: "IELTS Mentor",
  title: "Listen to a Variety of Accents",
  content:
    "IELTS Listening tests include different English accents, such as British, American, and Australian. Practice by listening to different sources like BBC News, NPR, and TED Talks.",
  references: ["https://www.bbc.co.uk/learningenglish", "https://www.ted.com"],
  status: true,
  timestamp: "2024-03-13T10:15:30Z",
};

export const samplePostData = {
  id: Date.now(),
  author: "Admin",
  avatar: LogoIELTS, //default avatar from cloudinary
  content: "Wellcome to GODIELT",
  image: LogoIELTS, //image from cloudinary
  timestamp: new Date().toISOString(),
  likes: [],
  comments: [],
  status: false,
};
