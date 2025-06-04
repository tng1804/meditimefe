import { useParams } from 'react-router-dom';

export default function MedicalSpecialtyDetail() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  return <div>Hiển thị chi tiết chuyên khoa với ID: {id}</div>;
}
