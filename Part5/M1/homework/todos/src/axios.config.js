import axios from "axios"

axios.defaults.baseURL = 'http://localhost:3005/api'

axios.interceptors.response.use(res => res.data)