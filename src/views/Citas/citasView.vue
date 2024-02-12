<script setup>
import { onMounted, watch, ref, computed } from 'vue'
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
import Divider from 'primevue/divider';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

import { toast } from 'vue3-toastify'
import { useCliente } from '../../stores/cliente';


import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import TimeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import citasService from "../../services/citasService";

const Paginacion = usePaginacion()
const Admin = useAdmin()
const Auth = useAuthStore()
const Citas = useCita()
const Formato = useFormatear()
const Cliente = useCliente()

const selectOpcion = ref(false)
const selecteCita = ref(null)
const calendarEvents = ref([])
const citasData = ref([])

onMounted(async () => {
    Auth.ObtenerToken()
    Citas.verCitas()
    Citas.verSolicitudes()

    try {
        const res = await citasService.obtenerCitas(Auth.token)

        citasData.value = res.data.CitaMedica;
        calendarEvents.value = res.data.CalendarData

        console.log(citasData.value)
        console.log(res.data.CalendarData)
        console.log(calendarEvents.value)
        calendarOptions.events = res.data.CalendarData
    } catch (error) {
        console.error('Error al cargar citas:', error);
    }
})

const handleSelectOption = () => selectOpcion.value = !selectOpcion.value

const getSeverity = (estado) => {

    // 'Programada', 'En proceso', 'Completada', 'Cancelada', 'Reprogramada'    
    if (estado === 'Programada') return 'info'
    if (estado === 'En proceso') return 'secondary'
    if (estado === 'Completada') return 'success'
    if (estado === 'Cancelada') return 'danger'
    if (estado === 'Reprogramada') return 'warning'
}

const items = [
    {
        label: 'Nueva cita',
        command: () => Admin.handleRegistrarCita()
    }, {
        label: 'Editar',
        command: () => handleSelectOption()
    }
]

const handleEventClick = (clickInfo) => {
    console.log('Evento clickeado:', clickInfo);
};
const handleDateSelect = (selectInfo) => {
    console.log('Fechas seleccionadas:', selectInfo);
    // Aquí puedes agregar lógica para manejar la selección de fechas
};

const handleEventDrop = (dropInfo) => {
    console.log('Evento arrastrado:', dropInfo);
    const daysNumber = dropInfo.delta.days
    const id = dropInfo.event._def.extendedProps[0].value
    Citas.cambiarFecha(id, { days: daysNumber })
};

const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, TimeGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    dateClick: handleEventClick,
    locales: [esLocale],
    selectable: true, // Habilita la selección de eventos
    editable: true, // Habilita la edición de eventos (arrastrar y soltar)
    select: handleDateSelect,
    eventDrop: handleEventDrop,
    // eventTextColor:'white',
    headerToolbar: {
        left: 'title',
        center: 'dayGridMonth,timeGridWeek,timeGridDay',
        right: 'prev today next'
    },

};

</script>

<template>
    <div class="contenedor-principal">
        <!-- <h1>Citas</h1> -->



        <div class="contenedor-solicitudes">
            <h2>Solicitudes pendientes</h2>
            <DataTable :value="Citas.solicitudes" tableStyle="min-width: 50rem" paginator :rows="5" stripedRows
                :rowsPerPageOptions="[5, 10, 20, 50]">

                <Column field="servicio.nombre" header="Tipo"></Column>
                <Column header="Cliente">
                    <template #body="slotProps">
                        <img class="cliente" @click="Cliente.verCliente(slotProps.data.cliente.id, Auth.token)"
                            src="../../assets/img/Cliente.svg" alt="">
                    </template>
                </Column>

                <Column header="Fecha">
                    <template #body="slotProps">
                        {{ Formato.formatearFecha(slotProps.data.fecha) }}
                    </template>
                </Column>

                <Column header="Estado">
                    <template #body="slotProps">
                        <Tag class="tag-estado" @click="Citas.aprobarSolicitud(slotProps.data)"
                            :value="slotProps.data.isAprobada ? 'Aprobada' : 'Aprobar'"
                            :severity="slotProps.data.isAprobada ? 'warning' : 'success'" />
                    </template>
                </Column>

            </DataTable>


        </div>


        <Divider />
        <h1>Citas</h1>
        <div class="citas-contenedor">

            <div class="calendar">
                <h2>Calendario</h2>
                <FullCalendar v-if="calendarEvents.length > 0" :options="calendarOptions">
                    <template v-slot:eventContent='arg'>
                        <div class="custom-event" :class="getSeverity(arg.event.extendedProps[2].value)">
                            <b>{{ arg.event.title }}</b>
                            <!-- {{ arg.event.title }} -->
                            <div v-for=" prop in arg.event.extendedProps">
                                <!-- <Tag v-if="prop.key === 'estado'" class="tag-estado"
                                        :value="prop.value" :severity="getSeverity(prop.value)" /> -->

                                <p v-if="prop.key === 'estado'">{{ prop.value }}</p>
                                <p v-if="prop.key === 'consultorio'">{{ prop.value }}</p>
                                <p v-if="prop.key === 'hora'">{{ prop.value }}</p>

                            </div>
                        </div>
                    </template>
                </FullCalendar>

            </div>

            <div class="contenedor-citas">

                <div class="contenedor-boton">
                    <div class="contenido-boton">
                        <SplitButton :model="items" icon="pi pi-plus" class="bg-primary border-round">
                            <div class="menu">
                                <i class="pi pi-list"></i>
                                <span>Menu</span>
                            </div>
                        </SplitButton>
                    </div>
                </div>

                <div class="contenido-citas">

                    <div class="citas">
                        <h2>Listado</h2>

                        <DataTable :value="Citas.citas" tableStyle="min-width: 5rem" paginator :rows="5" stripedRows
                            :rowsPerPageOptions="[5, 10, 20, 50]">
                            <Column v-if="selectOpcion" selectionMode="single" headerStyle="width: 3rem"></Column>
                            <Column header="Estado">
                                <template #body="slotProps">
                                    <Tag class="tag-estado" :value="slotProps.data.estado"
                                        :severity="getSeverity(slotProps.data.estado)" />
                                </template>
                            </Column>
                            <Column field="servicio.nombre" header="Tipo"></Column>

                            <Column field="mascota.nombre" header="Mascota"></Column>
                            <Column field="consultorio" header="Consultorio"></Column>

                            <Column header="Fecha">
                                <template #body="slotProps">
                                    {{ Formato.formatearFecha(slotProps.data.fecha_cita) }}
                                </template>
                            </Column>



                        </DataTable>


                    </div>

                </div>

            </div>


        </div>
    </div>
</template>


<style scoped>
.custom-event {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border-radius: 5px;
    padding: 8px;
    font-size: clamp(.2em, 10vw, 1em);
    /* color: white; */
}

.fc-event .info {
    background-color: #D0E1FD;
}

.fc-event .secondary {
    background-color: #F5F3FF;
}

.fc-event.success {
    background-color: #CAF1D8;
}

.fc-event .danger {
    background-color: #FFD0CE;
}

.fc-event .warning {
    background-color: #FEDDC7;
}


.calendar {
    display: flex;
    flex-direction: column;
}

.citas-contenedor {
    display: grid;
    grid-template-columns: 80% 20%;
    gap: 30px;
    padding: 2vh;
    /* align-items: center; */
    /* justify-content: space-between; */
    /* gap: 4vw; */
    width: 100%;
    /* height: 100vh; */
}

.cliente {
    cursor: pointer;
}

.contenedor-principal {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.contenedor-boton {
    display: flex;
    justify-content: right;
}

.contenido-boton {
    display: flex;
    z-index: 1;
    flex-direction: column;
}

.menu {
    /* cursor: pointer; */
    color: white;
    background-color: var(--color-morado-general);
    display: flex;
    align-items: center;
    gap: 10px;
    /* margin-right: 22px; */
    padding: 10px;
    border-radius: 10px 0px 0px 10px;
    text-align: center;
}

.tag-estado {
    cursor: pointer;

}

.aprobar {
    background-color: var(--color-verde-ok);
    padding: 10px;
    border-radius: 30px;
    color: white;
    transition: all 0.2s ease;

}

.aprobar:hover {
    transform: translateY(-1px);
}

.contenido-citas {
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    gap: 3vh;
}

h1 {
    font-size: clamp(1em, 5vw, 3em);
    color: var(--color-morado-general);

    text-align: center;
    margin-bottom: 20px;
}

h2 {
    color: var(--color-morado-oscuro-general);

    margin-bottom: 3vh;
}
</style>