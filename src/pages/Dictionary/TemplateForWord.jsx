import { useState, useEffect, useContext, useCallback } from "react";
import { Typography, Alert } from "antd";
import { motion } from "framer-motion";
import { MainContentWord } from "../../components/ui/Word/MainContent/Main";
import { sampleWordData } from "../../store/data/examplesData";
import AdditionalInformation from "../../components/ui/Word/AdditionalInformation";
import LoadingState from "../../components/ui/shared/LoadingState";
import { AppContext } from "../../store/AppContext";
import { fetchWordData } from "../../utils/dataUtils";
import { debounce } from "lodash";

const { Text } = Typography;

const TemplateForWord = () => {
  const { searchedData } = useContext(AppContext);
  const word = searchedData?.trim().toLowerCase() || "";
  const [wordData, setWordData] = useState(sampleWordData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedAnalyze = useCallback(
    debounce(async (text) => {
      await fetchWordData(text, setLoading, setError, setWordData);
    }, 500),
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

  return (
    <div className="min-h-screen w-full flex justify-center">
      <motion.div
        className="w-full flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-4 w-full max-w-screen-xl lg:grid lg:grid-cols-[1fr_400px]">
          {/* Nội dung chính */}
          <motion.div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 max-w-full w-full h-full">
            <MainContentWord wordData={wordData} />
          </motion.div>

          {/* Thông tin bổ sung */}
          <motion.div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 w-full h-full">
            <AdditionalInformation word={word} data={wordData} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TemplateForWord;
