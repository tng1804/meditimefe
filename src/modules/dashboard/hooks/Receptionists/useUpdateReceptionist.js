import { useState } from "react";
import axios from '../../../../axios';

export default function useUpdateReceptionist() {
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

     const updateReceptionist = async (id, data) => {
        setUpdating(true);
        setError(null);

        try {
            await axios.put(`/api/receptionists/${id}`, data);
            setUpdating(false);
            return true;
        } catch (err) {
            setError(err);
            setUpdating(false);
            return false;
        }
    };
    
    return { updateReceptionist, updating, error };
}