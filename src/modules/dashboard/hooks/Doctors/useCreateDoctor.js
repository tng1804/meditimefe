import { useState } from "react";
import axios from '../../../../axios';

export default function useCreateDoctor() {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const createDoctor = async (data) => {
    setCreating(true);
    setError(null);
    try {
      await axios.post('/api/doctors', data);
      setCreating(false);
      return true;
    } catch (err) {
      setError(err);
      setCreating(false); 
      return false;
    }
  };

  return { createDoctor, creating, error };
}