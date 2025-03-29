import { useContext } from "react";
import { AppContext } from "../../../../store/AppContext";

const levelBorderColors = {
  A1: "border-yellow-500 text-yellow-500",
  A2: "border-green-500 text-green-500",
  B1: "border-blue-500 text-blue-500",
  B2: "border-purple-500 text-purple-500",
  C1: "border-red-500 text-red-500",
  C2: "border-pink-500 text-pink-500",
};

const SynonymsAntonyms = ({ listSynonymsAntonymsData }) => {
  const { setSearchedData } = useContext(AppContext);
  const data = listSynonymsAntonymsData;

  if (!data || data.length === 0) {
    return (
      <div className="p-6 bg-[#2e3134]/50 text-white rounded-xl shadow-lg w-full mx-auto">
        <h2 className="text-white text-[25px] font-bold mb-3">
          SYNONYMS AND ANTONYMS
        </h2>
        <p className="text-gray-300 text-center">No matching data.</p>
      </div>
    );
  }

  const synonyms = data.filter(({ type }) => type === "synonym");
  const antonyms = data.filter(({ type }) => type === "antonym");

  const renderWordList = (title, words, color) => (
    <div>
      <h3 className={`text-sm font-semibold ${color}`}>{title}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {words.length > 0 ? (
          words.map(({ word, level }) => (
            <div
              key={word}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-700 flex items-center gap-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => setSearchedData(word)}
            >
              {word}
              <span
                className={`px-2 py-1 text-xs font-bold border rounded-b-sm ${
                  levelBorderColors[level] || "border-gray-500 text-gray-500"
                }`}
              >
                {level}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No matching data.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-[#2e3134]/50 text-white rounded-xl shadow-lg w-full mx-auto">
      <h2 className="text-white text-[25px] font-bold mb-3">
        SYNONYMS AND ANTONYMS
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {renderWordList("Synonyms", synonyms, "text-blue-400")}
        {renderWordList("Antonyms", antonyms, "text-orange-400")}
      </div>
    </div>
  );
};

export default SynonymsAntonyms;
