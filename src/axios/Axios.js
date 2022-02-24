import axios from 'axios';

const url = 'https://save-server.herokuapp.com'

export const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
})
