import { useState } from 'react';
import axios from '../../../../axios';

export default function useDeleteSpecialty() {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteSpecialty = async (id) => {
    setDeleting(true);
    setError(null);
    try {
      await axios.delete(`/api/specialties/${id}`);
      setDeleting(false);
      return true;
    } catch (err) {
      setError(err);
      setDeleting(false);
      return false;
    }
  };

  return { deleteSpecialty, deleting, error };
}