import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = ({ url, method, body, headers = null, trigger }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trigger) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios({
          url,
          method,
          data: body,
          headers,
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        console.log(err);
        setError(err.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trigger]);

  return { data, loading, error };
};

export default useAxios;
