import { useEffect, useState } from 'react';
import axios from '../../../../axios';

export default function useGetSpecialties() {
  const [availableSpecialties, setAvailableSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAvailableSpecialties = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/specialties');
      // Nếu API trả về { data: [...] }
      const specialties = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
          ? res.data.data
          : [];
      setAvailableSpecialties(specialties);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAvailableSpecialties();
  }, []);

  return { availableSpecialties, setAvailableSpecialties, loading, error, fetchAvailableSpecialties };
}