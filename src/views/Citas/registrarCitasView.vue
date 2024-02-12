<script setup>
import { ref, onMounted,computed,watch } from 'vue'
import servicioService from '../../services/servicioService';
import { useAuthStore } from '../../stores/auth';
import { usePermisosUser } from '../../stores/permisosUser';
import clienteService from '../../services/clienteService';
import solicitudService from '../../services/solicitudService';
import {toast} from 'vue3-toastify'
import { useCliente } from '../../stores/cliente';
import {useCita} from '../../stores/citas'
import {useRouter} from 'vue-router'

import SplitButton from 'primevue/splitbutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag'
import Button from 'primevue/button';
// import {toast} from 'vue3-toastify'
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

const Auth = useAuthStore()
const Permisos = usePermisosUser()
const Cliente = useCliente()
const Cita = useCita()
const router = useRouter()
const Servicios = ref([])
const solicitud = ref({
    tipo_cita:'',
    fecha_cita:'',

})
const fechaHoy = new Date()


onMounted(() => {
    
    Auth.ObtenerToken()
    Auth.extraerUserToken()
    Cliente.verClientes()

    servicioService.obtenerServicios(Auth.token)
        .then(res => {
            Servicios.value = res.data.Servicios
        })
        .catch(err => console.log(err))

})
watch(() => Cita.citaData.clienteId, (newId) => {
    if(newId.id){
        console.log(newId.id)
        Cliente.verMascotasCliente(newId.id)
        return
    }
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

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

let minYear = year;
let minMonth = month + 2;

if (minMonth >= 12) {
    minMonth -= 12;
    minYear++;
}

const minDate = ref(new Date(minYear, minMonth, day));


</script>

<template>
     <div class="con">
        <div></div>
        <button @click="router.push({name:'citas'})" class="botonVolver"> Volver </button>
    </div>
    <div class="contenedor-cita">
        <div class="contenedor-registro">
            <h1>Crear Cita</h1> 
            <div class="formulario">
                <form>
                    <!-- Cliente -->
                    <div class="menu-input">

                        <Dropdown v-model="Cita.citaData.clienteId" :options="Cliente.clientes"   checkmark  optionLabel="nombre"    placeholder="Cliente" />
                        <small @click="">¿El cliente no se encuentra? <strong>Agregar</strong> </small>
                    
                    </div>
                    <Dropdown v-model="Cita.citaData.tipo_cita" :options="Servicios"   checkmark  optionLabel="nombre" placeholder="Tipo de cita" />
                    <div class="menu-input">
                        <Dropdown v-model="Cita.citaData.mascotaId" :options="Cliente.mascotasCliente"   checkmark  optionLabel="nombre" placeholder="Mascota" />
                        <small @click="">¿El cliente no tiene mascotas? <strong>Agregar</strong> </small>

                    </div>

                    <Calendar v-model="Cita.citaData.fecha_cita" placeholder="Fecha" :minDate="minDate"  :manualInput="false" showIcon   />
                    <InputText type="text" v-model="Cita.citaData.consultorio" placeholder="Nombre del consultorio" />
                    <Textarea v-model="Cita.citaData.descripcion" rows="3" cols="30" placeholder="Descripcion" />
                    <Button @click="Cita.crearCita"  label="Agregar" />
                    


                </form>
            </div>
        </div>


    </div>
</template>


<style scoped>
.con{
        position: absolute;
        top: 25vh;
        right: 0;
        
    }
h1{
    text-align: center;
    
    color: var(--color-morado-claro-general);
}
.menu-input{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
strong{
    cursor: pointer;
}
.contenedor-cita{
    width: 100%;

}
.contenedor-registro{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 40px;
}
.formulario{
    width: 40%;

}
.formulario form{
    display: flex;
    flex-direction: column;
    gap: 40px;
}


</style>
