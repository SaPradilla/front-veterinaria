<script setup>
import { defineProps,onMounted,ref } from 'vue'

const props = defineProps(['id_cita', 'id_cliente', 'id_solicitud'])

import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';

import clienteService from '../../services/clienteService'
import { useAuthStore } from '../../stores/auth';
import { useFormatear } from '../../stores/formatear';
import { useConfirm } from "primevue/useconfirm";

import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const router = useRouter()
const confirm = useConfirm();
const solicitud = ref({})
const modalInput = ref(false)
const fecha_placeholder = ref(null)
const fecha = ref(null)

const Auth = useAuthStore()
const Formato = useFormatear()


onMounted(()=>{
    Auth.ObtenerToken()
    console.log(props.id_solicitud)
    if(props.id_solicitud){
        clienteService.obtenerSolicitudCliente(Auth.token,props.id_solicitud)
        .then(res=>{
            console.log(res)
            solicitud.value = res.data.solicitud
            fecha_placeholder.value =  new Date(res.data.solicitud.fecha).toISOString().slice(0, 19).replace('T', ' ')
        }).catch(err=>{
            Auth.verificarSesion(err.response.data)
            console.log(err)
        })

    }
})

const handleModal = ()=> modalInput.value = !modalInput.value

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

const aprobarCita = ()=>{
    const ids = {
        id_cita:props.id_cita,
        id_cliente:props.id_cliente,
        id_solicitud:props.id_solicitud,
    }

    clienteService.aprobarSolicitudAgendada(Auth.token,ids,fecha)
    .then(res =>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
}
const cancelarCita = ()=>{
    const ids = {
        id_cita:props.id_cita,
        id_cliente:props.id_cliente,
        id_solicitud:props.id_solicitud,
    }

    clienteService.cancelarSolicitudAgendada(Auth.token,ids)
    .then(res =>{
        console.log(res)
        toast.success(res.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            transition: toast.TRANSITIONS.BOUNCE,
            autoClose: 555,
        })
        setTimeout(()=>{
            router.push('/')
        },500)

    }).catch(err=>{
        console.log(err)
    })
} 

const confirm2 = () => {
    confirm.require({
        message: 'Si cambia la fecha la cita se tiene que re agendar',
        header: 'Cambiar fecha',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Cambiar',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {

            handleModal()
            
        },
        reject: () => {
            modalInput.value = false
        }
    });
};

const reject = () => {
    confirm.require({
        message: 'Esta seguro que desea cancelar la cita?',
        header: 'Rechazar Cita',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Rechazar',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {

            // cancelar la cita
            cancelarCita()
        },
        reject: () => {
            
        }
    });
};
</script>


<template>

    <ConfirmDialog></ConfirmDialog>
    <div class="container" v-if="solicitud">
        <div class="content">
            <h1>Aceptar Cita</h1>
            <div class="info">
                <h2>Información de la cita</h2>
                <p v-if="solicitud.servicio"><strong>Servicio:</strong> {{ solicitud.servicio.nombre }}</p>
                <p v-if="solicitud.mascota"><strong>Mascota:</strong> {{ solicitud.mascota.nombre }}</p>
                <p v-if="solicitud.fecha"><strong>Fecha:</strong> {{ Formato.formatearFecha(solicitud.fecha) }}</p>
                <p v-if="solicitud.fecha"><strong>Hora:</strong> {{ Formato.formatearHora(solicitud.fecha) }}</p>
                <small v-if="!modalInput" @click="confirm2">Cambiar Fecha</small>
                <small v-if="modalInput"  @click="handleModal"> Cancelar </small>
                <Calendar v-if="modalInput" showTime hourFormat="24" v-model="fecha" :placeholder="fecha_placeholder" :minDate="minDate"  :manualInput="false" showIcon   />
            </div>
            
            <div class="acciones">
                <Button label="Cancelar" outlined  @click="reject"/>
                <Button label="Aceptar" @click="aprobarCita" />
            </div>

        </div>
    </div>
</template>


<style scoped>
small{
    cursor: pointer;
}
h1 {
    text-align: center;
    color: var(--color-morado-oscuro-general);
    font-size: 2.5em;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100%;
    background: url('../../assets/img/perfil_background.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.content {
    display: flex;
    flex-direction: column;
    /* height: 100vh; */
    justify-content: center;
    gap: 3em;
    display: flex;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.036);
    background-color: white;
    padding: 20px;
    border-radius: 20px;
}
.info{
    display: flex;
    flex-direction: column;
    gap: 10px;

}
.acciones {
    display: flex;
    width: 100%;
    gap: 2em;
    justify-content: center;
    align-items: center;
}
</style>