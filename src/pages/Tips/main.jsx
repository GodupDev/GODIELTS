import React, { useState } from "react";
import { Tabs, Card, Tag, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { PlusOutlined } from "@ant-design/icons";
import { tipData } from "../../store/data/examplesData";
import TipCard from "../../components/ui/Post/Tip";

const { TabPane } = Tabs;

const TipsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [tips, setTips] = useState([tipData]);

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
                <div className="">
                  {tips
                    .filter(
                      (tip) =>
                        category.key === "all" || tip.type === category.key,
                    )
                    .map((tip, index) => (
                      <TipCard key={tip.id} tip={tip} />
                    ))}
                </div>
              </AnimatePresence>
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TipsPage;
