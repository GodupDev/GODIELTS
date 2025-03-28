import { useContext, useState, useRef, useEffect, useCallback } from "react";
import MainContentSentence from "../../components/ui/Sentence/Main";
import { AppContext } from "../../store/AppContext";
import { fetchSentenceData } from "../../utils/dataUtils";
import { debounce } from "lodash";
import LoadingState from "../../components/ui/shared/LoadingState";
import { sampleSentenceData } from "../../store/data/examplesData";

const TemplateForSentence = () => {
  const { searchedData } = useContext(AppContext);
  const [sentenceData, setSentenceData] = useState(sampleSentenceData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedAnalyze = useCallback(
    debounce(async (text) => {
      await fetchSentenceData(text, setLoading, setError, setSentenceData);
    }, 500),
    [],
  );

  useEffect(() => {
    if (searchedData?.trim()) {
      debouncedAnalyze(searchedData);
    }

    return () => {
      debouncedAnalyze.cancel(); // Cleanup debounce khi component unmount
    };
  }, [searchedData, debouncedAnalyze]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <LoadingState tip="Analyzing sentence..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto w-full p-8 text-center">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl border border-white/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Error
          </h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!searchedData?.trim()) {
    return (
      <div className="max-w-xl mx-auto w-full p-8 text-center">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl border border-white/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Welcome to Sentence Explorer
          </h2>
          <p className="text-gray-400">Enter a sentence above to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-1xl mx-auto w-full p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-white/10">
        <MainContentSentence sentenceData={sentenceData} />
      </div>
    </div>
  );
};

export default TemplateForSentence;
