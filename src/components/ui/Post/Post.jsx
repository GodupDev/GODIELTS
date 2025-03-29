import React, { useContext, useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Space,
  Popconfirm,
  Image,
  Modal,
  Input,
} from "antd";
import {
  LikeOutlined,
  LikeFilled,
  MessageOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import CommentSection from "./Comment";
import { updateData } from "../../../store/services/firebase";
import { AppContext } from "../../../store/AppContext";

const PostCard = ({ post, isDelete = false, isEdit = false }) => {
  const { setPostsData, postsData, user, profile } = useContext(AppContext);
  const [showComments, setShowComments] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  // ✅ Hàm update chuẩn chỉnh lên Firebase
  const updatePostDataToServer = async (updatedPosts) => {
    setPostsData(updatedPosts);
    await updateData(`severData/postsData`, { postsData: updatedPosts });
  };

  // ✅ Sửa bài viết
  const handleEditPost = async () => {
    const updatedPosts = postsData.map((p) =>
      p.id === post.id ? { ...p, content: editedContent } : p,
    );
    await updatePostDataToServer(updatedPosts);
    setIsEditModalVisible(false);
  };

  // ✅ Xóa bài viết
  const handleDeletePost = async () => {
    const updatedPosts = postsData.filter((p) => p.id !== post.id);
    await updatePostDataToServer(updatedPosts);
  };

  // ✅ Like hoặc Unlike
  const handleLikePost = async () => {
    const hasLiked = post.likes.includes(profile.userID);
    const updatedPosts = postsData.map((p) => {
      if (p.id === post.id) {
        const newLikes = hasLiked
          ? p.likes.filter((id) => id !== profile.userID)
          : [...p.likes, profile.userID];
        return { ...p, likes: newLikes };
      }
      return p;
    });
    await updatePostDataToServer(updatedPosts);
  };

  // ✅ Thêm comment
  const handleAddComment = async (comment) => {
    const updatedPosts = postsData.map((p) =>
      p.id === post.id ? { ...p, comments: [...p.comments, comment] } : p,
    );
    await updatePostDataToServer(updatedPosts);
  };

  // ✅ Kiểm tra đã like chưa để đổi màu nút
  const hasLiked = post.likes.includes(profile.userID) && user;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow w-full max-w-screen-lg p-4 rounded-2xl bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-[300px]">
          {/* Header */}
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Avatar src={post.avatar} size={50} />
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <span className="text-gray-400 text-sm">
                  {new Date(post.timestamp).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="gap-2 flex">
              {isEdit && (
                <Button
                  icon={<EditOutlined />}
                  type="text"
                  className="text-gray-300 hover:text-yellow-400 text-xs sm:text-sm"
                  onClick={() => setIsEditModalVisible(true)}
                >
                  Edit
                </Button>
              )}
              {isDelete && (
                <Popconfirm
                  title="Are you sure you want to delete this post?"
                  onConfirm={handleDeletePost}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    icon={<DeleteOutlined />}
                    type="text"
                    danger
                    className="text-gray-300 hover:text-red-500 text-xs sm:text-sm"
                  >
                    Delete
                  </Button>
                </Popconfirm>
              )}
            </div>
          </div>

          {/* Content */}
          <p className="mt-4 text-gray-300 text-sm sm:text-base">
            {post.content}
          </p>

          {/* Image */}
          {post.image && (
            <div className="mt-4 flex justify-center">
              <Image
                src={post.image.url}
                alt="Post"
                className="rounded-xl w-full max-h-3.5 sm:max-h-96 object-cover"
                fallback="https://via.placeholder.com/150"
                preview={{ mask: "Click to enlarge" }}
              />
            </div>
          )}

          {/* Like & Comment */}
          <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-4">
            <Space>
              <Button
                type="text"
                icon={hasLiked ? <LikeFilled /> : <LikeOutlined />}
                onClick={() => {
                  if (user) handleLikePost();
                  else
                    Modal.warning({
                      title: "Thông báo",
                      content: "Bạn cần đăng nhập để tương tác!",
                    });
                }}
                className={
                  hasLiked
                    ? "text-blue-500"
                    : "text-gray-300 hover:text-blue-500"
                }
              >
                {post.likes.length} Likes
              </Button>
              <Button
                type="text"
                icon={<MessageOutlined />}
                onClick={() => setShowComments(!showComments)}
                className="text-gray-300 hover:text-green-500"
              >
                {post.comments.length} Comments
              </Button>
            </Space>
          </div>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-gray-700 pt-4 md:pl-4 overflow-auto max-h-full">
            <CommentSection
              comments={post.comments}
              onAddComment={handleAddComment}
            />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Post"
        open={isEditModalVisible}
        onOk={handleEditPost}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <Input.TextArea
          rows={4}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      </Modal>
    </Card>
  );
};

export default PostCard;
