import React, { useContext, useState } from "react";
import { Tabs, Card, Tag, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { PlusOutlined } from "@ant-design/icons";
import { sampleTipData } from "../../store/data/examplesData";
import TipCard from "../../components/ui/Post/Tip";
import { AppContext } from "../../store/AppContext";

const { TabPane } = Tabs;

const TipsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { tipsData, searchedData } = useContext(AppContext);

  const filteredTipsData = tipsData.filter((tip) => {
    return searchedData !== ""
      ? tip.content.includes(searchedData) ||
          tip.author.includes(searchedData) ||
          tip.title.includes(searchedData)
      : true;
  });

  const categories = [
    { key: "all", label: "All", color: "#94A3B8" }, // Xám xanh trung tính
    { key: "listening", label: "Listening", color: "#3B82F6" }, // Xanh dương sáng
    { key: "reading", label: "Reading", color: "#22C55E" }, // Xanh lá sáng
    { key: "writing", label: "Writing", color: "#FB923C" }, // Cam sáng
    { key: "speaking", label: "Speaking", color: "#A855F7" }, // Tím sáng
    { key: "others", label: "Others", color: "#06B6D4" }, // Xanh ngọc sáng
  ];

  return (
    <div className="">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">IELTS Tips</h1>
        </div>
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="w-full">
          {categories.map((category) => (
            <TabPane
              tab={
                <Tag
                  color={category.color}
                  className="px-4 py-1 text-sm font-medium"
                >
                  {category.label}
                </Tag>
              }
              key={category.key}
            >
              <AnimatePresence>
                {filteredTipsData.filter(
                  (tip) => category.key === "all" || tip.type === category.key,
                ).length === 0 ? (
                  <div className="text-white text-center py-4">
                    No tips match
                  </div>
                ) : (
                  filteredTipsData
                    .filter(
                      (tip) =>
                        category.key === "all" || tip.type === category.key,
                    )
                    .map((tip) => <TipCard key={tip.id} tip={tip} />)
                )}
              </AnimatePresence>
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TipsPage;
