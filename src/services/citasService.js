import api from "../lib/axios";

export default {
    agregarCita(token,data){
        return api.post('/admin/register/medical-appointment',data,
            { headers: {'auth-token': token}}
        )
    },
    obtenerCitas(token){
        return api.get(`/admin/list/medical-appointment`,
            { headers: {'auth-token': token}}
        )
    },
    obtenerSolicitudes(token){
        return api.get('/admin/list/request-appointment',
        { headers: {'auth-token': token}}
    )},

    aprobarSolicitudes(token,id,data){
        return api.put(`/admin/approve/request-appointment/${id}`, data, {
            headers: {'auth-token': token}
        })
    },
    cambiarFechaCita(token,id,data){
        return api.put(`/admin/edit/date/medical-appointment/${id}`,data,{
            headers: {'auth-token': token}
        })
    }
    
}