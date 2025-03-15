import React, { useState } from "react";
import IconSound from "../../../icon/IconSound";

const Collocation = ({ word, data }) => {
  const staticCollocations = data;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = ["all", ...new Set(staticCollocations.map(item => item.category))];

  const filteredData = selectedCategory === "all"
    ? staticCollocations
    : staticCollocations.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-[#2e3134]/50 p-6 rounded-xl shadow-lg w-full mx-auto">
      <h2 className="text-white text-[25px] font-bold mb-4 pb-2">
        Kết hợp từ của <span className="text-[#79b8f3]">{word}</span>
      </h2>
      <div className="flex gap-3 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`cursor-pointer px-3 py-1 rounded-md text-sm ${
              selectedCategory === category
                ? "bg-[#79b8f3] text-white"
                : "bg-[#2e3134] text-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <table className="w-full rounded-lg overflow-hidden bg-gray-800 text-white mb-6">
        <thead>
          <tr className="bg-[#2e3134] text-white text-lg border-b border-gray-600">
            <th className="p-4 text-left border-r border-gray-600">
              Collocation
            </th>
            <th className="p-4 text-left">Ví dụ</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="bg-[#1e1e1e] border-t border-gray-600">
              <td className="p-4 flex items-center gap-3 justify-between border-r border-gray-600">
                <div>
                  <span className="font-bold">{item.collocation}</span>
                  <p className="text-gray-400 text-sm">{item.meaning}</p>
                </div>
                <IconSound color="#79b8f3" content={item.collocation}/>
              </td>
              <td className="p-4 text-gray-300">
                <div className="flex items-center gap-3 justify-between">
                  <div>
                    <p>{item.example}</p>
                    <p className="text-gray-400 text-sm">
                      {item.translation}
                    </p>
                  </div>
                  <IconSound color="#79b8f3" content={item.example} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Collocation;
