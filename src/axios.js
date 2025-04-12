import Axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const axios = Axios.create({
	baseURL: apiUrl, //"http://localhost:8000/api"
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export default axios;
