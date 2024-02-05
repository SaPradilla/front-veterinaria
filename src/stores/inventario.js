import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import productoService from "../services/productoService";
import { useAuthStore } from "./auth";
import {toast} from 'vue3-toastify'
import { usePaginacion } from "./paginacion";

export const useInventario = defineStore('inventario', () => {

    // Stores
    const Auth = useAuthStore()
    const Paginacion = usePaginacion()

    
    // states
    const medicinaData = ref({
        nombre:'',
        tipo_medicinaId:null,
        precio:'',
        volumen:'',
        fecha_venciminento:'',
        cantidad_total:''
    })
    const accesoryData = ref({
        nombre:'',
        precio:'',
        tipo_accesorioId:'',
        descripcion:'',
        cantidad_total:0
    })

    const medicamentos = ref([])
    const accesorios = ref([])
    const productos = ref([])

    const tipo_medicina = ref([])
    const tipo_accesorio = ref([])
    // Metodos
    
    const obtenerProductos = ()=>{
        productoService.obtenerProductos()
        .then(res=>{
            productos.value = res.data.producto
            return true
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data.message)

            return false
        })
    }

    const verMedicamentos = ()=>{
        productoService.obtenerMedicamentos()
        .then(res=>{
            // console.log()
            medicamentos.value = res.data.productos
        
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data.message)
        
        })
    }

    const verAccesorios = ()=>{
        productoService.obtenerAcesorios()
        .then(res=>{
            // console.log()
            accesorios.value = res.data.productos
        
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data.message)
        
        })
    }

    const agregarMedicinas = ()=>{
        
        productoService.registrarMedicina(Auth.token,medicinaData.value)
        .then(res =>{
            console.log(res)
            toast.success('Medicina Registrada',{
                position: toast.POSITION.TOP_CENTER
            })
            Object.assign(medicinaData.value,{
                nombre:'',
                tipo_medicinaId:null,
                precio:'',
                volumen:'',
                fecha_venciminento:'',
                cantidad_total:''
            })
        })
        .catch(err =>{
            console.log(err)
            Auth.verificarSesion(err.response.data)
            toast.error('Error al Registrar la medicina',{
                position: toast.POSITION.TOP_CENTER
            })
        })

    }
    const agregarAccesorio = ()=>{
        productoService.registrarAccesorio(Auth.token,accesoryData.value)
        .then(res =>{
            console.log(res)
            toast.success('Medicina Registrada',{
                position: toast.POSITION.TOP_CENTER
            })
            Object.assign(accesoryData.value,{
                nombre:'',
                precio:'',
                tipo_accesorioId:null,
                descripcion:'',
                cantidad_total:''
            })
        })
        .catch(err =>{
            console.log(err)
            Auth.verificarSesion(err.response.data)
            toast.error('Error al Registrar la medicina',{
                position: toast.POSITION.TOP_CENTER
            })
        })
    }

    const agregarTipoAccesorio = (newTypeAccesory)=>{
        productoService.registrarTipoAccesorio(Auth.token,newTypeAccesory)
            .then(res => {

                tipo_accesorio.value.push(res.data.TipoAccesorio)

                console.log(res)
            }).catch(err => console.log(err))
    }

    const verTipoMedicinas = ()=>{
        productoService.obtenerTipoMedicamentos(Auth.token)
        .then(res=>{
            tipo_medicina.value = res.data.tipo_medicina
        }).catch(err =>{
            // Auth.verificarSesion(err.)
            console.log(err)
        })
    }

    const verTipoAccesorio = ()=>{
        productoService.obtenerTipoAccesorio(Auth.token)
        .then(res => {
            tipo_accesorio.value = res.data.tipo_accesorios
        }).catch(err => console.log(err))
    }

    return {
        medicinaData,
        tipo_medicina,
        tipo_accesorio,
        accesoryData,
        agregarAccesorio,
        agregarMedicinas,
        agregarTipoAccesorio,
        verTipoMedicinas,
        verTipoAccesorio,
        productos,
        medicamentos,
        verMedicamentos,
        verAccesorios,
        accesorios
    }
})
