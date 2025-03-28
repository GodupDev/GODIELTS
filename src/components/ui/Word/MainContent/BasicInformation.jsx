import { Card, Tabs, Typography, Alert } from "antd";
import IconFlag from "../../../icon/IconFlag";
import IconSound from "../../../icon/IconSound";
import { motion } from "framer-motion";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../../store/AppContext";
import { addData, auth } from "../../../../store/services/firebase";

const { Text } = Typography;

const BasicInformation = ({ basicInformationData }) => {
  const word = basicInformationData.word;
  const { favouriteWords, setFavouriteWords, user } = useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(favouriteWords.includes(word));

  useEffect(() => {
    setIsFavourite(favouriteWords.includes(word));
  }, [favouriteWords, word]);

  const handleFavouriteClick = () => {
    setIsFavourite((prev) => {
      const newFavouriteStatus = !prev;

      setFavouriteWords((prevWords) => {
        const updatedWords = newFavouriteStatus
          ? [...prevWords, word]
          : prevWords.filter((w) => w !== word);

        if (user && auth.currentUser) {
          addData(`userData/${auth.currentUser.uid}`, updatedWords);
        }

        return updatedWords;
      });

      return newFavouriteStatus;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="!bg-gradient-to-r from-[#2e3134]/80 to-[#1e1e1e]/80 !border-none !shadow-lg hover:!shadow-xl transition-shadow duration-300"
        key={"1"}
      >
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {basicInformationData.word.replace(/(^\w|\s\w)/g, (match) =>
                match.toUpperCase(),
              )}
            </h1>
            <span className="px-3 py-1 text-lg font-bold border-2 border-blue-400 rounded-full text-blue-400 bg-blue-400/10">
              {basicInformationData.level}
            </span>
          </div>
          <div
            className="cursor-pointer text-xl text-red-500 hover:text-red-600"
            onClick={handleFavouriteClick}
          >
            {user && (
              <span className="text-white">
                {isFavourite ? <StarFilled /> : <StarOutlined />}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 text-sm font-bold text-green-400 border-2 border-green-400 rounded-full bg-green-400/10">
            {basicInformationData.type}
          </span>
          <div className="flex-1 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-white">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-[#1e1e1e]/50 hover:bg-[#1e1e1e]/70 transition-colors duration-200"
          >
            <IconFlag country="UK" className="w-6 h-6" />
            <IconSound
              className="w-6 h-6 text-blue-400 cursor-pointer hover:text-blue-300"
              content={word}
              language="en-GB"
            />
            <Text className="text-lg font-medium">
              {basicInformationData.ipaTranscription.UK ||
                basicInformationData.ipaTranscription.uk}
            </Text>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-[#1e1e1e]/50 hover:bg-[#1e1e1e]/70 transition-colors duration-200"
          >
            <IconFlag country="US" className="w-6 h-6" />
            <IconSound
              className="w-6 h-6 text-blue-400 cursor-pointer hover:text-blue-300"
              content={word}
              language="en-US"
            />
            <Text className="text-lg font-medium">
              {basicInformationData.ipaTranscription.US ||
                basicInformationData.ipaTranscription.us}
            </Text>
          </motion.div>
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
              <div className="p-5 bg-[#1e1e1e]/50 rounded-lg">
                <Text
                  strong
                  className="text-white text-xl font-bold block mb-2"
                >
                  {tab.meaning}
                </Text>
                <ul className="pl-5 list-disc text-gray-300 space-y-1">
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
