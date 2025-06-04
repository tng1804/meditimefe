import { useState } from 'react';
import axios from '../../../../axios';

export default function useDeletePatient() {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deletePatient = async (id) => {
    setDeleting(true);
    setError(null);
    try {
      await axios.delete(`/api/patients/${id}`);
      setDeleting(false);
      return true;
    } catch (err) {
      setError(err);
      setDeleting(false);
      return false;
    }
  };

  return { deletePatient, deleting, error };
}