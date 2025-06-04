import { useState } from "react";
import axios from '../../../../axios';

export default function useUpdateDoctor() {
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

     const updateDoctor = async (id, data) => {
        setUpdating(true);
        setError(null);

        try {
            await axios.put(`/api/doctors/${id}`, data);
            setUpdating(false);
            return true;
        } catch (err) {
            setError(err);
            setUpdating(false);
            return false;
        }
    };
    
    return { updateDoctor, updating, error };
}