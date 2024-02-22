import api from "../lib/axios";

export default{
    obtenerMedicamentos(){
        return api.get(`/shop/list/products/medicines`)
    },
    obtenerAcesorios(){
        return api.get(`/shop/list/products/accesories`)
    },
    obtenerProductos(){
        return api.get(`/shop/list/products`)
    },
    registrarMedicina(token,data){
        return api.post('/admin/register/product/medicine',data,
            { headers: {'auth-token': token, 'Content-Type': 'multipart/form-data',} }
        )
    },
    registrarAccesorio(token,data){
        return api.post('/admin/register/product/accessory',data,
        { headers: {'auth-token': token, 'Content-Type': 'multipart/form-data',} }
        )
    },
    registrarTipoAccesorio(token,data){
        return api.post('/admin/register/type-accessory',data,
            { headers: {'auth-token': token}}
        )
    },
    registrarTipoMedicamento(token,data){
        return api.post('/admin/register/type-medicine',data,
            { headers: {'auth-token': token}}
        )
    },
    obtenerTipoMedicamentos(token){
        return api.get('/admin/list/type-medicine',
            { headers: {'auth-token': token}}
        )
    },
    obtenerTipoAccesorio(token){
        return api.get('/admin/list/type-accesory',
            { headers: {'auth-token': token}}
        )
    },
    editarMedicina(token,id,data){
        return api.put(`/admin/edit/product/medicine/${id}`,data,
        { headers: {'auth-token': token, 'Content-Type': 'multipart/form-data',} }
        )
    },
    editarAccesorio(token,id,data){
        return api.put(`/admin/edit/product/accesory/${id}`,data,
        { headers: {'auth-token': token, 'Content-Type': 'multipart/form-data',} }
        )
    },
    cambiarEstadoMedicina(token,id){
        return api.put(`/admin/status/product/medicine/${id}`, {}, {
            headers: {'auth-token': token}
        })
    },
    cambiarEstadoAccesorio(token,id){
        return api.put(`/admin/status/product/accesory/${id}`,{},{
            headers: {'auth-token': token}
        })
    }

}