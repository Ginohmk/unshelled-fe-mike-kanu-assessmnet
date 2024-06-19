// src/hooks/useFetchItems.js
import { useState, useEffect } from 'react';
import client from '../axiosConfig';
import toast from 'react-hot-toast';

const useFetchItems = (url, limit, page) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [curPage, setCurPage] = useState(page || 1); //Set default page
  let [pageSize, setPageSize] = useState(limit ? limit : 10); // Set default pageSize

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted
    setLoading(true);

    (async () => {
      await client
        .get(`${url}?_page=${curPage}&_limit=${pageSize}`)
        .then((response) => {
          if (isMounted) {
            setItems(response.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          if (isMounted) {
            setError(error);
            setLoading(false);

            toast.error(error?.message);
          }
        });
    })();

    window.scrollTo(0, 0);

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [url, curPage]);

  return { items, loading, error, setCurPage, curPage };
};

export default useFetchItems;
