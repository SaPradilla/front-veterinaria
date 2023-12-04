import api from "../lib/axios";

export default {
    obtenerEmpleados(token){
        return api.get('/admin/list/employees',
           { headers: {'auth-token': token}}
        )
    },
    obtenerEmpleado(id,token){
        return api.get(`/admin/list/employee/${id}`,
        { headers: {'auth-token': token}}
        )
    },
    registarEmpleado(token,data){
        return api.post('/admin/register/employee',data,
            { headers: {'auth-token': token}}
        )
    }

}