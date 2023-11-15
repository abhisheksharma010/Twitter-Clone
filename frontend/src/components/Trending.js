import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../stlyes/Trending.css';

const Trending = () => {
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState({});

  useEffect(() => {
    // Assume you have an API endpoint for fetching users and post
    const fetchTrendingData = async () => {
      try {
        // Fetch users
        const usersResponse = await axios.get('/api/users');
        setUsers(usersResponse.data);

        // Fetch a post
        const postResponse = await axios.get('/api/posts/1'); // Adjust the endpoint accordingly
        setPost(postResponse.data);
      } catch (error) {
        console.error('Error fetching trending data:', error);
      }
    };

    fetchTrendingData();
  }, []);

  return (
    <div>
      <h2>Trending</h2>

      {/* Display Users */}
      <div>
        <h3>Users:</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <img src={user.avatar} alt={`Avatar of ${user.name}`} />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Display Post */}
      <div>
        <h3>Post:</h3>
        <div>
          <img src={post.authorAvatar} alt={`Avatar of ${post.author}`} />
          <span>{post.author}</span>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Trending;
