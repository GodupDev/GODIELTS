import React from 'react';
import { Spin } from 'antd';
import { motion } from 'framer-motion';

export default function LoadingState({ 
  tip = "Loading...",
  size = "large",
  height = "200px",
  showTip = true
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-full"
      style={{ minHeight: height }}
    >
      <Spin size={size}>
        <div className="p-12">
          <div className="w-8 h-8" /> {/* Spacer for consistent sizing */}
        </div>
      </Spin>
      {showTip && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-300 text-base"
        >
          {tip}
        </motion.p>
      )}
    </motion.div>
  );
}
