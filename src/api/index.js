const API_ROOT = "https://jsonplaceholder.typicode.com";

// we create an object consisting of function that return api url upon invocation
const API_URLS = {
  getPostsUrl: () => `${API_ROOT}/posts`,
  updatePostUrl: (postId) => `${API_ROOT}/posts/${postId}`,
  deletePostUrl: (postId) => `${API_ROOT}/posts/${postId}`,
};


//  this function is created to avoid repeatation of code while calling api 
async function customFetch(url, { body, ...customConfig }) {
  // console.log('body', body);
  // console.log('customConfig',customConfig);

  const headers = {
    "Content-type": "application/json; charset=UTF-8",
  };
  const config = {
    ...customConfig,
    headers,
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  // console.log(config);
  try {
    const response = await fetch(url, config);
    const jsonData = await response.json();
    // console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("error!!", error);
  }
}


// api call functions

export async function getPosts() {
  return customFetch(API_URLS.getPostsUrl(), { method: "GET" });
}

export async function updatePost(postId, title, postBody, userId) {
  // console.log('title', title, 'body',postBody, userId);
  return customFetch(API_URLS.updatePostUrl(postId), {
    method: "PUT",
    body: {
      id: postId,
      title,
      body: postBody,
      userId,
    },
  });
}



export async function deletePost(postId) {
  customFetch(API_URLS.deletePostUrl(postId), { method: "DELETE" });
}
