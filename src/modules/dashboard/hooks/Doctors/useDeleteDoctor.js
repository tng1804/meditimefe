import { useState } from 'react';
import axios from '../../../../axios';

export default function useDeleteDoctor() {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteDoctor = async (id) => {
    setDeleting(true);
    setError(null);
    try {
      await axios.delete(`/api/doctors/${id}`);
      setDeleting(false);
      return true;
    } catch (err) {
      setError(err);
      setDeleting(false);
      return false;
    }
  };

  return { deleteDoctor, deleting, error };
}