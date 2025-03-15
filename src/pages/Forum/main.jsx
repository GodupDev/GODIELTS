import React, { useState } from "react";
import Post from "../../components/ui/Post/Post";
import { postData } from "../../store/data/examplesData";

const ForumPage = () => {
  const [posts, setPosts] = useState([postData]);

  const handleLikePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleAddComment = (postId, comment) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post,
      ),
    );
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onLike={handleLikePost}
            onDelete={handleDeletePost}
            onAddComment={handleAddComment}
          />
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
