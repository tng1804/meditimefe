import { useEffect, useState } from 'react';
import axios from '../../../../axios';

export default function usePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/patients/');
      // Nếu API trả về { data: [...] }
      const users = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
          ? res.data.data
          : [];
      setPatients(users);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, setPatients, loading, error, fetchPatients };
}