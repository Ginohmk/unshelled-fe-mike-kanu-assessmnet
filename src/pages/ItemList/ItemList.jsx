import React from 'react';

import './ItemList.css';
import useFetchItems from '../../hooks/useFetchItemList';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ItemList = () => {
  const navigate = useNavigate();
  const { items, loading, error, setCurPage, setPageSize, curPage } =
    useFetchItems('/posts');

  const handleNextPage = () => {
    console.log('in Page up ');
    setCurPage(curPage + 1);
  };

  const handlePrevPage = () => {
    setCurPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="main-item container">
      <Loader isLoading={loading} />

      <FaArrowLeft onClick={() => navigate('/')} className="back-arrow" />

      {items.length > 0 && (
        <div className="items-main">
          <div className="items">
            {items.map(({ id, title }) => (
              <div
                key={id}
                className="item"
                onClick={() => navigate(`/items/${id}`)}
              >
                <p>{id}</p>

                <p>{title}</p>
              </div>
            ))}
          </div>
          <div className="items__pagination">
            <button
              onClick={handlePrevPage}
              disabled={curPage === 1}
              className="btn"
            >
              Previous
            </button>

            <button
              onClick={handleNextPage}
              className="btn"
              disabled={curPage === 10}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="error-oops">
          <h3>Oops an error occured</h3>

          <button className="btn oops-btn" onClick={() => navigate('/')}>
            Back to home
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;
