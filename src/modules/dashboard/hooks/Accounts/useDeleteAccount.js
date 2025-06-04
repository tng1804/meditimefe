import { useState } from 'react';
import axios from '../../../../axios';

export default function useDeleteAccount() {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteAccount = async (id) => {
    setDeleting(true);
    setError(null);
    try {
      await axios.delete(`/api/users/${id}`);
      setDeleting(false);
      return true;
    } catch (err) {
      setError(err);
      setDeleting(false);
      return false;
    }
  };

  return { deleteAccount, deleting, error };
}