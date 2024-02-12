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
    obtenerMascotasCliente(token,id){
        return api.get(`/clientes/list/pets-client/${id}`,{
            headers: {'auth-token': token}
        })
    },
    registrarMascotaCliente(token,data){
        return api.post('/clientes/register/pet',data,{
            headers: {'auth-token': token}
        })
    }

}