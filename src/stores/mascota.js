import { defineStore } from "pinia";
import { ref, reactive, onMounted} from 'vue'
import {toast} from 'vue3-toastify'
import mascotaService from "../services/mascotaService";
import { useAuthStore } from "./auth";
import { usePaginacion } from "./paginacion";
import { useModals } from "./modals";
import { useRouter } from "vue-router";
import { useFormatear } from "./formatear";

export const useMascota = defineStore('mascota', () => {
    // Stores
    const Paginacion = usePaginacion()

    const Auth = useAuthStore()
    const Modals = useModals()
    const Router = useRouter()
    const Formato = useFormatear()
    // states
    const mascota = ref({
        clienteId: null,
        tipo_mascota: '',
        nombre: '',
        genero: null,
        edad: '',
        raza: '',
        vacunas:'',
    });
    const perfilMascota = ref({})

    const mascotas = ref([])

    const MascotaUpdate = ref({
        clienteId: null,
        tipo_mascota: '',
        nombre: '',
        genero: null,
        edad: '',
        raza: '',
        vacunas:'',
    })

    // Metodos



    const registrarMascota = () =>{
        mascota.value.vacunas = JSON.stringify(mascota.value.vacunas)
        mascotaService.registarMascota(mascota.value,Auth.token)
        .then( res =>{
            // console.log(res)
            // Mensaje 
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_CENTER
            })
            Object.assign(mascota.value,{
                clienteId: null,
                tipo_mascota: '',
                nombre: '',
                genero: null,
                edad: '',
                raza: '',
                vacunas:'',
            })
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data)
            console.log(err)
              // Mensaje 
              toast.error('Error al Registrar la Mascota',{
                position: toast.POSITION.TOP_CENTER
            })
        })
    }

    const obtenerMascotas = ()=>{
        return mascotaService.obtenerMascotas(Auth.token,Paginacion.currentPageMascota,Paginacion.size)
        .then(res=>{
            mascotas.value = res.data.Mascotas
            return true
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data.message)

            return false
        })
    }

    const cambiarEstadoMascota = (token,id) =>{
        const findMascota = mascotas.value.find(mascota => mascota.id === id)
        if(findMascota){
            findMascota.isActive = !findMascota.isActive
        }
        mascotaService.cambiarEstado(token,id)

        .then(res=>{

             // Mensaje 
             toast.success(res.data.msg,{
                position: toast.POSITION.TOP_RIGHT
            })
        })
        .catch(err=>{
            Auth.verificarSesion(err.response.data)
            console.log(err)
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_RIGHT
            })
        })
    }

    const redirigirEditarMascota = (mascota)=>{
        MascotaUpdate.value = mascota
        Router.push({name:'editar-mascota'})
    }

    const verPerfilMascota = (mascotaData)=>{

        perfilMascota.value = mascotaData

        Modals.toggleMascotaPerfil()

    }
    const editarMascota = ()=> {

        MascotaUpdate.value.vacunas = JSON.stringify(MascotaUpdate.value.vacunas)
        mascotaService.editarMascota(Auth.token,MascotaUpdate.value.id,MascotaUpdate.value)
        .then( res =>{
            // Mensaje 
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_CENTER
            })
            Object.assign(MascotaUpdate.value,{
                clienteId: null,
                tipo_mascota: '',
                nombre: '',
                genero: null,
                edad: '',
                raza: '',
                vacunas:'',
            })
            setTimeout(()=>{
                Router.push({name:'mascotas'})
            },1500)
        })
        .catch(err =>{
            Auth.verificarSesion(err.response.data)
            console.log(err)
              // Mensaje 
              toast.error('Error al editar la Mascota',{
                position: toast.POSITION.TOP_CENTER
            })
        })
    }
    return {
        mascota,
        mascotas,
        perfilMascota,
        MascotaUpdate,
        
        registrarMascota,
        obtenerMascotas,
        cambiarEstadoMascota,
        redirigirEditarMascota,
        verPerfilMascota,
        editarMascota,
        

    }
})
