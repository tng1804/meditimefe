import { useEffect, useState } from 'react';
import axios from '../../../../axios';

export default function useAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/users/');
      // Nếu API trả về { data: [...] }
      const users = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
          ? res.data.data
          : [];
      setAccounts(users);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAccounts();
  }, []);

  return { accounts, setAccounts, loading, error, fetchAccounts };
}