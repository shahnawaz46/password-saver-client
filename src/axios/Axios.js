import axios from 'axios';

const url = 'https://api-orbitius-password.onrender.com'
// const url = 'http://localhost:9000'

export const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
})
