import { Card, Typography, Divider } from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const AdditionalInformation = ({ data }) => {
  return (
    <motion.div
      className="w-full max-h-fit rounded-[45px] bg-gradient-to-br from-white to-blue-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg rounded-[45px] p-8 bg-white/90 transition-shadow duration-300 text-justify">
        <div className="mb-8">
          <Title
            level={3}
            className="!text-blue-600 !mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            General Description
          </Title>
          <Text className="text-gray-700 leading-relaxed">
            {data?.generalDescription || "No description available."}
          </Text>
        </div>

        <Divider className="!my-8 !border-blue-100" />

        <div className="mb-8">
          <Title
            level={3}
            className="!text-blue-600 !mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Origin And History
          </Title>
          <Text className="text-gray-700 leading-relaxed">
            {data?.originAndHistory || "No description available."}
          </Text>
        </div>

        <Divider className="!my-8 !border-blue-100" />

        <div>
          <Title
            level={3}
            className="!text-blue-600 !mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Frequency And Context
          </Title>
          <Text className="text-gray-700 leading-relaxed">
            {data?.frequencyAndContext || "No description available."}
          </Text>
        </div>
      </Card>
    </motion.div>
  );
};

export default AdditionalInformation;
