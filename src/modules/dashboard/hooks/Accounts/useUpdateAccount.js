import { useState } from "react";
import axios from '../../../../axios';

export default function useUpdateAccount() {
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

     const updateAccount = async (id, data) => {
        setUpdating(true);
        setError(null);

        try {
            await axios.put(`/api/users/${id}`, data);
            setUpdating(false);
            return true;
        } catch (err) {
            setError(err);
            setUpdating(false);
            return false;
        }
    };
    
    return { updateAccount, updating, error };
}