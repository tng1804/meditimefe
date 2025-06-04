import { useEffect, useState } from 'react';
import axios from '../../../../axios';

export default function useSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSpecialties = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/specialties/');
      // Nếu API trả về { data: [...] }
      const users = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
          ? res.data.data
          : [];
      setSpecialties(users);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchSpecialties();
  }, []);

  return { specialties, setSpecialties, loading, error, fetchSpecialties };
}