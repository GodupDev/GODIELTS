import { Card, Tabs, Typography, Alert } from "antd";
import IconFlag from "../../../icon/IconFlag";
import IconSound from "../../../icon/IconSound";
import { motion } from "framer-motion";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../../store/AppContext";
import { updateData, auth } from "../../../../store/services/firebase";

const { Text } = Typography;

const BasicInformation = ({ basicInformationData }) => {
  const word = basicInformationData.word.toLowerCase();
  const { favoriteWords, setFavoriteWords, user } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favoriteWords.includes(word));

  useEffect(() => {
    setIsFavorite(favoriteWords.includes(word));
  }, [favoriteWords, word]);

  const handleFavoriteClick = () => {
    if (!user) return;

    setFavoriteWords((prevWords) => {
      const updatedWords = isFavorite
        ? prevWords.filter((fWord) => fWord !== word)
        : [...prevWords, word];

      updateData(`userData/${auth.currentUser.uid}`, { list: updatedWords });

      return updatedWords;
    });
  };

  console.log(favoriteWords, isFavorite);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="!bg-gradient-to-r from-[#2e3134]/80 to-[#1e1e1e]/80 !border-none !shadow-lg hover:!shadow-xl transition-shadow duration-300">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {basicInformationData.word.replace(/(^\w|\s\w)/g, (match) =>
                match.toUpperCase(),
              )}
            </h1>
            <span className="px-3 py-1 text-sm md:text-lg font-bold border-2 border-blue-400 rounded-full text-blue-400 bg-blue-400/10">
              {basicInformationData.level}
            </span>
          </div>

          {user && (
            <div
              className="cursor-pointer text-lg md:text-xl text-red-500 hover:text-red-600"
              onClick={handleFavoriteClick}
            >
              <span className="text-white">
                {isFavorite ? <StarFilled /> : <StarOutlined />}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 text-xs md:text-sm font-bold text-green-400 border-2 border-green-400 rounded-full bg-green-400/10">
            {basicInformationData.type}
          </span>
          <div className="flex-1 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          {["UK", "US"].map((region) => (
            <motion.div
              key={region}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-[#1e1e1e]/50 hover:bg-[#1e1e1e]/70 transition-colors duration-200"
            >
              <IconFlag country={region} className="w-5 md:w-6 h-5 md:h-6" />
              <IconSound
                className="w-5 md:w-6 h-5 md:h-6 text-blue-400 cursor-pointer hover:text-blue-300"
                content={word}
                language={region === "UK" ? "en-GB" : "en-US"}
              />
              <Text className="text-md md:text-lg font-medium">
                {basicInformationData.ipaTranscription[region.toLowerCase()] ||
                  basicInformationData.ipaTranscription[region.toUpperCase()]}
              </Text>
            </motion.div>
          ))}
        </div>
      </Card>

      {basicInformationData.meanings.length > 0 && (
        <Tabs
          defaultActiveKey="0"
          tabBarStyle={{ color: "white" }}
          items={basicInformationData.meanings.map((tab, index) => ({
            key: String(index),
            label: (
              <span className="font-bold text-white hover:text-blue-400 transition">
                {tab.label}
              </span>
            ),
            children: (
              <div className="p-4 md:p-5 bg-[#1e1e1e]/50 rounded-lg">
                <Text
                  strong
                  className="text-white text-lg md:text-xl font-bold block mb-2"
                >
                  {tab.meaning}
                </Text>
                <ul className="pl-4 list-disc text-gray-300 space-y-1">
                  {tab.examples.map((ex, idx) => (
                    <li key={idx} className="before:text-blue-400">
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ),
          }))}
        />
      )}
    </motion.div>
  );
};

export default BasicInformation;
