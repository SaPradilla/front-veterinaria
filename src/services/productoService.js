import api from "../lib/axios";

export default{
    obtenerMedicamentos(page,size){
        return api.get(`/shop/list/products/medicines?page=${page}&size=${size}`)
    },
    obtenerAcesorios(page,size){
        return api.get(`/shop/list/products/accesories?page=${page}&size=${size}`)
    },
    registrarMedicina(token,data){
        return api.post('/admin/register/product/medicine',data,
            { headers: {'auth-token': token}}
        )
    },
    obtenerTipoMedicamentos(token){
        return api.get('/admin/list/type-medicine',
            { headers: {'auth-token': token}}
        )
    }
}