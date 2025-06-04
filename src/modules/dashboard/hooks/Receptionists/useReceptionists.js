import { useEffect, useState } from 'react';
import axios from '../../../../axios';

export default function useReceptionists() {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReceptionists = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/receptionists/');
      // Nếu API trả về { data: [...] }
      const users = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
          ? res.data.data
          : [];
      setReceptionists(users);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchReceptionists();
  }, []);

  return { receptionists, setReceptionists, loading, error, fetchReceptionists };
}