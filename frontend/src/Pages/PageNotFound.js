// PageNotFound.js

import React from 'react';

const PageNotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for might be in another castle!</p>
      <img
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="Mario saying Sorry, but your princess is in another castle"
        style={{ width: '300px', height: 'auto' }}
      />
    </div>
  );
};

export default PageNotFound;
