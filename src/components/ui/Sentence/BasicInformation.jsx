import { Card, Typography, Tooltip, List } from "antd";
import { InfoCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const highlightErrors = (sentence, errors) => {
  if (!sentence || typeof sentence !== "string") return sentence;

  let modifiedSentence = sentence;

  errors.forEach(({ incorrect, correct, explanation }) => {
    const regex = new RegExp(`\b${incorrect}\b`, "gi");
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
  const data = basicInformationData || {};
  const errors = data.grammarErrors || [];

  return (
    <Card className="w-[95%] mx-auto !bg-gray-900">
      {data.sentence && (
        <p
          dangerouslySetInnerHTML={{
            __html: highlightErrors(data.sentence, errors),
          }}
          className="text-lg text-white font-semibold text-center"
        />
      )}

      {data.meaning && (
        <Text italic className="block text-gray-300 text-center mt-2">
          {data.meaning}
        </Text>
      )}

      {errors.length > 0 ? (
        <List
          dataSource={errors}
          renderItem={(error) => (
            <List.Item>
              <div className="flex items-center gap-2">
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
            </List.Item>
          )}
        ></List>
      ) : (
        <div className="flex items-center justify-center gap-2 text-green-500 font-bold italic pt-2">
          <CheckCircleOutlined />
          <span>Đây là câu đúng ngữ pháp</span>
        </div>
      )}
    </Card>
  );
};

export default BasicInformation;
