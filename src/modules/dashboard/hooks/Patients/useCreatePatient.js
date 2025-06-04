import { useState } from "react";
import axios from '../../../../axios';

export default function useCreatePatient() {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const createPatient = async (data) => {
    setCreating(true);
    setError(null);
    try {
      await axios.post('/api/patients', data);
      setCreating(false);
      return true;
    } catch (err) {
      setError(err);
      setCreating(false);
      return false;
    }
  };

  return { createPatient, creating, error };
}