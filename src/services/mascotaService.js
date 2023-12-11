import api from "../lib/axios";

export default {
    registarMascota(data,token){
        return api.post('/admin/register/pet',data,
            { headers: {'auth-token': token}}
         )
    },
    obtenerMascotas(token,page,size){
        return api.get(`/admin/list/pet?page=${page}&size=${size}`,
        { headers: {'auth-token': token}}

        )
    },
    cambiarEstado(token,id){
        return api.put(`/admin/status/pet/${id}`, {}, {
            headers: {'auth-token': token}
        })
    },
    editarMascota(token,id,data){
        return api.put(`/admin/edit/pet/${id}`, data, {
            headers: {'auth-token': token}
        })
    },

}