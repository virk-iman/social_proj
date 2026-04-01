import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5001/api',
});

API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const { token } = JSON.parse(userInfo);
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const loginUser = async (credentials) => {
    const { data } = await API.post('/auth/login', credentials);
    return data;
};

export const registerUser = async (userData) => {
    const { data } = await API.post('/auth/register', userData);
    return data;
};

export const fetchPosts = async () => {
    const { data } = await API.get('/posts');
    return data;
};

export const createNewPost = async (postData) => {
    const { data } = await API.post('/posts', postData);
    return data;
};

export const toggleLike = async (postId) => {
    const { data } = await API.put(`/posts/${postId}/like`);
    return data;
};

export const addComment = async (postId, text) => {
    const { data } = await API.post(`/posts/${postId}/comment`, { text });
    return data;
};
