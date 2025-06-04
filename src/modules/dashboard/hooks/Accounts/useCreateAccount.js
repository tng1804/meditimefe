import { useState } from "react";
import axios from '../../../../axios';

export default function useCreateAccount() {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const createAccount = async (data) => {
    setCreating(true);
    setError(null);
    try {
      await axios.post('/api/users', data);
      setCreating(false);
      return true;
    } catch (err) {
      setError(err);
      setCreating(false);
      return false;
    }
  };

  return { createAccount, creating, error };
}