<script setup>
import { onMounted, watch } from 'vue'
import { useAuthStore } from '../../stores/auth';
import { usePaginacion } from '../../stores/paginacion'
import { useAdmin } from '../../stores/admin'
import { useCita } from '../../stores/citas';
import { useFormatear } from '../../stores/formatear';

import SplitButton from 'primevue/splitbutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag'
import Button from 'primevue/button';
import {toast} from 'vue3-toastify'




const Paginacion = usePaginacion()
const Admin = useAdmin()
const Auth = useAuthStore()
const Citas = useCita()
const Formato = useFormatear()
onMounted(() => {
    Auth.ObtenerToken()
    

    Citas.verCitas()
    console.log(Citas.citas)
    Citas.verSolicitudes()
})
const handleClick = () => {
    if (Citas.citas.length < 4) {
        return
    }
    Paginacion.cambiarPaginaCita()
}
watch(() => Citas.solicitudes.isAprobada, (newTipo) => {
})
</script>

<template>
    <div class="contenedor-principal">
        <div class="contenedor-solicitudes">
            <h1>Solicitudes pendientes</h1>


            <table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="solicitud in Citas.solicitudes">
                        <td>{{ solicitud.servicio.nombre }}</td>
                        <td> {{ solicitud.cliente.nombre }} {{ solicitud.cliente.apellido }}</td>
                        <td>{{ Formato.formatearFecha(solicitud.fecha) }}</td>
                        <td>{{ solicitud.isAprobada ? 'Aprobada' : 'No Aprobada ' }}</td>
                        <td> 
                            <!-- Terminar AQUI -->
                            <div @click="Citas.aprobarSolicitud(solicitud.id)" class="aprobar"> Aprobar</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="contenedor-citas">
            <div class="contenido-citas">
                
                <div class="citas">
                    <h1>Citas</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Mascota</th>
                                <th>Lugar</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
        
                        <tbody>
        
                            <!-- <tr v-for="(cita, index) in Mascota.perfilMascota.citas_medicas.slice(0, 3)" :key="index"> -->
                            <tr v-for="cita in Citas.citas">
                                <td>{{ cita.servicio.nombre }}</td>
                                <td> {{ cita.mascota.nombre }}</td>
                                <td>{{ cita.consultorio }}</td>
                                <td>{{ cita.estado }}</td>
                                <td>{{ Formato.formatearFecha(cita.fecha_cita) }}</td>
                            </tr>
        
        
                        </tbody>
                    </table>
                </div>
                <div class="contenedor-boton">
                    <button
                        @click="Admin.handleRegistrarCita"
                        class="botonAgregar">Añadir Cita
                    </button>
                </div>
            </div>
        </div>
       
    </div>
</template>


<style scoped>
.aprobar{
    background-color: var(--color-verde-ok);
    padding: 10px;
    border-radius: 30px;
    color: white;
    cursor: pointer;
	transition: all 0.2s ease;

}
.aprobar:hover{
    transform: translateY(-1px);
}
.contenido-citas{
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20vh;
}
.contenido-citas h1{
    text-align: center;
    margin-bottom: 20px;
}
.botonAgregar {
	padding: 10px;
	border-style: none;
	background-color: #5a0fc3;
	color: white;
	border-radius: 25px;
	width: 10em;
	cursor: pointer;
	font-size: 1.3em;
	transition: all 0.2s ease;
}

.botonAgregar:hover {
	transform: scale(0.9);
	background-color: #6413d7;

}
.contenedor-principal{
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 10vh;
}
.contenedor-solicitudes{
    display: flex;
    flex-direction: column;
    gap: 3vh;
    align-items: center;
    text-align: center;
}
.contenedor-solicitudes h1{
    font-weight: 600;
}
.contenedor-citas {
    display: flex;
    flex-direction: column;
    gap: 3vh;
    align-items: center;
}

table {
    /* border-collapse: collapse; */
    overflow: hidden;
    /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); */
}

th {
    font-weight: 500;
    font-size: 1.3em;
    padding-left: 50px;
    color: var(--color-morado-claro-general);
}
.contenedor-solicitudes th{
    font-weight: 700;
    font-size: 1.6em;

}
td {
    margin: 0 auto;
    padding-left: 50px;
    padding-top: 1vh;
    background-color: rgba(255, 255, 255, 0.2);
    color: var(--color-gris);

}


</style>