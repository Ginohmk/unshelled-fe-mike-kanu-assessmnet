// src/hooks/useFetchItems.js
import { useState, useEffect } from 'react';
import client from '../axiosConfig';
import toast from 'react-hot-toast';

const useFetchItem = (url) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted
    setLoading(true);

    (async () => {
      await client
        .get(`${url}`)
        .then((response) => {
          if (isMounted) {
            setItem(response.data);
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

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { item, loading, error };
};

export default useFetchItem;
