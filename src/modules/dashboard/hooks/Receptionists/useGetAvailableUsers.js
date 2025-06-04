import { useEffect, useState } from 'react';
import axios from '../../../../axios';

export default function useGetAvailableUsers() {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAvailableUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/receptionists/available-users');
      // Nếu API trả về { data: [...] }
      const users = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
          ? res.data.data
          : [];
      setAvailableUsers(users);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAvailableUsers();
  }, []);

  return { availableUsers, setAvailableUsers, loading, error, fetchAvailableUsers };
}