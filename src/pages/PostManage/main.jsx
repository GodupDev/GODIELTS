import React, { useContext, useState } from "react";
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
  Select,
  message,
} from "antd";
import { motion } from "framer-motion";
import { UploadOutlined } from "@ant-design/icons";
import PostCard from "../../components/ui/Post/Post";
import TipCard from "../../components/ui/Post/Tip";
import { AppContext } from "../../store/AppContext";
import { updateData } from "../../store/services/firebase";
import { uploadImage } from "../../store/services/cloudinary";

const { TextArea } = Input;
const { TabPane } = Tabs;

/* 🎯 Hook for managing posts */
const usePosts = () => {
  const { profile, postsData, setPostsData } = useContext(AppContext);

  const addPost = async (content, image) => {
    if (!content.trim()) return;

    const newPost = {
      id: `${profile.userID}_${Date.now()}`,
      uid: profile.userID,
      author: profile.displayName,
      avatar: profile.avatar.url,
      content,
      image,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: [],
      status: false,
    };

    const updatedPosts = [newPost, ...postsData];
    setPostsData(updatedPosts);

    await updateData(`severData/postsData`, { postsData: updatedPosts });
  };

  const userPostsData = postsData.filter((e) => e.uid === profile.userID);
  return { userPostsData, addPost };
};

/* 🎯 Hook for managing tips */
const useTips = () => {
  const { profile, tipsData, setTipsData } = useContext(AppContext);

  const addTip = async (title, type, content, references) => {
    if (!title.trim() || !content.trim()) return;

    const newTip = {
      id: `${profile.userID}_${Date.now()}`,
      uid: profile.userID,
      type: type || "Others",
      author: profile.displayName,
      title,
      content,
      references: references
        .split(",")
        .map((ref) => ref.trim())
        .filter((ref) => ref),
      timestamp: new Date().toISOString(),
      status: false,
    };

    const updatedTips = [newTip, ...tipsData];
    setTipsData(updatedTips);

    await updateData(`severData/tipsData`, { tipsData: updatedTips });
  };

  const userTipsData = tipsData.filter((e) => e.uid === profile.userID);
  return { userTipsData, addTip };
};

/* 📝 Post Creation Form */
const PostForm = ({ onPostCreate, profile }) => {
  const [content, setContent] = useState("");
  const [imageFile, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const image = await uploadImage(imageFile);
    await onPostCreate(content, image);
    setContent("");
    setImage(null);
    setLoading(false);
  };

  return (
    <Card className="shadow-md rounded-lg p-4">
      <div className="flex items-start gap-4">
        <Avatar src={profile.avatar.url} />
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
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          disabled={!content.trim()}
        >
          Post
        </Button>
      </div>
      {imageFile && (
        <img
          src={imageFile}
          alt="Uploaded"
          className="mt-4 rounded-lg max-h-40 mx-auto"
        />
      )}
    </Card>
  );
};

/* 🎯 Tip Creation Form */
const TipForm = ({ onTipCreate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      setLoading(true);
      await onTipCreate(
        values.title,
        values.type,
        values.content,
        values.references,
      );
      form.resetFields();
      setLoading(false);
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
              <Select placeholder="Select type">
                <Select.Option value="listening">Listening</Select.Option>
                <Select.Option value="writing">Writing</Select.Option>
                <Select.Option value="reading">Reading</Select.Option>
                <Select.Option value="speaking">Speaking</Select.Option>
                <Select.Option value="others">Others</Select.Option>
              </Select>
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

          <Form.Item label="References (comma-separated)" name="references">
            <TextArea
              placeholder="e.g., https://example.com, https://ref.com"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>

          <div className="flex justify-end">
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              Add Tip
            </Button>
          </div>
        </Form>
      </Card>
    </motion.div>
  );
};

/* 🎯 Main Component */
const ManagePostsTips = () => {
  const { userPostsData, addPost } = usePosts();
  const { userTipsData, addTip } = useTips();
  const { user, profile } = useContext(AppContext);

  if (!user) return <div>Please log in to see the content.</div>;

  return (
    <Tabs defaultActiveKey="posts">
      <TabPane tab="Posts" key="posts">
        <PostForm onPostCreate={addPost} profile={profile} />
        <div className="flex flex-col pt-[4%] pb-[10%] max-w-4xl mx-auto space-y-6 gap-y-3">
          {userPostsData.length ? (
            userPostsData.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isEdit={true}
                isDelete={true}
              />
            ))
          ) : (
            <Empty description="No posts available" />
          )}
        </div>
      </TabPane>

      <TabPane tab="Tips" key="tips">
        <TipForm onTipCreate={addTip} />
        <div className="pt-[4%] pb-[10%]">
          {userTipsData.length ? (
            userTipsData.map((tip, index) => (
              <TipCard
                key={tip.id}
                tip={tip}
                index={index}
                isEdit={true}
                isDelete={true}
              />
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
