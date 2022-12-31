import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const complaint = (formData) => API.post('/shortUrls',formData);


export const fetchurls = (formData) => API.post('/short',formData);



export const signIn = (formData) => API.post('/signin', formData);
export const signUp = (formData) => API.post('/signup', formData);

