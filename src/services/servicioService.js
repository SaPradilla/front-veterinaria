import api from "../lib/axios";

export default {
    obtenerServicios(token){
        return api.get('/clientes/list/service',
            { headers: {'auth-token': token}}
        )
    },
    agregarServicio(token,data){
        return api.post('/admin/register/service',data,{
            headers: {'auth-token': token}
        })
    }
    
}