import React, { useEffect, useState } from 'react';

import './ItemDetail.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchItem from '../../hooks/useFecthItem';
import Loader from '../../components/Loader/Loader';
import client from '../../axiosConfig';
import toast from 'react-hot-toast';
import isEmptyObject from '../../utils/isObjectEmpty';

const ItemDetail = () => {
  const navigate = useNavigate();

  const [cannotEdit, setCannotEdit] = useState(true);
  const [changed, setChanged] = useState(false); // To know that input changed and update buton should show

  const [pageLoader, setPageLoader] = useState(false);

  const { id } = useParams();

  const { item, loading, error } = useFetchItem(`/posts/${id}`);

  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const handleUpdateItem = () => {
    if (!changed) {
      toast.success('You can edit post now');
    }

    // Only called when  changed state is true
    if (changed) {
      setPageLoader(true);
      // Call update function

      client
        .put(`posts/${id}`, formData)
        .then((res) => {
          setPageLoader(false);
          setChanged(false);
          toast.success('Updated successfully');
        })
        .catch((error) => {
          setPageLoader(false);
          toast.error(error.message);
        });
    }
  };

  const handleDeleteItem = () => {
    setPageLoader(true);
    // Call update function

    client
      .delete(`posts/${id}`)
      .then((res) => {
        setPageLoader(false);
        setChanged(false);
        toast.success('Deleted successfully');
        navigate('/items');
      })
      .catch((error) => {
        setPageLoader(false);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    setChanged(false);
    if (item) {
      setChanged(false);
      setFormData({
        title: item.title || '',
        body: item.body || '',
      });
    }
  }, [item]);

  return (
    <>
      <Loader isLoading={loading || pageLoader} />
      <div className="details-con container">
        <FaArrowLeft
          onClick={() => navigate('/items')}
          className="back-arrow"
        />

        <div>
          {!isEmptyObject(item) && (
            <div className="main-detail">
              <div className="details-action-btn">
                <button
                  className={`${changed ? 'update-btn' : 'edit-btn'} btn `}
                  onClick={() => {
                    setCannotEdit(false);

                    // Only called when  changed state is true
                    handleUpdateItem();
                  }}
                >
                  {changed ? 'Update' : 'Edit'}
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDeleteItem()}
                >
                  Delete
                </button>
              </div>

              <form
                className="item-detail-form"
                onSubmit={(event) => {
                  event.preventDefault();

                  handleUpdateItem();
                }}
              >
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }));
                    setChanged(true);
                  }}
                  readOnly={cannotEdit}
                  required
                />

                <textarea
                  placeholder="Enter post"
                  value={formData.body}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      body: e.target.value,
                    }));
                    setChanged(true);
                  }}
                  readOnly={cannotEdit}
                  required
                />
              </form>
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
      </div>
    </>
  );
};

export default ItemDetail;
