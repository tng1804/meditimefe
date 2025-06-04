import { useState } from 'react';
import axios from '../../../../axios';

export default function useDeleteReceptionist() {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteReceptionist = async (id) => {
    setDeleting(true);
    setError(null);
    try {
      await axios.delete(`/api/receptionists/${id}`);
      setDeleting(false);
      return true;
    } catch (err) {
      setError(err);
      setDeleting(false);
      return false;
    }
  };

  return { deleteReceptionist, deleting, error };
}