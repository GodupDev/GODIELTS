import React, { useState } from "react";
import {
  Card,
  Button,
  Input,
  Space,
  Avatar,
  Upload,
  Empty,
  Tabs,
  Form,
  Typography,
} from "antd";
import { motion } from "framer-motion";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import PostCard from "../../components/ui/Post/Post";
import TipCard from "../../components/ui/Post/Tip";
import { tipData, postData } from "../../store/data/examplesData";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

// Ảnh đại diện mặc định
const LOGO = "https://via.placeholder.com/150";

/* 🎯 Hook quản lý posts */
const usePosts = () => {
  const [posts, setPosts] = useState([postData]);

  const addPost = (content, image) => {
    if (!content.trim() && !image) return;
    setPosts([
      {
        id: Date.now(),
        author: "Admin",
        avatar: LOGO,
        content,
        image,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
      },
      ...posts,
    ]);
  };

  return { posts, addPost };
};

/* 🎯 Hook quản lý tips */
const useTips = () => {
  const [tips, setTips] = useState([tipData]);

  const addTip = (title, type, content, references) => {
    if (!title.trim() || !content.trim()) return;
    setTips([
      {
        id: Date.now(),
        type: type || "General",
        author: "IELTS Mentor",
        title,
        content,
        references: references
          .split(",")
          .map((ref) => ref.trim())
          .filter((ref) => ref),
        timestamp: new Date().toISOString(),
      },
      ...tips,
    ]);
  };

  return { tips, addTip };
};

/* 📝 Component: Form đăng bài */
const PostForm = ({ onPostCreate }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <Card className="shadow-md rounded-lg p-4">
      <div className="flex items-start gap-4">
        <Avatar src={LOGO} />
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          autoSize={{ minRows: 3, maxRows: 5 }}
          className="flex-1"
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        <Space>
          <Upload beforeUpload={handleImageUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Space>
        <Button type="primary" onClick={() => onPostCreate(content, image)}>
          Post
        </Button>
      </div>
      {image && (
        <img
          src={image}
          alt="Uploaded"
          className="mt-4 rounded-lg max-h-40 mx-auto"
        />
      )}
    </Card>
  );
};

/* 🎯 Component: Form tạo tip */
const TipForm = ({ onTipCreate }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onTipCreate(values.title, values.type, values.content, values.references);
      form.resetFields();
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg rounded-xl p-4">
        <Form layout="vertical" form={form}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Enter tip title" />
            </Form.Item>

            <Form.Item label="Type" name="type">
              <Input placeholder="e.g., Listening, Writing" />
            </Form.Item>
          </div>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Content is required" }]}
          >
            <TextArea
              placeholder="Enter tip content"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>

          <Form.Item label="References (enter-separated)" name="references">
            <TextArea
              placeholder={"e.g., https://example.com \nhttps://ref.com"}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>

          <div className="flex justify-end">
            <Button type="primary" onClick={handleSubmit}>
              Add Tip
            </Button>
          </div>
        </Form>
      </Card>
    </motion.div>
  );
};

/* 🎯 Component chính */
const ManagePostsTips = () => {
  const { posts, addPost } = usePosts();
  const { tips, addTip } = useTips();

  return (
    <Tabs defaultActiveKey="posts">
      <TabPane tab="Posts" key="posts">
        <PostForm onPostCreate={addPost} />
        <div className="pt-[4%] pb-[10%]">
          {posts.length ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <Empty description="No posts available" />
          )}
        </div>
      </TabPane>
      <TabPane tab="Tips" key="tips">
        <TipForm onTipCreate={addTip} />
        <div className="pt-[4%] pb-[10%]">
          {tips.length ? (
            tips.map((tip, index) => (
              <TipCard key={tip.id} tip={tip} index={index} />
            ))
          ) : (
            <Empty description="No tips available" />
          )}
        </div>
      </TabPane>
    </Tabs>
  );
};

export default ManagePostsTips;
