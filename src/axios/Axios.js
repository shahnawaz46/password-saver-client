import axios from 'axios';

const url = 'https://save-server.herokuapp.com'
// const url = 'http://localhost:9000'

export const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
})
