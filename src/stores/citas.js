import { defineStore } from "pinia";
import { ref, reactive,watch } from 'vue'
import {useRouter} from 'vue-router'
import {toast} from 'vue3-toastify'
import {useUltimasPaginas} from './ultimasPaginas'
import citasService from "../services/citasService";
import { useAuthStore } from "./auth";
import { usePaginacion } from "./paginacion";
import { usePermisosUser } from "./permisosUser";
import { useFormatear } from "./formatear";

export const useCita= defineStore('citas',  () =>{

    const Auth = useAuthStore()
    const Paginacion = usePaginacion()
    const router = useRouter()
    const Formato = useFormatear()


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
    const solicitudData = ref({})
    
    const citasFormat = ref(null)

    // const verCitas = () =>{
        
    //     citasService.obtenerCitas(Auth.token)
    //     .then(res=>{
    //         citas.value = res.data.CitaMedica
    //         // citasFormat.value = Formato.formatearCitasCalendar(res.data.CitaMedica)
    //         return citas.value            
    //     })
    //     .catch(err =>{
    //         Auth.verificarSesion(err.response.data.message)
            
    //     })
    // }
    const verCitas = () => {
        return new Promise((resolve, reject) => {
          citasService.obtenerCitas(Auth.token)
            .then(res => {
              citas.value = res.data.CitaMedica;
            //   citasFormat.value = Formato.formatearCitasCalendar(res.data.CitaMedica);
              resolve(res.data.CitaMedica); // Resuelve la promesa después de actualizar las citas
            })
            .catch(err => {
              reject(err); // Rechaza la promesa si hay un error
            });
        });
      };
    const verSolicitudes = ()=>{
        citasService.obtenerSolicitudes(Auth.token)
        .then(res=>{
            solicitudes.value = res.data.solicitudes
        }).catch(err => {
            console.log(err)
            Auth.verificarSesion(err.response.data.message)
        })
    }
    const aceptarSolicitudCita = () =>{
        if(!solicitudData.value.consultorio){
            toast.error('Define un lugar para la cita',{
                position: toast.POSITION.TOP_CENTER
            })
            return
        }
        solicitudData.value.empleadoId = Permisos.userLogin.id
        solicitudData.value.fecha_cita = solicitudData.value.fecha

        citasService.aprobarSolicitudes(Auth.token,solicitudData.value.id,solicitudData.value)
        .then(res =>{
            console.log(res)
            toast.success('Se creo la cita correctamente',{
                position: toast.POSITION.TOP_RIGHT
            })
            setTimeout(()=>{
                
                router.push({name:'citas'})
            },999)
        }).catch(err => {
            console.log(err)
            Auth.verificarSesion(err.response.data.message)
        })
    }

    const aprobarSolicitud = (solicitud)=>{

        console.log(solicitud)
        solicitudData.value = solicitud
        solicitudData.value.fecha = new Date(solicitudData.value.fecha).toISOString().slice(0, 19).replace('T', ' '),
        // Formato.formartoFechaInput(solicitudData.value.fecha)
        // citaData.value = solicitud
        // citaData.value.clienteId = solicitud.cliente
        // citaData.value.tipo_cita = solicitud.servicio


        router.push({name:'aceptar-citas'})

        // citasService.aprobarSolicitudes(Auth.token,id)
        // .then(res=>{

        //     toast.success('Solicitud Aprobada',{
        //         position: toast.POSITION.TOP_RIGHT
        //     })

        // }).catch(err => {
        //     console.log(err)
        //     Auth.verificarSesion(err.response.data.message)
        // })
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

    const cambiarFecha = (id,days)=>{
        console.log(days)
        citasService.cambiarFechaCita(Auth.token,id,days)
        .then(res =>{
            console.log(res)
        }).catch(err =>{
            console.log(err)
            Auth.verificarSesion(err.response.data.message)
        })
    }

    return {
        verCitas,
        citas,
        solicitudes,
        verSolicitudes,
        aprobarSolicitud,
        citaData,
        crearCita,
        solicitudData,
        aceptarSolicitudCita,
        citasFormat,
        cambiarFecha,
    }
})
