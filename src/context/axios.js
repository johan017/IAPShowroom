import axios from 'axios';
const config = require('../config/config')

export default axios.create({
    baseURL: config.baseURL
});