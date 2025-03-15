import { Tabs, Card, Tag, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";

const TipCard = ({ tip, index }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 min-w-fit">
      <motion.div
        key={tip.id || index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card
          className="backdrop-blur-sm border border-white/20 transition-all duration-300 shadow-lg"
          hoverable
        >
          <div className="flex justify-between">
            <h4 className="text-white">{tip.author || "unknow"}</h4>
            <h4 className="text-white/70 text-sm">
              {new Date(tip.timestamp).toLocaleDateString()}
            </h4>
          </div>
          <h3 className="text-xl font-semibold text-white mt-5 mb-2">
            {tip.title}
          </h3>
          <p className="text-white/60">{tip.content}</p>

          {tip.references.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tip.references.map((reference, refIndex) => (
                <a
                  key={refIndex}
                  href={reference}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {reference}
                </a>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default TipCard;
