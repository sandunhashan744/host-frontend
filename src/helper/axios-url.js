import axios from 'axios';

const instance = axios.create({baseURL: 'https://ttcuser-api.onrender.com'});  

export default instance

// http://localhost:8080
// https://ttcuser-api.onrender.com 