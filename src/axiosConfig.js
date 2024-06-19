// src/axiosConfig.js
import axios from 'axios';

// Create an instance of axios
const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
});

// You can add more headers or any other Axios configurations here

export default client;
