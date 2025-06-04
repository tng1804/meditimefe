import { useState } from "react";
import axios from '../../../../axios';

export default function useCreateReceptionist() {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const createReceptionist = async (data) => {
    setCreating(true);
    setError(null);
    try {
      await axios.post('/api/receptionists', data);
      setCreating(false);
      return true;
    } catch (err) {
      setError(err);
      setCreating(false);
      return false;
    }
  };

  return { createReceptionist, creating, error };
}