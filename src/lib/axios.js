import axios from 'axios'

// baseURL: 'http://localhost:6060/api/admin'

const api = axios.create({
    baseURL:'https://api-veterinaria-production.up.railway.app/api/admin'
})

export default api