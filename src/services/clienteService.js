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
    editarCliente(token,id,data){
        return api.put(`/clientes/edit/client/${id}`,data,{
            headers: {'auth-token': token, 'Content-Type': 'multipart/form-data',}
        })
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
            headers: {'auth-token': token, 'Content-Type': 'multipart/form-data',}
        })
    },
    editarMascotaCliente(token,id,data){
        return api.put(`/clientes/edit/pet/${id}`, data, {
            headers: {'auth-token': token, 'Content-Type': 'multipart/form-data',}
        })
    },
    obtenerSolicitudCliente(token,id){
        return api.get(`/clientes/list/request-appointment/${id}`,
            { headers: {'auth-token': token}}
        )
    },
    aprobarSolicitudAgendada(token,ids,data){
        return api.put(`/clientes/approve/request-appointment/${ids.id_cita}/${ids.id_cliente}/${ids.id_solicitud}`,data,{
            headers: {'auth-token': token}
        })
    }

}