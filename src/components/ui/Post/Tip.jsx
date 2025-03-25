import { Card, Button, Popconfirm, Modal, Input } from "antd";
import { motion } from "framer-motion";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { AppContext } from "../../../store/AppContext";

const TipCard = ({
  tip,
  index,
  isEdit = false,
  isDelete = false,
  onEdit,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(tip.title);
  const [editedContent, setEditedContent] = useState(tip.content);
  const [editReferences, setEditReferences] = useState(
    tip.references?.join("\n") || "",
  );
  const { setTipsData } = useContext(AppContext);

  // ✅ Hàm xử lý edit
  const handleEdit = () => {
    const updatedTip = {
      ...tip,
      title: editedTitle,
      content: editedContent,
      references: editReferences
        .split("\n")
        .map((ref) => ref.trim())
        .filter((ref) => ref),
    };
    onEdit(tip.id, updatedTip);
    setIsModalOpen(false);
  };

  // ✅ Hàm xử lý delete
  const handleDelete = () => {
    onDelete(tip.id);
  };

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
          actions={[
            isEdit && (
              <Button
                type="text"
                icon={<EditOutlined />}
                className="text-yellow-400"
                onClick={() => setIsModalOpen(true)}
              >
                Edit
              </Button>
            ),
            isDelete && (
              <Popconfirm
                title="Are you sure to delete this tip?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" icon={<DeleteOutlined />} danger>
                  Delete
                </Button>
              </Popconfirm>
            ),
          ]}
        >
          <div className="flex justify-between">
            <h4 className="text-white">{tip.author || "Unknown"}</h4>
            <h4 className="text-white/70 text-sm">
              {new Date(tip.timestamp).toLocaleDateString()}
            </h4>
          </div>

          {/* ✅ Hiển thị Type */}
          <p className="text-blue-400 text-sm mt-1">
            {tip.type?.toUpperCase()}
          </p>

          <h3 className="text-xl font-semibold text-white mt-5 mb-2">
            {tip.title}
          </h3>
          <p className="text-white/60">{tip.content}</p>

          {/* ✅ Hiển thị References */}
          {tip.references?.length > 0 && (
            <div className="flex flex-col flex-wrap gap-1 mt-2">
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

        {/* ✅ Modal Edit */}
        <Modal
          title={
            <span className="text-white text-xl font-semibold">
              ✏️ Edit Tip
            </span>
          }
          open={isModalOpen}
          onOk={handleEdit}
          onCancel={() => setIsModalOpen(false)}
          okText="Save"
          cancelText="Cancel"
          className="bg-[#111827] rounded-xl"
        >
          {/* Title */}
          <label className="text-white block mb-2 mt-4">Title</label>
          <Input
            className="bg-gray-800 text-white p-3 rounded-lg focus:border-blue-500"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Enter title..."
          />

          {/* Content */}
          <label className="text-white block mb-2 mt-6">Content</label>
          <Input.TextArea
            className="bg-gray-800 text-white p-3 rounded-lg focus:border-blue-500"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={5}
            placeholder="Enter content..."
          />

          {/* References */}
          <label className="text-white block mb-2 mt-6">
            References (one link per line)
          </label>
          <Input.TextArea
            className="bg-gray-800 text-white p-3 rounded-lg focus:border-blue-500"
            value={editReferences}
            onChange={(e) => setEditReferences(e.target.value)}
            rows={3}
            placeholder="https://example.com"
          />
        </Modal>
      </motion.div>
    </div>
  );
};

export default TipCard;
