import React, { useState, useMemo } from "react";

const levelColors = {
  A1: "border-green-400 bg-green-900/30",
  A2: "border-blue-400 bg-blue-900/30",
  B1: "border-yellow-400 bg-yellow-900/30",
  B2: "border-red-400 bg-red-900/30",
};

const ListParaphrased = ({ listParaphrasedData }) => {
  const [selectedLevel, setSelectedLevel] = useState("");

  const filteredParaphrased = useMemo(
    () =>
      selectedLevel
        ? listParaphrasedData.filter(
            (sentence) => sentence.level === selectedLevel,
          )
        : listParaphrasedData,
    [selectedLevel],
  );

  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-5xl mx-auto mt-6">
      <h2 className="text-white text-2xl font-bold mb-6 text-center">
        Paraphrased Sentences
      </h2>

      {/* Dropdown filter */}
      <div className="mb-6">
        <label className="block text-gray-300 text-lg font-semibold mb-2">
          Filter by Level:
        </label>
        <select
          className="p-3 rounded-lg bg-gray-800 text-white w-full cursor-pointer focus:ring-2 focus:ring-blue-500 border border-gray-700"
          onChange={(e) => setSelectedLevel(e.target.value)}
          value={selectedLevel}
        >
          <option value="">All Levels</option>
          {[...new Set(listParaphrasedData.map((item) => item.level))].map(
            (level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ),
          )}
        </select>
      </div>

      {/* Paraphrased List */}
      {filteredParaphrased.length === 0 ? (
        <p className="text-gray-400 text-center">
          No matching paraphrases found.
        </p>
      ) : (
        filteredParaphrased.map(({ sentence, level, meaning }) => (
          <div
            key={sentence}
            className={`mb-6 p-5 rounded-xl shadow-lg border-2 ${levelColors[level]} transition-transform transform hover:scale-105`}
          >
            <h2 className="text-xl text-white font-bold">{sentence}</h2>
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full border ${levelColors[level]} text-white`}
            >
              Level: {level}
            </span>
            <p className="mt-2 text-gray-300">
              <strong>Meaning:</strong> {meaning}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ListParaphrased;
