import React, { useState } from "react";
import { Card, Avatar, Button, Space, Popconfirm, Image } from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import CommentSection from "./Comment";

const PostCard = ({
  post,
  onLike = false,
  onDelete = false,
  onEdit = false,
  onAddComment = false,
}) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow w-full max-w-screen-lg p-4 rounded-2xl bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Nội dung bài đăng */}
        <div className="flex-1 min-w-[300px]">
          <div className="flex items-center gap-3">
            <Avatar src={post.avatar} size={50} />
            <div>
              <h3 className="font-semibold">{post.author}</h3>
              <span className="text-gray-400 text-sm">
                {new Date(post.timestamp).toLocaleDateString()}
              </span>
            </div>
          </div>

          <p className="mt-4 text-gray-300 ">{post.content}</p>

          <div className="flex justify-center">
            {post.image && (
              <div className="mt-4">
                <Image
                  src={post.image}
                  alt="Post"
                  className="rounded-xl w-full max-h-96 object-cover "
                  preview={{
                    mask: "Click to enlarge",
                  }}
                />
              </div>
            )}
          </div>

          {/* Nút Like & Comment */}
          <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-4">
            <Space>
              <Button
                type="text"
                icon={<LikeOutlined />}
                onClick={() => onLike(post.id)}
                className="text-gray-300 hover:text-blue-500"
              >
                {post.likes} Likes
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

        {/* Comment Section: Bên phải trên desktop, bên dưới trên mobile */}
        {showComments && (
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-gray-700 pt-4 md:pl-4">
            <CommentSection
              comments={post.comments}
              onAddComment={(comment) => onAddComment(post.id, comment)}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostCard;
