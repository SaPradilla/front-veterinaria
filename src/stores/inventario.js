import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import productoService from "../services/productoService";
import { useAuthStore } from "./auth";
import {toast} from 'vue3-toastify'
import { usePaginacion } from "./paginacion";
import { useFormatear } from "./formatear";

export const useInventario = defineStore('inventario', () => {

    // Stores
    const Auth = useAuthStore()
    const Paginacion = usePaginacion()
    const Formato = useFormatear()
    
    // states
    const tipoVolumen = ref(null)

    const medicinaData = ref({
        nombre:'',
        tipo_medicinaId:null,
        precio:'',
        volumen:null,
        fecha_venciminento:'',
        cantidad_total:null
    })
    const accesoryData = ref({
        nombre:'',
        precio:'',
        tipo_accesorioId:'',
        cantidad_total:null
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
        if(validateData(medicinaData.value)){
            toast.error('Todos los campos son obligatorios',{
                position: toast.POSITION.TOP_CENTER
            })
            return
        }
        medicinaData.value.volumen = medicinaData.value.volumen + tipoVolumen.value  
        medicinaData.value.tipo_medicinaId = medicinaData.value.tipo_medicinaId.id
        medicinaData.value.fecha_venciminento = Formato.formatearFecha(medicinaData.value.fecha_venciminento)

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
        if(validateData(accesoryData.value)){
            toast.error('Todos los campos son obligatorios',{
                position: toast.POSITION.TOP_CENTER
            })
            return
        }
        accesoryData.value.tipo_accesorioId =  accesoryData.value.tipo_accesorioId.id
        console.log(accesoryData.value)
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
    const agregarTipoMedicamento = (newTypeMedical)=>{
        productoService.registrarTipoMedicamento(Auth.token,newTypeMedical)
            .then(res => {
                tipo_medicina.value.push(res.data.TipoMedicina)
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

    const validateData = (dataObject)=>{
        console.log(dataObject)
        console.log(medicinaData.value)
        // si algun objecto tiene nulo o '' retorna true 
        return Object.values(dataObject).some(value => value === null || value === '');
    }

    return {
        medicinaData,
        tipo_medicina,
        tipo_accesorio,
        accesoryData,
        agregarAccesorio,
        agregarMedicinas,
        agregarTipoAccesorio,
        agregarTipoMedicamento,
        verTipoMedicinas,
        verTipoAccesorio,
        productos,
        medicamentos,
        verMedicamentos,
        verAccesorios,
        accesorios,
        tipoVolumen,
    }
})
