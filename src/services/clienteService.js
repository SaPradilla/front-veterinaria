import api from "../lib/axios";

export default {
    obtenerCliente(data){
        return api.post('/auth/login/client',data)
    },
    obtenerClientes(data){
        return api.post('/auth/login/employee',data)
    },
    registar(data){
        return api.post('/register/client',data)
    }

}