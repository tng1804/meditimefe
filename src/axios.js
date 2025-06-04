import Axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_API_URL;
const axios = Axios.create({
	baseURL: apiUrl, //"http://localhost:8000"
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});

// Thêm interceptor để luôn lấy token mới nhất từ cookie
axios.interceptors.request.use(config => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return config;
});

export default axios;
