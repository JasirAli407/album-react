import React, { useState } from "react";
import { updatePost, deletePost } from "../api";

function Post({ post, postsState, setPosts }) {
  const [editMode, setEditMode] = useState(false);
  const [postTitle, setPostTitle] = useState(post.title);
  const [postBody, setPostBody] = useState(post.body);

  async function handleSaveClick() {
    setEditMode(false);
    // console.log(typeof post.id);
    const res = await updatePost(post.id, postTitle, postBody, post.userId);
    // console.log(res);

    const updatedPosts = postsState.map((postEle) => {

        // if the id match  we return the updated post obj to the array
      if (postEle.id === post.id) {
        return {
          ...postEle,
          title: res.title,
          body: res.body,
        };
      }

      return postEle;
    });

    setPosts(updatedPosts);
  }

  async function handleDeletePostClick() {
    deletePost(post.id);

    // if the id match we remove that post object
    const updatedPosts = postsState.filter((postEle) => postEle.id !== post.id);

    setPosts(updatedPosts);
  }

  
  return (
    <div className="post">
      {editMode ? (
        <textarea
          className="post-title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
      ) : (
        <div className="post-title">{post.title}</div>
      )}

      {editMode ? (
        <textarea
          cols="70"
          className="post-body"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
      ) : (
        <div className="post-body">{post.body}</div>
      )}

      <div className="button-container">
        {editMode ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button className="del-btn" onClick={handleDeletePostClick}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Post;
