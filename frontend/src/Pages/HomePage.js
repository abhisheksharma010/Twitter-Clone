// HomePage.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../contect/auth';
import Tweets from '../components/Tweets';
import LayoutPage from '../components/LayoutPage';
import './HomePage.css';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [photo, setImage] = useState(null);
  const [visibility, setVisibility] = useState('all');
  const [auth, setAuth] = useAuth();
  const [tweetCategory, setTweetCategory] = useState('forYou');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const submit = async () => {
    try {
      const postData = new FormData();
      postData.append('title', title);
      postData.append('photo', photo);
      postData.append('userid', auth?.user?._id);
      postData.append('type', visibility);

      const res = await axios.post(`/api/posted/create-post`, postData);

      if (res.data.message) {
        alert(res.data.message);
      } else {
        console.error('Unexpected response format from the server');
      }
    } catch (error) {
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

    setTitle('');
    setImage(null);
    setVisibility('all');

    closeModal();
  };

  const handleCategoryChange = (category) => {
    setTweetCategory(category);
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
    <LayoutPage>
      <div className="home-page-container">
        <div className="category-buttons">
          <button
            className={tweetCategory === 'forYou' ? 'active' : ''}
            onClick={() => handleCategoryChange('forYou')}
          >
            For You
          </button>
          <button
            className={tweetCategory === 'following' ? 'active' : ''}
            onClick={() => handleCategoryChange('following')}
          >
            Following
          </button>
        </div>

        <button className="create-post-button" onClick={openModal}>
          Create a New Post
        </button>

        <Tweets category={tweetCategory}></Tweets>

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
    </LayoutPage>
  );
};

export default HomePage;
