import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { Typography } from "antd";
import { motion } from "framer-motion";
import { MainContentWord } from "../../components/ui/Word/MainContent/Main";
import { wordData } from "../../store/data/examplesData";
import AdditionalInformation from "../../components/ui/Word/AdditionalInformation";
import LoadingState from "../../components/ui/shared/LoadingState";
import { AppContext } from "../../store/AppContext";
import { fetchWordData } from "../../utils/dataUtils";
import { debounce } from "lodash";

const { Text } = Typography;

const TemplateForWord = () => {
  const { searchedData } = useContext(AppContext);
  const word = searchedData?.trim().toLowerCase() || "";
  const [wordData, setWordData] = useState(sampleBasicInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedAnalyze = useCallback(
    debounce(async (text) => {
      await fetchWordData(text, setLoading, setError, setWordData);
    }, 100),
    [],
  );

  useEffect(() => {
    if (searchedData?.trim()) {
      debouncedAnalyze(searchedData);
    }

    return () => {
      debouncedAnalyze.cancel();
    };
  }, [searchedData, debouncedAnalyze]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 w-full rounded-2xl">
        <LoadingState tip="Loading word information..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 w-full">
        <Text className="text-red-400 text-lg">{error}</Text>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen w-full flex justify-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_400px] gap-2 w-full max-w-screen-xl px-4">
        <motion.div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 max-w-[120vh] w-full h-full">
          <MainContentWord word={word} data={wordData} />
        </motion.div>

        <motion.div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 w-full h-full">
          <AdditionalInformation word={word} data={wordData} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TemplateForWord;
