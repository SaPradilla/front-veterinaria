import { defineStore } from "pinia";
import { ref, reactive,watch } from 'vue'
import {useRouter} from 'vue-router'
import {toast} from 'vue3-toastify'
import {useUltimasPaginas} from './ultimasPaginas'
import citasService from "../services/citasService";
import { useAuthStore } from "./auth";
import { usePaginacion } from "./paginacion";
import { usePermisosUser } from "./permisosUser";

export const useCita= defineStore('citas',  () =>{

    const Auth = useAuthStore()
    const Paginacion = usePaginacion()

    const citas = ref([])
    const solicitudes = ref([])
    const Permisos = usePermisosUser()
    const citaData = ref({

        clienteId:null,
        tipo_cita:'',
        mascotaId:null,
        empleadoId:null,
        fecha_cita:'',
        consultorio:'',
        // estado:estado,
        // descripcion:descripcion
    })
    const verCitas = () =>{
        
        return citasService.obtenerCitas(Auth.token,Paginacion.currentPageCita,Paginacion.totalPagesCita)
        .then(res=>{
            citas.value = res.data.CitaMedica
            return true
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data.message)
            return false
        })
    }

    const verSolicitudes = ()=>{
        citasService.obtenerSolicitudes(Auth.token)
        .then(res=>{
            solicitudes.value = res.data.solicitudes
        }).catch(err => {
            console.log(err)
            Auth.verificarSesion(err.response.data.message)
        })
    }

    const aprobarSolicitud = (id)=>{
        citasService.aprobarSolicitudes(Auth.token,id)
        .then(res=>{

            toast.success('Solicitud Aprobada',{
                position: toast.POSITION.TOP_RIGHT
            })

        }).catch(err => {
            console.log(err)
            Auth.verificarSesion(err.response.data.message)
        })
    }
    const crearCita = ()=>{
        citaData.value.empleadoId = Permisos.userLogin.id

        if(validateData(citaData.value)){
            toast.error('Todos los campos son obligatorios',{
                position: toast.POSITION.TOP_CENTER
            })
            return
        }
        citaData.value.clienteId = citaData.value.clienteId.id
        citaData.value.tipo_cita = citaData.value.tipo_cita.id
        citaData.value.mascotaId = citaData.value.mascotaId.id
        

        citasService.agregarCita(Auth.token,citaData.value)
        .then(res=>{
            console.log(res)
            toast.success('Se creo la cita correctamente',{
                position: toast.POSITION.TOP_RIGHT
            })
        }).catch(err => {
            console.log(err)
            Auth.verificarSesion(err.response.data.message)
        })

    }
    const validateData = (dataObject)=>{
        // si algun objecto tiene nulo o '' retorna true 
        return Object.values(dataObject).some(value => value === null || value === '');
    }
    return {
        verCitas,
        citas,
        solicitudes,
        verSolicitudes,
        aprobarSolicitud,
        citaData,
        crearCita,
    }
})
