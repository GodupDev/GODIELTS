import React, { useState } from "react";
import { Avatar, Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        content: newComment,
        timestamp: new Date().toISOString(),
      };
      onAddComment(newCommentData);
      setNewComment("");
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="text-lg font-semibold">Comments</h4>
      {comments.map((comment, index) => (
        <div key={index} className="flex items-start gap-3 mt-3">
          <Avatar
            src={`https://randomuser.me/api/portraits/men/${index + 5}.jpg`}
          />
          <div className="bg-gray-700/50 p-3 rounded-lg w-full">
            <p className="text-white">{comment.content}</p>
            <span className="text-gray-400 text-xs">
              {new Date(comment.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 mt-4 h-10">
        <Input
          className="h-full"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onPressEnter={handleAddComment}
          placeholder="Write a comment..."
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleAddComment}
        />
      </div>
    </div>
  );
};

export default CommentSection;
