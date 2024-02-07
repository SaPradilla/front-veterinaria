
<script setup>
import { ref, onMounted } from 'vue'
import servicioService from '../../services/servicioService';
import { useAuthStore } from '../../stores/auth';
import { usePermisosUser } from '../../stores/permisosUser';
import clienteService from '../../services/clienteService';
import solicitudService from '../../services/solicitudService';
import {toast} from 'vue3-toastify'
import { useRouter } from 'vue-router';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import { useCliente } from '../../stores/cliente';



const Auth = useAuthStore()
const Permisos = usePermisosUser()
const Servicios = ref([])
const Router = useRouter()
const Cliente = useCliente()
const solicitud = ref({
    tipo_cita:'',
    fecha_cita:'',
})

const fechaHoy = new Date()


onMounted(() => {
    
    Auth.ObtenerToken()
    Auth.extraerUserToken()
    Cliente.verMascotasCliente(Permisos.userLogin.id)

    servicioService.obtenerServicios(Auth.token)
        .then(res => {
            Servicios.value = res.data.Servicios
        })
        .catch(err => {
            Auth.verificarSesion(err.response.data)
            // console.log(err.response.data)
            console.log(err)
        })

})
const redirigirHome = () =>{

    Router.push({name:'home'})
}
const agendarCita = ()=>{

    solicitud.value.clienteId = Permisos.userLogin.id


    // solicitudService.registrarSolicitud(Auth.token,solicitud.value)
    // .then(res =>{
    //     console.log(res)
    //     toast.success('Solicitud Registrada',{
    //         position: toast.POSITION.TOP_CENTER
    //     })
    //     setTimeout(()=>{
    //         Router.push({name:'solicitud-realizada'})
    //     },1200)
    // }).catch(err => {
    //     Auth.verificarSesion(err.response.data)
    //     console.log(err)
    //     toast.error('Error al registrar la Solicitud',{
    //         position: toast.POSITION.TOP_CENTER
    //     })
    // })
}


const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate() + 1;

let minYear = year;
let minMonth = month + 2;

if (minMonth >= 12) {
    minMonth -= 12;
    minYear++;
}

const minDate = ref(new Date(minYear, minMonth, day));

</script>

<template>
    <div class="contenedor-cita">
        <div class="formulario">
            <div class="fondo"></div>
            <div class="contenedor-formulario">
           
                    <div class="contenido">

                        <div class="titulo">
                            <h2>Agendar Cita</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path  d="M12 14.154q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.539q-.23.23-.54.23Zm-4 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.539q-.23.23-.54.23Zm8 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.539q-.23.23-.54.23ZM12 18q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.54Q12.31 18 12 18Zm-4 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.54Q8.31 18 8 18Zm8 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.54Q16.31 18 16 18ZM5.615 21q-.69 0-1.152-.462Q4 20.075 4 19.385V6.615q0-.69.463-1.152Q4.925 5 5.615 5h1.77V2.77h1.077V5h7.153V2.77h1V5h1.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463H5.615Zm0-1h12.77q.23 0 .423-.192q.192-.193.192-.423v-8.77H5v8.77q0 .23.192.423q.193.192.423.192Z"/></svg>
                        </div>
                        <Dropdown v-model="solicitud.tipo_cita" :options="Servicios" checkmark  optionLabel="nombre"  placeholder="Servicio" />
                        <Calendar showTime hourFormat="12" v-model="solicitud.fecha_cita" placeholder="Fecha" :minDate="minDate"  :manualInput="false" />
                        <div class="menu-input">
                            <Dropdown v-model="solicitud.mascotaId" :options="Cliente.mascotasCliente"   checkmark  optionLabel="nombre" placeholder="Mascota" />
                            <small @click="">¿Aún no tienes mascotas registradas? <strong>Agregar</strong> </small>

                        </div>
                        <!-- <div class="opciones">
                            <v-select placeholder="Servicio" name="servicio" v-model="" :options="" :reduce="servicio => servicio.id" label="nombre">
            
                            </v-select>
            
                        </div>
                        <FormKit
                            type="datetime-local"
                            placeholder="Fecha"
                            v-model=""
                            :validation="`required|date_after:${fechaHoy}`"
                            validation-visibility="live"
                            :validation-messages="{
                                required:'Fecha es requerida',
                                date_after:'Solo se permite fechas proximas a la actual'
                            }"
                        /> -->
                        <div class="botones">
                            <Button @click="agendarCita"  label="Agendar" />

                            <!-- <FormKit style="width: 240px;" type="submit" label="Agendar"/> -->
                            <small @click="redirigirHome">Cancelar</small>

                        </div>
                    </div>
                    
                    
             
            </div>
        </div>
    </div>
</template>


<style scoped>

.menu-input{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
strong{
    cursor: pointer;
}
.botones{
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}
p{
    cursor: pointer;
    text-align: center;
    font-weight: 700;
}

h2 {
    color: var(--color-morado-general);
    font-size: clamp(1em,5vw,2em);

}

.contenedor-cita {
    position: relative;
}

.fondo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('../../assets/img/fondo-cita.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(10px);
    z-index: -1;
}

.formulario {
    z-index: 10001;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6vh;
}
.contenedor-formulario{
    /* background-color: var(--color-morado-general); */
    background-color: white;
    /* border: 10px;
    border-style: solid;
    border-color: var(--color-morado-claro-general); */
    height: max-content;
    padding: 30px;
	box-shadow: 0px 15px 15px -3px rgba(0,0,0,0.3);
    border-radius: 20px;
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.contenido{
    justify-content: center;
    /* align-items: center; */
    display: flex;
    flex-direction: column;
    gap: 4vh;
    width: 100%;

}
.titulo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
.titulo svg{
    width: 3em;
}
.titulo path{
    fill: var(--color-morado-general);
}
.opciones{
    width: 31vh;
    display: flex;
    flex-direction: column;
    gap: 5vh;
}


</style>