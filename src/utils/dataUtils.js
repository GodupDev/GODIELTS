import {
  getTypeOfInput,
  getWordData,
  getSentenceData,
} from "../store/ApiAI/askGeminiAI";

export const fetchDataTypeOfText = async (
  text,
  setLoading,
  setError,
  setData,
) => {
  setLoading(true);
  try {
    const result = await getTypeOfInput(text);
    setData(result);
  } catch (err) {
    setError("Failed to analyze input. Please try again.");
  } finally {
    setLoading(false);
  }
};

export const fetchWordData = async (word, setLoading, setError, setData) => {
  setLoading(true);
  try {
    const result = await getWordData(word);
    setData(result);
  } catch (err) {
    setError("Failed to analyze input. Please try again.");
  } finally {
    setLoading(false);
  }
};

export const fetchSentenceData = async (
  sentence,
  setLoading,
  setError,
  setData,
) => {
  setLoading(true);
  try {
    const result = await getSentenceData(sentence);
    setData(result);
  } catch (err) {
    setError("Failed to analyze input. Please try again.");
    console.log(err);
  } finally {
    setLoading(false);
  }
};

export const handleError = (error, setError) => {
  setError(error);
  setTimeout(() => setError(null), 5000);
};
