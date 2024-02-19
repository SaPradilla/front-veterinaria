<script setup>
import { onMounted, watch } from 'vue'
import { useMascota } from '../../stores/mascota';
import { useModals } from '../../stores/modals';
import { useFormatear } from '../../stores/formatear';
import {toast} from 'vue3-toastify'

import SplitButton from 'primevue/splitbutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag'
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import { useRouter } from 'vue-router';


const Modals = useModals()
const Mascota = useMascota()
const Formato = useFormatear()
const router = useRouter()


onMounted(() => {   
   

    if(Object.keys(Mascota.perfilMascota).length === 0) {
        toast.warn('Sin valores',{
            position: toast.POSITION.TOP_CENTER
        })
        router.push({name:'mascotas'})

    }else{

        if (!Array.isArray(Mascota.perfilMascota.vacunas)) {
            Mascota.perfilMascota.vacunas = JSON.parse(Mascota.perfilMascota.vacunas)
        }
    }

})
watch(() => Mascota.perfilMascota.vacunas, (newTipo) => {
    if (!Array.isArray(Mascota.perfilMascota.vacunas)) {
        Mascota.perfilMascota.vacunas = JSON.parse(Mascota.perfilMascota.vacunas)
    }
})
const getSeverity = (estado) => {

    if (estado === 'Programada') return 'info'
    if (estado === 'En proceso') return 'secondary'
    if (estado === 'Completada') return 'success'
    if (estado === 'Cancelada') return 'danger'
    if (estado === 'Reprogramada') return 'warning'
}
</script>

<template>
    
    <div class="contenedor-mascota">
        
        <div class="header-mascota">
            <div class="info-mascota">

                <h2>{{ Mascota.perfilMascota.nombre }}</h2>
                <img class="foto-mascota" src="../../assets/img/wally.jpeg" alt="">
                <p>{{ Mascota.perfilMascota.tipo_mascota }} | {{ Mascota.perfilMascota.edad }} Años</p>
                <p class="id">ID: {{ Mascota.perfilMascota.id }}</p>
            </div>
            <Button label="Volver" rounded  @click="router.push({name:'mascotas'})"/>
        </div>

        <div class="info">

            <div class="citas">
                <div class="titulo-cita">
                    <h1>Citas</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1025 1024">
                        <path fill="currentColor"
                            d="M800.712 1024q-93 0-158.5-65.5t-65.5-158.5t65.5-158.5t158.5-65.5t158.5 65.5t65.5 158.5t-65.5 158.5t-158.5 65.5zm128-256h-96v-96q0-13-9.5-22.5t-22.5-9.5t-22.5 9.5t-9.5 22.5v128q0 12 7.5 20.5t18.5 10.5q2 1 6 1h128q13 0 22.5-9.5t9.5-22.5t-9.5-22.5t-22.5-9.5zm-448 64h-192q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h192q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5zm-192-192h192q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5h-192q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5zm320-64h-320q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h320q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5zm128-128h-448q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h448q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5zm0-256h-448q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h448q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5zm0 128h-448q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h448q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5zm96-224q0-13-9.5-22.5t-22.5-9.5h-640q-13 0-22.5 9.5t-9.5 22.5v32q27 0 45.5 18.5t18.5 45.5t-18.5 45.5t-45.5 18.5v64q27 0 45.5 18.5t18.5 45.5t-18.5 45.5t-45.5 18.5v64q27 0 45.5 18.5t18.5 45t-18.5 45.5t-45.5 19v64q27 0 45.5 18.5t18.5 45t-18.5 45.5t-45.5 19v32q0 13 9.5 22.5t22.5 9.5h416v64h-448q-26 0-45-19t-19-45v-64q-26 0-45-19t-19-45.5t19-45t45-18.5v-64q-26 0-45-19t-19-45.5t19-45t45-18.5v-64q-26 0-45-18.5t-19-45.5t19-45.5t45-18.5v-64q-26 0-45-18.5t-19-45.5t19-45.5t45-18.5V64q0-27 19-45.5t45-18.5h704q26 0 45 18.5t19 45.5v448h-64V96z" />
                    </svg>

                </div>  
                <div class="contenedor-citas">
                    <p class="sin-datos" v-if=" Mascota.perfilMascota.citas_medicas && Mascota.perfilMascota.citas_medicas.length === 0"> La mascota no tiene citas</p>
                    <DataTable
                        v-else
                        :value="Mascota.perfilMascota.citas_medicas" 
                        tableStyle="min-width: 50rem" 
                        paginator 
                        :rows="5" 
                        stripedRows
                        :rowsPerPageOptions="[5, 10, 20, 50]"
                    >

                        <Column field="servicio.nombre" header="Tipo"></Column>
                        <Column field="consultorio" header="Lugar"></Column>
                        <Column header="Empleado">
                            <template #body="slotProps">    
                                <td>{{ slotProps.data.empleado.nombre }} {{ slotProps.data.empleado.apellido }}</td>
                                <!-- <img class="cliente" @click="Cliente.verClienteAdmin(slotProps.data.cliente.id, Auth.token)"
                                    src="../../assets/img/Cliente.svg" alt=""> -->
                            </template>
                        </Column>

                        <Column header="Fecha">
                            <template #body="slotProps">
                                {{ Formato.formatearFecha(slotProps.data.fecha_cita) }}
                            </template>
                        </Column>

                        <Column header="Estado">    
                                <template #body="slotProps">
                                    <Tag class="tag-estado" :value="slotProps.data.estado"
                                        :severity="getSeverity(slotProps.data.estado)" />
                                </template>
                            </Column>

                    </DataTable>
                    
                </div>
                
            </div>

        </div>

        <div class="historia-clinica">
            <div class="titulo-historia">
                <h1>Historia Clinica</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="M1.5 2a1 1 0 0 0-1 1v9.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-2M3.5.5v3m7-3v3M3.5 2h5" />
                        <path
                            d="M6.188 4.562a.5.5 0 0 0-.5.5v1.406H4.28a.5.5 0 0 0-.5.5v1.625a.5.5 0 0 0 .5.5h1.407v1.406a.5.5 0 0 0 .5.5h1.625a.5.5 0 0 0 .5-.5V9.093h1.406a.5.5 0 0 0 .5-.5V6.968a.5.5 0 0 0-.5-.5H8.313V5.062a.5.5 0 0 0-.5-.5H6.188Z" />
                    </g>
                </svg>
            </div>

            <div class="info-historia" v-if="Mascota.perfilMascota.historias_clinica">
                <div class="contenido">

                    <TabView>
                        <TabPanel>
                            <template #header>
                                <div>
                                    <!-- <Avatar image="/images/avatar/amyelsner.png" shape="circle" /> -->
                                    <span>Patologias</span>
                                </div>
                            </template>

                            <div class="patologias">
                                <div class="patologia1">
                                    <h3>Vigentes</h3>
                                    <p>{{ Mascota.perfilMascota.historias_clinica.patologias_vigentes }}</p>
                                </div>
                                <div class="patologia1">
                                    <h3>Superadas</h3>
                                    <p>{{ Mascota.perfilMascota.historias_clinica.patologias_superadas }}</p>
                                </div>
    
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <template #header>
                                <div>
                                    <!-- <Avatar image="/images/avatar/onyamalimba.png" shape="circle" /> -->
                                    <span >Lesiones</span>
                                </div>
                            </template>

                            <p>{{ Mascota.perfilMascota.historias_clinica.lesiones }}</p>
                        </TabPanel>
                        <TabPanel>
                            <template #header>
                                <div>
                                    <!-- <Avatar image="/images/avatar/ionibowcher.png" shape="circle" /> -->
                                    <span >Comportamiento</span>
                                    <Badge value="2" />
                                </div>
                            </template>
                            <p>{{ Mascota.perfilMascota.historias_clinica.historial_comportamiento }}</p>
                        </TabPanel>
                        <TabPanel>
                            <template #header>
                                <div>
                                    <!-- <Avatar image="/images/avatar/ionibowcher.png" shape="circle" /> -->
                                    <span>Estado nutricional</span>
                                    <Badge value="2" />
                                </div>
                            </template>
                            <p>{{ Mascota.perfilMascota.historias_clinica.estado_nutricional }}</p>
                        </TabPanel>
                    </TabView>

                </div>

            </div>

            <div class="nueva-historia" v-else>

                <p class="sin-datos"> La mascota Aún no tiene Historia Clinica </p>
                <button @click="dashboard.handleVolver()" class="botonVolver"> Crear Historia </button>

            </div>
        </div>

        <div class="ultimo-contenedor">
            <div class="cirugias">
                <div class="titulo-cirugias">
                    <h1>Cirugias Recientes</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="m11 21l2-2h8q.425 0 .713.288T22 20q0 .425-.288.713T21 21H11Zm1.4-5.65L8.65 11.6l8.3-8.3q.3-.3.713-.3t.712.3L20.7 5.625q.3.3.3.713t-.3.712l-8.3 8.3Zm0-2.85l6.2-6.175l-.925-.925l-6.175 6.2l.9.9ZM5.075 21q-1.15 0-2.212-.45T1 19.3l6.625-6.6l2.6 2.6q.35.35.55.8t.2.95q0 .5-.2.962t-.55.813l-.475.475q-.8.8-1.862 1.25T5.675 21h-.6Zm0-2h.6q.75 0 1.45-.288T8.35 17.9l.475-.475q.15-.15.15-.35t-.15-.35l-1.2-1.2l-3.4 3.375q.2.05.425.075t.425.025ZM18.6 6.325l-.925-.925l.925.925Zm-10.975 9.2Z" />
                    </svg>
                </div>
                <div class="contenedor-cirugias">
                    <div v-if="Mascota.perfilMascota.cirugia &&  Mascota.perfilMascota.cirugia.length > 0" class="ciru">
                        <table>
                            <thead>
                                <tr>
                                    <th>Procedimiento</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(cirugia, index) in Mascota.perfilMascota.cirugia.slice(0, 3)" :key="index">
                                    <td>{{ cirugia.procedimiento }}</td>
                                    <td> {{ Formato.formatearFecha(cirugia.createdAt) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="nueva-historia" v-else>
                        <p class="sin-datos"> La Mascota Aún No tiene Cirugias </p>
                        <button @click="dashboard.handleVolver()" class="botonVolver"> Crear Cirugia </button>

                    </div>

                </div>

            </div>

            <div class="vacunas">
                <div class="titulo-vacunas">
                    <h1>Vacunas</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <path fill="currentColor"
                            d="m240.49 63.51l-48-48a12 12 0 0 0-17 17L191 48l-23 23l-31.51-31.49a12 12 0 1 0-17 17L123 60l-81.14 81.17A19.86 19.86 0 0 0 36 155.31V203l-20.49 20.51a12 12 0 0 0 17 17L53 220h47.72a19.86 19.86 0 0 0 14.14-5.86L196 133l3.51 3.52a12 12 0 0 0 17-17L185 88l23-23l15.51 15.52a12 12 0 1 0 17-17ZM99 196H60v-39l14-14l17.51 17.52a12 12 0 0 0 17-17L91 126l11-11l17.51 17.52a12 12 0 0 0 17-17L119 98l21-21l39 39Z" />
                    </svg>  
                </div>
                <ul  v-if=" Mascota.perfilMascota.vacunas &&  Mascota.perfilMascota.vacunas.length > 0 ">
                    <li  v-for="vacuna in Mascota.perfilMascota.vacunas">
                        {{ vacuna }}
                    </li>
                </ul>
                <p class="sin-datos" v-else> No hay vacunas </p>
            </div>
        </div>
    </div>
</template>


<style scoped>


.contenedor-mascota {
    /* width: 140vh; */
    /* height: 85vh; */
    display: flex;
    align-items: left;
    flex-direction: column;
    /* justify-content: ; */
    gap: 5vh;
}

h2 {
    text-align: center;
    color: var(--color-morado-claro-general);
}

p {
    text-align: center;
    font-weight: 700;
    font-size: 1em;
    text-overflow: ellipsis;
    overflow: hidden;
}


.info {
    display: flex;
    /* flex-direction: column; */
    /* align-items: center; */
    /* justify-content: center; */
    gap: 4vh;
    word-wrap: break-word;
}

.info div {
    word-wrap: break-word;
}




/* Perfil */

.info-mascota {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
}

.info-mascota h2 {
    font-size: 2em;
    color: var(--color-morado-general);
    font-weight: 800;
}

.info-mascota p {
    color: var(--color-morado-claro-general);
    font-weight: 700;
}

.info-mascota p.id {
    color: var(--color-gris);

}

.foto-mascota {
    width: 80px;
    height: 80px;
    border-radius: 100%;
}

.header-mascota {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* position: fixed; */
}

/* Citas */

.citas {
    display: flex;
    flex-direction: column;
    gap: 40px;

}

.titulo-cita {
    display: flex;
    align-items: center;
    gap: 2vh;
}

.titulo-cita svg {

    width: 1.8em;
    transition: all 0.3s ease-in;
}

.titulo-cita path {

    fill: var(--color-morado-general);
}

.titulo-cita svg:hover {
    transform: translateY(-1px);
}

.contenedor-citas {
    width: 100%;
    text-align: center;
}
.contenedor-citas p {

    text-align: center;
    /* margin: 0 auto; */
    margin-top: 3vh;
    font-size: 1.5em;
}

.citas-paginacion {
    width: 20vh;
    margin: 0 auto;
    /* margin-top: 10px; */
    border: none;
    background-color: var(--color-morado-claro-general);
    color: white;
    border-radius: 5px;
    padding: 8px;
    cursor: pointer;
}


/* Historia */
.titulo-historia {
    display: flex;
    align-items: center;
    gap: 3vh;
}

.titulo-historia svg {
    width: 1.7em;
}

.titulo-historia svg {
    border-color: var(--color-morado-general);
    /* fill: var(--color-morado-general); */
    stroke: var(--color-morado-general);
}

.historia-clinica {
    margin-top: 4vh;
}


.nueva-historia {
    margin-top: 4vh;
    display: flex;
    flex-direction: column;
    gap: 5vh;

}

p.sin-datos {
    text-align: left;
    font-style: italic;
    font-weight: 600;
    color: var(--color-gris);
    font-size: 1em;
}

.historia {
    margin-top: 20px;
    margin-bottom: 20px;
}

.contenido h2 {
    font-weight: 600;
    font-style: normal;
    font-size: 1.4em;

}

.contenido h3 {
    color: var(--color-gris-oscuro);
    font-weight: 600;
    font-style: normal;
    font-size: 1.2em;

}

.contenido p {
    font-weight: 400;
}

.contenido {
   text-align: left;
}
.info-historia {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
   text-align: left;

    /* align-items: flex-start; */
}

.patologias-contenedor {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.patologias {

    display: flex;
    flex-direction: column;
    gap: 4vh;
}

.patologias p {
    text-align: left;
    margin-top: 1px;
}

/* Cirugias */
.titulo-cirugias {
    display: flex;
    align-items: center;
    gap: 3vh;
}

.titulo-cirugias svg {
    width: 2em;
}

.titulo-cirugias path {
    fill: var(--color-morado-general);
}

.cirugias {
    margin-top: 4vh;
    display: flex;
    flex-direction: column;
}

.contenedor-cirugias {
    margin-top: 20px;
}

.ultimo-contenedor {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 20px;
}

/* Vacunas */
.titulo-vacunas {
    display: flex;
    align-items: center;
    gap: 3vh;
    justify-content: center;
}

.titulo-vacunas svg {
    width: 2em;
}

.titulo-vacunas path {
    fill: var(--color-morado-general);
}

.vacunas {
    text-align: left;
    margin-top: 4vh;
    width: 20em;
}

.vacunas ul {
    margin-top: 1vh;
}

.vacunas li {
    /* list-style: none; */
    padding: 2px;
}
</style>