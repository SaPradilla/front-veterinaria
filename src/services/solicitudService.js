import api from "../lib/axios";
export default {
    registrarSolicitud(token,data){
        return api.post('/clientes/register/request-appointment',data,
            { headers: {'auth-token': token}}
        )
    }
}