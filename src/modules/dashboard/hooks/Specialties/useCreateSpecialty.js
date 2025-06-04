import { useState } from "react";
import axios from '../../../../axios';

export default function useCreateSpecialty() {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const createSpecialty = async (data) => {
    setCreating(true);
    setError(null);
    try {
      await axios.post('/api/specialties', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCreating(false);
      return true;
    } catch (err) {
      setError(err);
      setCreating(false);
      return false;
    }
  };

  return { createSpecialty, creating, error };
}