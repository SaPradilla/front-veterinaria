<script setup>
import { ref, onMounted } from 'vue'
import servicioService from '../../services/servicioService';
import { useAuthStore } from '../../stores/auth';
import { usePermisosUser } from '../../stores/permisosUser';
import clienteService from '../../services/clienteService';
import solicitudService from '../../services/solicitudService';
import {toast} from 'vue3-toastify'
const Auth = useAuthStore()
const Permisos = usePermisosUser()
const Servicios = ref([])

const solicitud = ref({
    tipo_cita:'',
    fecha_cita:'',

})
const fechaHoy = new Date()


onMounted(() => {
    
    Auth.ObtenerToken()
    Auth.extraerToken()

    servicioService.obtenerServicios(Auth.token)
        .then(res => {
            Servicios.value = res.data.Servicios
        })
        .catch(err => console.log(err))

})

const agendarCita = ()=>{
    solicitud.value.clienteId = Permisos.userLogin.id
    console.log(solicitud.value)
    solicitudService.registrarSolicitud(Auth.token,solicitud.value)
    .then(res =>{
        console.log(res)
        toast.success('Solicitud Registraeda',{
            position: toast.POSITION.TOP_CENTER
        })
    }).catch(err => {
        console.log(err)
        toast.error('Error al registrar la Solicitud',{
            position: toast.POSITION.TOP_CENTER
        })
    })
}


</script>

<template>
    <div class="contenedor-cita">
        cita
    </div>
</template>


<style scoped>




</style>
