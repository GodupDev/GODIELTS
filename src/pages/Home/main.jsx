import { Card, Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../../store/AppContext";

const HomePage = () => {
  const { setCurrentPage } = useContext(AppContext);
  const features = [
    {
      title: "Dictionary",
      description:
        "Full-length IELTS practice tests with detailed explanations",
      icon: <CheckCircleOutlined />,
      path: "/dictionary",
    },
    {
      title: "IELTS Strategies",
      description: "Expert strategies and tips for each section",
      icon: <CheckCircleOutlined />,
      path: "/tips",
    },
    {
      title: "Community Forum",
      description: "Access to experienced IELTS tutors and mentors",
      icon: <CheckCircleOutlined />,
      path: "/forum",
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        transition: "all 0.3s ease",
      }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <section className="text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to GODIELTS</h1>
          <p className="text-xl text-gray-400 mb-8">
            Your comprehensive IELTS preparation platform
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto">
        <Row gutter={[16, 16]}>
          {features.map((feature, index) => (
            <Col key={index} xs={24} sm={12} md={8} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="h-full"
              >
                <Card
                  className="h-50 bg-gray-900/50 border border-white/10 flex flex-col cursor-pointer"
                  onClick={() => setCurrentPage(feature.path)}
                >
                  <div className="text-center flex-grow flex flex-col justify-center">
                    <div className="text-3xl text-blue-500 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default HomePage;
