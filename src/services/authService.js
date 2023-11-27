import api from "../lib/axios";

export default {
    loguear(data){
        return api.post('/auth/login/client',data)
    },
    loguearEmpleado(data){
        return api.post('/auth/login/employee',data)
    },
    registar(data){
        return api.post('/register/client',data)
    }

}