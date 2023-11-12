import React, { useState, useEffect } from 'react';

const Tweets = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from your server
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posted/for-you'); // replace with your API endpoint
        const data = await response.json();

        if (response.ok) {
          setPosts(data.posts); // Assuming your API returns an object with a 'posts' key
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      <h1>Tweets</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.title}</p>
          <p>{post.type}</p>
          <p>{post.userid}</p>
          {/* {post.image && (
            <img
              src={`data:${post.image.contentType};base64,${post.image.data.toString('base64')}`}
              alt="Post Image"
            />
            
          )} */}
          {/* Add more details based on your post schema */}
        </div>
      ))}
    </div>
  );
};

export default Tweets;
