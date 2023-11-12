// HomePage.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../contect/auth';
import Tweets from '../components/Tweets';
// import './HomePage.css';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [photo, setImage] = useState(null);
  const [visibility, setVisibility] = useState('all');
  const [auth, setAuth] = useAuth();
  

  const openModal = () => {
    setIsModalOpen(true);
  };
  const submit = async () => {
    try {
      // const res = await axios.post(`/api/posted/create-post`, {
      //   title: title,
      //   photo: photo,
      //   // userid:123564,
      //   userid: auth?.user?._id,
      //   visibility: visibility,
      // });
      
      const productData = new FormData();
      productData.append("name", "Fd");
      productData.append("description", "f");
      productData.append("price", "F");
      productData.append("quantity", "Sd");
      productData.append("photo", "sd");
      productData.append("category", "fsd");
      const postData = new FormData();
      postData.append("title", title);
      postData.append("photo", photo);
      postData.append("userid", auth?.user?._id);
      postData.append("type", visibility);
      console.log(postData.data);
      
      const res = await axios.post(`/api/posted/create-post`, postData);
      
      // Assuming the server response contains a 'message' property
      if (res.data.message) {
        alert(res.data.message);
      } else {
        console.error('Unexpected response format from the server');
      }
    } catch (error) {
      // Handle errors
      console.error('Error creating post:', error.message);
      alert('An error occurred while creating the post.');
    }
    closeModal();
  };

  const closeModal = () => {
    setTitle('');
    setImage(null);
    setVisibility('all');
    setIsModalOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('Please enter a title for the post');
      return;
    }

    // Perform actions to save the post, such as sending data to a server
    // Include the image data and visibility option as needed

    // Reset the form after submission
    setTitle('');
    setImage(null);
    setVisibility('all');

    // Close the modal after submission
    closeModal();
  };

  const customStyles = {
    content: {
      width: '300px',
      margin: 'auto',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      border: 'none',
    },
  };

  return (
    <div className="home-page-container">
      <h1>Home Page</h1>

      <button className="create-post-button" onClick={openModal}>
        Create a New Post
      </button>
      <Tweets></Tweets>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create New Post"
        style={customStyles}
      >
        <h2 className="modal-title">Create a New Post</h2>

        <form onSubmit={handlePostSubmit}>
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="titleInput"
            value={title}
            onChange={handleTitleChange}
            className="input-field"
          />

          <label htmlFor="imageInput">Image:</label>
          <label className="image-upload-label" htmlFor="imageInput">
            <FontAwesomeIcon icon={faImage} className="image-upload-icon" />
            Upload Image
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden-input"
          />

          <label className="visibility-label">Visibility:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                value="all"
                checked={visibility === 'all'}
                onChange={handleVisibilityChange}
              />
              All
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="followers"
                checked={visibility === 'followers'}
                onChange={handleVisibilityChange}
              />
              Followers
            </label>
          </div>

          <div className="button-group">
            <button type="submit" onClick={submit} className="submit-button">
              Post
            </button>
            <button type="button" onClick={closeModal} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HomePage;
