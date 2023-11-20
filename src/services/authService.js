import api from "../lib/axios";

export default {
    loguear(data){
        return api.post('/login/client',data)
    },
    loguearEmpleado(data){
        return api.post('/login/employee',data)
    },
    registar(data){
        return api.post('/register/client',data)
    }

}