import { useState } from "react";
import axios from '../../../../axios';

export default function useUpdateSpecialty() {
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

     const updateSpecialty = async (id, data) => {
        setUpdating(true);
        setError(null);

        try {
            // Dùng form-data để gửi file và dữ liệu thì cần _method=PUT
            // vì axios không hỗ trợ PUT với multipart/form-data trực tiếp
            await axios.post(`/api/specialties/${id}?_method=PUT`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUpdating(false);
            return true;
        } catch (err) {
            setError(err);
            setUpdating(false);
            return false;
        }
    };
    
    return { updateSpecialty, updating, error };
}