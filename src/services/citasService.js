import api from "../lib/axios";

export default {
    agregarCita(token,data){
        return api.post('/admin/register/medical-appointment',data,
            { headers: {'auth-token': token}}
        )
    },
    obtenerCitas(token,page,size){
        return api.get(`/admin/list/medical-appointment?page=${page}&size=${size}`,
            { headers: {'auth-token': token}}
        )
    },
    obtenerSolicitudes(token){
        return api.get('/admin/list/request-appointment',
        { headers: {'auth-token': token}}
    )},

    aprobarSolicitudes(token,id){
        return api.put(`/admin/approve/request-appointment/${id}`, {}, {
            headers: {'auth-token': token}
        })
    },
    
}