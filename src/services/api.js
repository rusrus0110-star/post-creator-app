const API_BASE_URL = "https://699eb2fe78dda56d396b07da.mockapi.io/posts";

export const getPosts = async () => {
  try {
    console.log("Fetching posts from:", API_BASE_URL);
    const response = await fetch(API_BASE_URL);
    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Posts received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    console.log("Creating post:", postData);
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postData.title,
        text: postData.content,
        date: Math.floor(Date.now() / 1000),
        user: postData.user,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(postData.user)}&background=5A6FA8&color=fff&size=128`,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Post created:", data);
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    console.log("Deleting post:", id);
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Post deleted:", data);
    return data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
