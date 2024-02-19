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
        genero:true,
        raza:'',
        tipo_mascota:'',
        vacunas:'',
        edad: '',
        nombre: '',
        clienteId: '',

    })
    const opcionEdad = ref(' Años')
    const errorData = ref(false)
    
    // Metodos
    const extraerNombres = (arregloDeObjetos) =>{
        return arregloDeObjetos.map(objeto => objeto.name);
    }

    const validarDatosMascotaCliente = ()=>{

        if(mascotaCliente.value.raza === '') { 
            console.log('raza') 
            return true 
        
        }
        if(mascotaCliente.value.tipo_mascota === '') { 
            console.log('tipo') 
            return true 
        
        }
        if(mascotaCliente.value.vacunas === '') { 
            console.log('vauna') 
            return true 
        
        }
        if(mascotaCliente.value.edad === '') { 
            console.log('edad') 
            return true 
        
        }
        if(mascotaCliente.value.nombre === '') { 
            console.log('nombre') 
            return true 
        
        }
        return false

    }
    const registrarMascotaCliente = ()=>{
        
        if(validarDatosMascotaCliente()){
            errorData.value = true
            setTimeout(()=>{
                errorData.value = false
            },1000)
            return 
        }
        mascotaCliente.value.genero = mascotaCliente.value.genero ? 'Hembra' : 'Macho' 

        console.log( mascotaCliente.value.raza)
        mascotaCliente.value.raza = mascotaCliente.value.raza.label

        mascotaCliente.value.tipo_mascota = mascotaCliente.value.tipo_mascota.label


        mascotaCliente.value.vacunas = extraerNombres(mascotaCliente.value.vacunas)

        mascotaCliente.value.clienteId = Permiso.userLogin.id

        const edad =  `${mascotaCliente.value.edad.toString()}${opcionEdad.value}`

        mascotaCliente.value.edad = edad

        console.log(mascotaCliente.value)
        
        clienteService.registrarMascotaCliente(Auth.token,mascotaCliente.value)
        .then( res =>{

            Object.assign(mascotaCliente.value,{
                genero:true,
                raza:'',
                tipo_mascota:'',
                vacunas:'',
                edad: '',
                nombre: '',
                clienteId: '',
            })
            
            toast.success(res.data.msg,{
                position: toast.POSITION.TOP_CENTER
            })
            
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

        router.push({name:'mascota'})

    }

    const editarMascotaCliente =  ()=>{

        MascotaUpdate.value.raza = MascotaUpdate.value.raza.label  || MascotaUpdate.value.raza
        MascotaUpdate.value.tipo_mascota = MascotaUpdate.value.tipo_mascota.label || MascotaUpdate.value.tipo_mascota;

        MascotaUpdate.value.edad =  `${MascotaUpdate.value.edad.toString()}${opcionEdad.value}`
        MascotaUpdate.value.vacunas = extraerNombres(MascotaUpdate.value.vacunas)

        console.log(MascotaUpdate.value)
        // mascotaService.editarMascota()
        clienteService.editarMascotaCliente(Auth.token,MascotaUpdate.value.id,MascotaUpdate.value)
        .then(res =>{
            console.log(res)
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
                Router.push({name:'info-perfil'})
            },555)
        }).catch(err => {
            Auth.verificarSesion(err.response.data)
            console.log(err)
        })
    }

    const editarMascota = ()=> {

        // MascotaUpdate.value.vacunas = JSON.stringify(MascotaUpdate.value.vacunas)
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
        errorData,

        registrarMascota,
        obtenerMascotas,
        cambiarEstadoMascota,
        redirigirEditarMascota,
        verPerfilMascota,
        editarMascota,
        registrarMascotaCliente,
        editarMascotaCliente,
    }
})
