import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getPosts } from "../api";
import Post from "../components/Post";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPostsFromserver() {
      const response = await getPosts();
      // console.log("insUEH", response);
      setPosts(response);
    }

    getPostsFromserver();
  }, []);

  return (
    <div className="post-container">
      
      {/* if the posts are fetched from server it will be diplayed */}
      {posts?.map((post) => {
        return (
          <Post
            postsState={posts}
            setPosts={setPosts}
            post={post}
            key={post.id}
          />
        );
      })}
    </div>
  );
}

export default Home;
