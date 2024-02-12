import { defineStore } from "pinia";
import { ref, reactive, onMounted} from 'vue'
import {toast} from 'vue3-toastify'
import mascotaService from "../services/mascotaService";
import { useAuthStore } from "./auth";
import { usePaginacion } from "./paginacion";
import { useModals } from "./modals";
import { useRouter } from "vue-router";
import { useFormatear } from "./formatear";
import { usePermisosUser } from "./permisosUser";
import clienteService from "../services/clienteService";

export const useMascota = defineStore('mascota', () => {
    // Stores
    const Paginacion = usePaginacion()

    const Auth = useAuthStore()
    const Modals = useModals()
    const Router = useRouter()
    const Formato = useFormatear()
    const Permiso = usePermisosUser()
    const router = useRouter()
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
    const mascotaCliente = ref({
        genero:true
    })
    const opcionEdad = ref(' Años')
    // Metodos


    const extraerNombres = (arregloDeObjetos) =>{
        return arregloDeObjetos.map(objeto => objeto.name);
    }
    const registrarMascotaCliente = ()=>{
        // mascotaCliente.value.genero = mascotaCliente.value.genero ? 'Hembra' : 'Macho' 

        // console.log( mascotaCliente.value.raza)
        mascotaCliente.value.raza = mascotaCliente.value.raza.label

        mascotaCliente.value.tipo_mascota = mascotaCliente.value.tipo_mascota.label

        mascotaCliente.value.vacunas = extraerNombres(mascotaCliente.value.vacunas)
        mascotaCliente.value.vacunas = JSON.stringify(mascotaCliente.value.vacunas)

        mascotaCliente.value.clienteId = Permiso.userLogin.id

        const edad =  `${mascotaCliente.value.edad.toString()}${opcionEdad.value}`

        mascotaCliente.value.edad = edad

        console.log(mascotaCliente.value)
        
        clienteService.registrarMascotaCliente(Auth.token,mascotaCliente.value)
        .then( res =>{
            
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_CENTER
            })
            Object.assign(mascotaCliente.value,{})
            router.push({name:'info-perfil'})
        })
        .catch(err =>{
            console.log(err)
              toast.error('Error al Registrar la Mascota',{
                position: toast.POSITION.TOP_CENTER
            })
            Auth.verificarSesion(err.response.data)
        })
    }

    const registrarMascota = () =>{
        
        
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
            console.log(err)
              // Mensaje 
              toast.error('Error al Registrar la Mascota',{
                position: toast.POSITION.TOP_CENTER
            })
            Auth.verificarSesion(err.response.data)

        })
    }

    const obtenerMascotas = ()=>{
        mascotaService.obtenerMascotas(Auth.token)
        .then(res=>{
            mascotas.value = res.data.Mascotas
        })
        .catch(err =>{
            console.log(err)
            Auth.verificarSesion(err.response.data.message)
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
        mascotaCliente,
        opcionEdad,

        registrarMascota,
        obtenerMascotas,
        cambiarEstadoMascota,
        redirigirEditarMascota,
        verPerfilMascota,
        editarMascota,
        registrarMascotaCliente,

    }
})
