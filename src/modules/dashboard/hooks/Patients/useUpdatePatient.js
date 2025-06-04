import { useState } from "react";
import axios from '../../../../axios';

export default function useUpdatePatient() {
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

     const updatePatient = async (id, data) => {
        setUpdating(true);
        setError(null);

        try {
            await axios.put(`/api/patients/${id}`, data);
            setUpdating(false);
            return true;
        } catch (err) {
            setError(err);
            setUpdating(false);
            return false;
        }
    };
    
    return { updatePatient, updating, error };
}