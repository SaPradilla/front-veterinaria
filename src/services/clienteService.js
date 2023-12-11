import api from "../lib/axios";

export default {
    obtenerClientes(token){
        return api.get('/admin/list/client',
           { headers: {'auth-token': token}}
        )
    },
    obtenerClienteAdmin(id,token){
        return api.get(`/admin/list/client/${id}`,
        { headers: {'auth-token': token}}
        )
    },
    registar(data){
        return api.post('/auth/register/client',data)
    },
    obtenerCliente(id,token){
        return api.get(`/clientes/list/client/${id}`,
        { headers: {'auth-token': token}}
        )
    },

}