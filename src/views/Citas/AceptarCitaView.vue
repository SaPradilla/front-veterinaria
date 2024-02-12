<script setup>
import { ref, onMounted,computed,watch,onUpdated } from 'vue'
import servicioService from '../../services/servicioService';
import { useAuthStore } from '../../stores/auth';
import { usePermisosUser } from '../../stores/permisosUser';
import clienteService from '../../services/clienteService';
import solicitudService from '../../services/solicitudService';
import {toast} from 'vue3-toastify'
import { useCliente } from '../../stores/cliente';
import {useCita} from '../../stores/citas'

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
const Servicios = ref([])

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

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

let minYear = year;
let minMonth = month;

if (minMonth >= 12) {
    minMonth -= 12;
    minYear++;
}

const minDate = ref(new Date(minYear, minMonth, day));

</script>

<template>
    <div class="contenedor-cita">
        <div class="contenedor-registro">
            <h1>Aceptar Cita</h1> 
            <div class="formulario">
                <form>
                    <InputText type="text" v-model="Cita.solicitudData.cliente.nombre" placeholder="Cliente" disabled  />
                    <InputText type="text" v-model="Cita.solicitudData.servicio.nombre" placeholder="Nombre del consultorio" disabled  />
                    <InputText type="text" v-model="Cita.solicitudData.mascota.nombre" placeholder="Mascota" disabled  />

                    <!-- Cliente -->
                    <!-- <div class="menu-input">
                        <Dropdown v-model="Cita.solicitudData.cliente" :options="Cliente.clientes"   checkmark  optionLabel="nombre"    placeholder="Cliente" />
                        <small @click="">¿El cliente no se encuentra? <strong>Agregar</strong> </small>
                    </div> -->

                    <!-- <Dropdown v-model="Cita.solicitudData.tipo_cita" :options="Servicios"   checkmark  optionLabel="nombre" placeholder="Tipo de cita" /> -->


                    <Calendar showTime hourFormat="24" v-model="Cita.solicitudData.fecha" placeholder="Fecha" :minDate="minDate"  :manualInput="false" showIcon   />
                    
                    <InputText type="text" v-model="Cita.solicitudData.consultorio" placeholder="Nombre del consultorio" />
                    <Textarea v-model="Cita.solicitudData.descripcion" rows="3" cols="30" placeholder="Descripcion" />
                    <Button @click="Cita.aceptarSolicitudCita"  label="Agregar" />
                
                </form>
            </div>
        </div>


    </div>
</template>


<style scoped>
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
