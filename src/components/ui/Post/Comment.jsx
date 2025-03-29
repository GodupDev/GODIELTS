import React, { useContext, useState } from "react";
import { Avatar, Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { AppContext } from "../../../store/AppContext";

const { TextArea } = Input;

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");
  const { profile, user } = useContext(AppContext);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        content: newComment,
        timestamp: new Date().toISOString(),
        avatar: profile.avatar.url,
        name: profile.displayName,
      };
      onAddComment(newCommentData);
      setNewComment("");
    }
  };

  return (
    <div className="mt-6 pt-5">
      <h4 className="text-lg font-semibold text-white">Comments</h4>
      <div className="mt-4 space-y-4">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg shadow-md"
          >
            <Avatar
              src={comment.avatar}
              className="w-10 h-10 rounded-full border border-gray-500 shadow"
            />
            <div className="flex flex-col w-full">
              <p className="text-sm font-semibold text-gray-300">
                {comment.name}
              </p>
              <p className="text-white text-base mt-2 leading-relaxed">
                {comment.content}
              </p>
              <span className="text-gray-500 text-xs">
                {new Date(comment.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {user && (
        <div className="flex items-center gap-3 mt-5">
          <Avatar
            src={profile.avatar.url}
            className="w-10 h-10 rounded-full border border-gray-400 shadow-md"
          />
          <div className="flex-1">
            <Input
              className="h-11 rounded-lg px-4 bg-gray-700 text-white border border-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onPressEnter={handleAddComment}
              placeholder="Write a comment..."
            />
          </div>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleAddComment}
            className="h-11 bg-blue-500 hover:bg-blue-600 border-none text-white"
          />
        </div>
      )}
    </div>
  );
};

export default CommentSection;
