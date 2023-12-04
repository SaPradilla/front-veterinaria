import axios from 'axios'


// baseURL:'https://api-veterinaria-production.up.railway.app/api'
const api = axios.create({
    baseURL: 'http://localhost:6060/api'
    

})

export default api