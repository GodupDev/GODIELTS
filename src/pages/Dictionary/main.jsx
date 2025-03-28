import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingState from "../../components/ui/shared/LoadingState";
import { debounce } from "lodash";
import { AppContext } from "../../store/AppContext";
import { fetchDataTypeOfText } from "../../utils/dataUtils";
import { getData, auth } from "../../store/services/firebase";
import { Alert } from "antd";

import TemplateForWord from "./TemplateForWord";
import TemplateForSentence from "./TemplateForSentence";

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const Dictionary = () => {
  const [checkTypeOfSearchedData, setCheckTypeOfSearchedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    favouriteWords,
    setFavouriteWords,
    user,
    setSearchedData,
    searchedData,
  } = useContext(AppContext);

  const debouncedAnalyze = useRef(
    debounce(async (text) => {
      await fetchDataTypeOfText(
        text,
        setLoading,
        setError,
        setCheckTypeOfSearchedData,
      );
    }, 300),
  ).current;

  useEffect(() => {
    debouncedAnalyze(searchedData);
  }, [searchedData]);

  useEffect(() => {
    if (user) getFavouriteWord();
  }, [favouriteWords]);

  const getFavouriteWord = useCallback(async () => {
    if (user && auth.currentUser) {
      setLoading(true); // Set loading to true before fetching data.
      setError(null); // Reset error state.
      try {
        const data = await getData(`userData/${auth.currentUser.uid}`);
        setFavouriteWords(data.list || []);
      } catch (err) {
        setError(err.message || "Failed to fetch favorite words.");
      } finally {
        setLoading(false);
      }
    }
  }, [user, setFavouriteWords]);

  useEffect(() => {
    if (searchedData) {
      debouncedAnalyze(searchedData);
    }
  }, [searchedData, debouncedAnalyze]);

  useEffect(() => {
    if (user) getFavouriteWord();
  }, [user, getFavouriteWord]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Alert message={error} type="error" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={searchedData || "empty"}
        className="overflow-x-hidden px-4 sm:px-6 w-full"
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {loading ? (
          <div className="w-full flex justify-center py-12">
            <LoadingState tip="Analyzing input..." />
          </div>
        ) : !searchedData?.trim() ? (
          <motion.div
            className="w-full flex flex-col items-center py-12"
            variants={fadeVariants}
          >
            <span className="text-base sm:text-lg text-gray-400 mb-6">
              Enter a word or sentence to get started
            </span>
            {favouriteWords.length > 0 && auth && (
              <div className="w-full max-w-1xl">
                <h3 className="text-lg font-semibold mb-4">
                  Your Favorited Words
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Array.from(new Set(favouriteWords)).map((word, index) => (
                    <button
                      key={index}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-semibold rounded-2xl shadow-xl border border-blue-700 hover:from-indigo-500 hover:to-blue-500 hover:shadow-2xl transition-all duration-300 ease-in-out transform active:scale-90 cursor-pointer"
                      onClick={() => setSearchedData(word)}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col sm:gap-y-20 w-full"
            variants={fadeVariants}
          >
            {checkTypeOfSearchedData === "word" ? (
              <TemplateForWord />
            ) : (
              <TemplateForSentence />
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Dictionary;
