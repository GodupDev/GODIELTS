import { Card, Typography, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

// Hàm thay thế các lỗi trong câu gốc
const capitalizeFirstLetter = (text) => {
  if (!text || typeof text !== "string") return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const highlightErrors = (sentence, errors) => {
  if (!sentence || typeof sentence !== "string") return sentence;

  let modifiedSentence = capitalizeFirstLetter(sentence);

  errors.forEach(({ incorrect, correct, explanation }) => {
    const regex = new RegExp(`\\b${incorrect}\\b`, "gi"); // 'gi' để không phân biệt hoa thường
    modifiedSentence = modifiedSentence.replace(
      regex,
      `<span class="inline-flex items-center gap-1">
         <del class="text-red-500" title="${explanation}">${incorrect}</del>
         <span class="text-green-500">(${correct})</span>
       </span>`,
    );
  });

  return modifiedSentence;
};

const BasicInformation = ({ basicInformationData }) => {
  const data = basicInformationData;
  return (
    <Card className="w-[95%] mx-auto !bg-gray-900 ">
      {/* Câu có lỗi ngữ pháp */}
      <p
        dangerouslySetInnerHTML={{
          __html: highlightErrors(data.sentence, data.grammarErrors),
        }}
        className="text-lg text-white font-semibold text-center"
      />

      {/* Nghĩa của câu */}
      <Text italic className="block text-gray-300 text-center mt-2">
        {data.meaning}
      </Text>

      {/* Danh sách lỗi ngữ pháp */}
      {basicInformationData.grammarErrors.length !== 0 ? (
        <div className="mt-4 space-y-2 ml-12">
          {basicInformationData.grammarErrors.map((error, index) => (
            <div key={index} className="flex items-center gap-2">
              <Text delete className="text-red-500 font-medium">
                {error.incorrect}
              </Text>
              <span className="text-gray-400">❌ →</span>
              <Text className="text-green-400 font-medium">
                {error.correct}
              </Text>
              <Tooltip title={error.explanation}>
                <InfoCircleOutlined className="text-gray-400 cursor-pointer" />
              </Tooltip>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-green-500 font-bold italic pt-2">
          Đây là câu đúng ngữ pháp
        </div>
      )}
    </Card>
  );
};

export default BasicInformation;
