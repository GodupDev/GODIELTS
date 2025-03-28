import React from "react";
import IconSound from "../../../icon/IconSound";

const ListIdioms = ({ listIdiomsData }) => {
  const data = listIdiomsData;
  return (
    <div className="bg-[#2e3134]/50 p-6 rounded-xl shadow-lg w-full mx-auto">
      <h2 className="text-white text-[25px] font-bold mb-4 pb-2">IDIOM</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="bg-[#1e1e1e] p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{item.idiom}</span>
                <span className="px-2 py-1 bg-blue-500 text-xs rounded text-white">
                  {item.level}
                </span>
              </div>
              <IconSound color="#79b8f3" content={item.idiom} />
            </div>
            <p className="text-gray-400 text-sm mb-2">{item.meaning}</p>
            <div className="border-t border-gray-700 pt-2">
              <p className="text-gray-300">{item.example}</p>
              <p className="text-gray-500 text-sm italic">{item.translation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListIdioms;
