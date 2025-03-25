import React, { useContext, useState } from "react";
import Post from "../../components/ui/Post/Post";
import { AppContext } from "../../store/AppContext";
import { div } from "framer-motion/client";

const ForumPage = () => {
  const { postsData, searchedData } = useContext(AppContext);

  const filteredPostsData = postsData.filter((post) => {
    return searchedData !== ""
      ? post.content.includes(searchedData) ||
          post.author.includes(searchedData)
      : true;
  });

  return (
    <div className="min-h-screen p-2">
      <div className="flex flex-col pt-[1%] pb-[5%] max-w-4xl mx-auto space-y-6 gap-y-3">
        {filteredPostsData.length > 0 ? (
          filteredPostsData.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div>No matching posts yet</div>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
