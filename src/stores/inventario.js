import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import productoService from "../services/productoService";
import { useAuthStore } from "./auth";
import {toast} from 'vue3-toastify'
import { usePaginacion } from "./paginacion";
import { useFormatear } from "./formatear";
import { useRouter } from "vue-router";

export const useInventario = defineStore('inventario', () => {

    const router = useRouter()

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
        cantidad_total:null,
        imagen:null
    })
    const accesoryData = ref({
        nombre:null,
        precio:null,
        tipo_accesorioId:null,
        cantidad_total:null
    })
    const updateMedicinadata = ref({})
    const updateAccesorio = ref({})

    const medicamentos = ref([])
    const accesorios = ref([])
    const productos = ref([])

    const tipoxd = ref('')
    const tipo_medicina = ref([])
    const tipo_accesorio = ref([])




    // Metodos
    
    const cambiarEstadoAccesory = (id) =>{
        const findAccesorio = accesorios.value.find(accesorioData => accesorioData.accesorio.id === id)
        if(findAccesorio){
            findAccesorio.estado = findAccesorio.estado === 'Disponible' ? 'Agotado' : 'Disponible'
        }
        productoService.cambiarEstadoAccesorio(Auth.token,id)
        .then(res =>{
            // Mensaje 
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_RIGHT
            })
        }).catch(err=>{
            Auth.verificarSesion(err.response.data)
            console.log(err)
           
        })
    }

    const cambiarEstadoMedicine = (id) =>{
        const findmedicamentos = medicamentos.value.find(medicamentoData => medicamentoData.medicamento.id === id)
        if(findmedicamentos){
            findmedicamentos.estado = findmedicamentos.estado === 'Disponible' ? 'Agotado' : 'Disponible'
        }
        productoService.cambiarEstadoMedicina(Auth.token,id)
        .then(res=>{
             // Mensaje 
             toast.success(res.data.msg,{
                position: toast.POSITION.TOP_RIGHT
            })
        })
        .catch(err=>{
            Auth.verificarSesion(err.response.data)
            console.log(err)
        })
    }



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
            // Object.assign(medicinaData.value,{
            //     nombre:'',
            //     tipo_medicinaId:null,
            //     precio:'',
            //     volumen:'',
            //     fecha_venciminento:'',
            //     cantidad_total:''
            // })
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
        if(validateDataAccesory()) return 
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

    const actualizarMedicina = ()=>{
        console.log(updateMedicinadata.value)
        if(validateData(updateMedicinadata.value)){
            toast.error('Todos los campos son obligatorios',{
                position: toast.POSITION.TOP_CENTER
            })
            return
        }
        updateMedicinadata.value.tipo_medicinaId = updateMedicinadata.value.tipo_medicinaId.id
        updateMedicinadata.value.volumen = updateMedicinadata.value.volumen.toString() + tipoVolumen.value.toString()
        productoService.editarMedicina(Auth.token,updateMedicinadata.value.idMedicina,updateMedicinadata.value)
        
        .then(res =>{
            console.log(res.data)
            Object.assign(updateMedicinadata.value,{})
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_CENTER
            })
            setTimeout(()=>{
                router.push({name:'tiendas'})
            },100)
            
        }).catch(err =>{
            console.log(err)
            Auth.verificarSesion(err.response.data)
            toast.error('Error al actualizar la medicina',{
                position: toast.POSITION.TOP_CENTER
            })
        })

    }
    const actualizarAccesorio = ()=>{
        if(validateData(updateAccesorio.value)){
            toast.error('Todos los campos son obligatorios',{
                position: toast.POSITION.TOP_CENTER
            })
            return
        }
        updateAccesorio.value.tipo_accesorioId = updateAccesorio.value.tipo_accesorioId.id
        
        productoService.editarAccesorio(Auth.token,updateAccesorio.value.idAccesorio,updateAccesorio.value)
        
        .then(res =>{
            Object.assign(updateAccesorio.value,{})
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_CENTER
            })
            setTimeout(()=>{
                router.push({name:'tiendas'})
            },100)
            
        }).catch(err =>{
            console.log(err)
            Auth.verificarSesion(err.response.data)
            toast.error('Error al actualizar la accesorio',{
                position: toast.POSITION.TOP_CENTER
            })
        })

    }


    const validateDataAccesory = () =>{
        let empyData = false
        if(accesoryData.value.nombre === null) {
            notificationData()
            empyData = true
        }
        if(accesoryData.value.precio === null) {
            notificationData()
            empyData = true
        }
        if(accesoryData.value.tipo_accesorioId === null) {
            notificationData()
            empyData = true
        }
        if(accesoryData.value.cantidad_total === null) {
            empyData = true
            notificationData()
        }
    
        return empyData

    }
    const notificationData = () =>{
        toast.error('Todos los campos son obligatorios',{
            position: toast.POSITION.TOP_CENTER
        })
        return 
    }
    const validateData = (dataObject)=>{
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

        actualizarMedicina,
        updateMedicinadata,
        tipoxd,
        cambiarEstadoMedicine,
        updateAccesorio,
        actualizarAccesorio,
        cambiarEstadoAccesory,

    }
})
