import { useState } from "react";
import IconSound from "../../../icon/IconSound";

const ListWordForms = ({ word, data = {} }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Chuyển đổi `data` thành dạng mảng có chứa { type, words }
  const wordTypes = Object.entries(data).map(([type, words]) => ({
    type,
    words,
  }));

  return (
    <div>
      {!loading && (
        <div className="bg-[#2e3134]/50 p-5 rounded-lg shadow-lg mx-auto w-full ">
          <h2 className="text-white text-[25px] font-bold mb-3">
            Dạng từ của <span className="text-[#79b8f3]">{word}</span>
          </h2>

          <table className="w-full border-collapse border border-gray-700 rounded-lg overflow-hidden mt-4">
            <thead>
              <tr className="bg-[#2e3134] text-white">
                <th className="p-3 text-left text-[20px] border border-gray-700">
                  Loại từ
                </th>
                <th className="p-3 text-left text-[20px] border border-gray-700">
                  Từ & Nghĩa
                </th>
              </tr>
            </thead>
            <tbody>
              {wordTypes.map((item, index) => (
                <tr
                  key={index}
                  className="bg-[#1e1e1e] text-white border border-gray-700"
                >
                  <td className="p-3 border border-gray-700 font-semibold capitalize">
                    {item.type}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {item.words.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {item.words.map((wordItem, wordIndex) => (
                          <div
                            key={wordIndex}
                            className="flex justify-between items-center p-3 bg-[#34373a] rounded-lg shadow-md border border-gray-600"
                          >
                            <div>
                              <span className="font-semibold text-[#79b8f3] text-lg">
                                {wordItem.word}
                              </span>
                              <p className="text-gray-300 text-sm mt-1 leading-tight">
                                {wordItem.meaning}
                              </p>
                              <p className="text-gray-400 text-xs mt-1 italic">
                                "{wordItem.example}"
                              </p>
                            </div>
                            <IconSound
                              color="#79b8f3"
                              className="cursor-pointer hover:scale-110 transition-transform"
                              content={wordItem.word}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">
                        Không có từ nào.
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListWordForms;
