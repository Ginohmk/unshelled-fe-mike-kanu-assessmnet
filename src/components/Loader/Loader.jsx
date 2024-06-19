import React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';

import './Loader.css';

const Loader = ({ isLoading }) => {
  let color = '#4caf50';
  return (
    <>
      {isLoading && (
        <div className="loading">
          <ClipLoader
            color={color}
            loading={isLoading}
            cssOverride={true}
            size={150}
            aria-label="Loading Spinner"
          />
        </div>
      )}
    </>
  );
};

export default Loader;
