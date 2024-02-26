<script setup>
import { useCliente } from '../../stores/cliente';
import {ref} from 'vue'
import {toast} from 'vue3-toastify'

import SplitButton from 'primevue/splitbutton';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import SpeedDial from 'primevue/speeddial';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';



import { useRouter } from 'vue-router';
import { useFormatear } from '../../stores/formatear';
import {useMascota} from '../../stores/mascota'

const router = useRouter()
const Cliente = useCliente()
const Formato = useFormatear()
const Mascota = useMascota()

const getSeverity = (estado) => {

    if (estado === 'Programada') return 'info'
    if (estado === 'En proceso') return 'secondary'
    if (estado === 'Completada') return 'success'
    if (estado === 'Cancelada') return 'danger'
    if (estado === 'Reprogramada') return 'warning'
}
const selectPet = ref(null)
const selectOptionPet = ref(false)
const handleSelection = ()=> selectOptionPet.value = !selectOptionPet.value

const items = [
	{
		label:'Editar',
		icon: 'pi pi-pencil',	
		command:()=> handleSelection()
	},
	// {
	// 	label:'Borrar',
	// 	icon: 'pi pi-trash',	
	// 	command:()=> show()
	// }
]

const separarStringNumeros = (cadena)=>{
    // Utilizamos una expresión regular para encontrar el número en la cadena
    const match = cadena.match(/\d+/);

    // Si se encuentra un número en la cadena
    if (match) {
        // Convertimos el texto del número a un número entero
        const numero = parseInt(match[0], 10);
        
        // Eliminamos el número de la cadena original
        const restoCadena = cadena.replace(/\d+/, '').trim();
        
        return {numero, restoCadena };
    } else {
        // Si no se encuentra ningún número en la cadena, retornamos null
        return { numero: null, restoCadena: cadena };
    }
}

const edit  = ()=>{

    console.log(selectPet.value)
    const {numero,restoCadena} = separarStringNumeros(selectPet.value.edad)

    Mascota.MascotaUpdate = selectPet.value
    Mascota.MascotaUpdate.edad = numero
    Mascota.opcionEdad = ' ' + restoCadena
	Mascota.MascotaUpdate.imagenUrl = selectPet.value.imagen
	Mascota.MascotaUpdate.genero = Mascota.MascotaUpdate.genero === 'Macho' ? true : false

    router.push({name:'editar-mascota-user'})
}

</script>

<template>
    <div class="contenedor-info-user">

        <TabView>
            <TabPanel header="Mascotas">
                
                <div class="contenedor-tool">
                    <div class="contenedor-boton">
        
                        <Button @click="router.push({ name: 'registro-mascota-user' })" style="font-size: .8em;  "
                            label="Añadir mascota" rounded outlined />
                            <div class="">
                                <SpeedDial style="position: relative;" class="acciones" buttonClass="p-button-outlined"  showIcon="pi pi-bars" hideIcon="pi pi-times"   :transitionDelay="150" 	 :model="items" direction="rigth" />
                            </div>
                        <!-- <div class="contenido-boton">
                        </div> -->
                    </div>
                    <div v-if="selectOptionPet" @click="handleSelection()" class="botones-accion">
                        <Button @click="edit" icon="pi pi-pencil" severity="success" rounded outlined aria-label="Search" />
        
                        <Button icon="pi pi-times" severity="danger" rounded outlined aria-label="Cancel" />
        
                    </div>
    
                </div>
                <div class="sin-datos" v-if="!Cliente.cliente.mascotas">
                    <h2>No tienes mascotas registradas :( </h2>
                </div>
    
                <div v-else class="mis-mascotas">
    
                    <DataTable 
                        v-model:selection="selectPet"
                        :value="Cliente.cliente.mascotas" 
                        paginator 
                        :rows="3"
                        :rowsPerPageOptions="[3, 6, 12]"
                        tableStyle="min-width: 50rem"
                        dataKey="id"
                    >
                        <Column v-if="selectOptionPet" selectionMode="single" headerStyle="width: 3rem"></Column>
    
                        <!-- <Column header="Foto">
                            <template #body="slotProps">
                                <div class="image"></div>
                            </template>
                        </Column> -->
                        <Column header="Foto">
                            <template #body="slotProps">
                                <img class="image" :src="`http://localhost:6060/uploads/pets/${slotProps.data.imagen}`" :alt="slotProps.data.imagen" />
                            </template>
					    </Column>
                        <Column header="Info">
                            <template #body="slotProps">
    
                                <div class="info-mascota">
                                    <h1> {{ slotProps.data.nombre }} </h1>
                                    <div class="more-info">
                                        <strong> {{ slotProps.data.tipo_mascota }}</strong>
                                        <p> {{ slotProps.data.edad }} </p>
                                    </div>
                                    <!-- <div class="info-menu">
                                        <p>Adminstrar</p>
                                        <i class="pi pi-cog"></i>
    
                                    </div> -->
                                </div>
                            </template>
                        </Column>
    
    
                        <Column header="Vacunas">
                            <template #body="slotProps">
                                <div class="info-medica">
                                    <h2>Vacunas</h2>
                                    <p>Parvovirosis Pentavalente Rabia
                                        Moquillo, Adenovirus ,traqueobronquitis infecciosa canina
                                        Leptospira
                                    </p>
                                </div>
    
                            </template>
                        </Column>
    
                    </DataTable>
    
    
                </div>
    
            </TabPanel>
           
            <TabPanel header="Citas">
                <Button @click="router.push({ name: 'solicitud-cita' })" style="font-size: .8em; margin-bottom: 4vh; "
                            label="Agendar cita" rounded outlined />
                <div class="solicitud_cita">

                    <h2>Tus solicitudes</h2>
                    <div class="sin-datos" v-if="Cliente.cliente.solicitud_cita && Cliente.cliente.solicitud_cita.length === 0">
                        <h2>No tienes solicitudes pendientes</h2>
                    </div>

                    <DataTable v-else :value="Cliente.cliente.solicitud_cita" tableStyle="min-width: 50rem" paginator :rows="3"
                        stripedRows :rowsPerPageOptions="[3]">
        
                        <Column field="servicio.nombre" header="Tipo"></Column>
                        <Column header="Mascota">
                            <template #body="slotProps">
                                <td>{{ slotProps.data.mascota.nombre }} {{ slotProps.data.mascota.raza }}</td>
                            </template>
                        </Column>
        
                        <Column header="Fecha">
                            <template #body="slotProps">
                                {{ Formato.formatearFecha(slotProps.data.fecha) }}
                                {{ Formato.formatearHora(slotProps.data.fecha) }}
                            </template>
                        </Column>
        
                        <Column header="Estado">
                            <template #body="slotProps">
                                <Tag class="tag-estado" :value=" slotProps.data.isAprobada ? 'Aprobada' : 'Pendiente' "
                                    :severity=" slotProps.data.isAprobada ? 'success' : 'warning' " />
                            </template>
                        </Column>
        
                    </DataTable>
                </div>

                <div class="citas">
                    <h2>Citas</h2>
                    <div class="sin-datos" v-if="Cliente.cliente.citas_medicas && Cliente.cliente.citas_medicas.length === 0">
                        <h2>No tienes citas realizadas</h2>
                    </div>
        
                    <DataTable v-else :value="Cliente.cliente.citas_medicas" tableStyle="min-width: 50rem" paginator :rows="3"
                        stripedRows :rowsPerPageOptions="[3, 6, 12, 24]">
        
                        <Column field="servicio.nombre" header="Tipo"></Column>
                        <Column field="consultorio" header="Lugar"></Column>
                        <Column header="Empleado">
                            <template #body="slotProps">
                                <td>{{ slotProps.data.empleado.nombre }} {{ slotProps.data.empleado.apellido }}</td>
                            </template>
                        </Column>
        
                        <Column header="Fecha">
                            <template #body="slotProps">
                                {{ Formato.formatearFecha(slotProps.data.fecha_cita) }}
                                {{ Formato.formatearHora(slotProps.data.fecha_cita) }}
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
            </TabPanel>
    
            <TabPanel header="Compras">
                <p class="m-0">
                    No tienes compras aún
                </p>
            </TabPanel>
        </TabView>
    </div>
</template>

<style scoped>
.contenedor-info-user{
    
}
.botones-accion{
    display: flex;
    gap: 25px;
}
.contenedor-tool{
    display: flex;
    justify-content: space-between;
}
.acciones{
	display: flex;
	align-items: center;
	position: relative;
	gap: 20px;
	justify-content: space-between;
	width: 200px;
	height: 10px; 
}
.mis-mascotas {
    display: flex;
    flex-direction: column;
    gap: 4vh;

}

.contenedor-mascotas {
    display: flex;

    /* justify-content: left; */
    align-items: center;
    gap: 4vh;

}

.sin-datos {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    text-align: center;
    color: var(--color-gris-oscuro);
}

.image {
    height: 100px;
    width: 100px;
    background-color: #D9D9D9;
    border-radius: 100%;
}


.contenedor-boton {
    display: flex;
    justify-content: left;
    gap: 20px;
    align-items: center;
    height: max-content;

    /* font-size: .3em; */
}

.contenido-boton {
    display: flex;
    align-items: center;
    justify-content: center;
    /* z-index: 1; */
    /* flex-direction: column; */
}

.menu {
    /* cursor: pointer; */
    color: white;
    background-color: var(--color-morado-general);
    display: flex;
    align-items: center;
    gap: 10px;
    /* margin-right: 22px; */
    padding: 2px;
    border-radius: 10px 0px 0px 10px;
    text-align: center;
}

.info-mascota {
    display: flex;
    flex-direction: column;
    align-items: left;
}

.more-info {
    display: flex;
    gap: 10px;
    color: var(--color-morado-general);
}

h1 {
    font-size: clamp(.7em, 10vw, 1.4em);
}

h2 {
    color: var(--color-gris-oscuro);
    font-size: clamp(.4em, 10vw, 1.2em);
}

.info-menu {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 10px;
}

.info-medica {
    width: 300px;
}

.info-medica p {
    font-size: clamp(.4em, 3vw, .8em);
}</style>