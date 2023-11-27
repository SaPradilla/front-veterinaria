import api from "../lib/axios";

export default {
    obtenerCliente(data){
        return api.post('/admin/client/all',data,
            headers: {
                'Authorization': `token ${access_token}`
        })
    },
    obtenerClientes(data){
        return api.post('/auth/login/employee',data)
    },
    registar(data){
        return api.post('/register/client',data)
    }

}