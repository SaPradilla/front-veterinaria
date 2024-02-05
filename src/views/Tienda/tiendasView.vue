<script setup>
import { useAdmin } from '../../stores/admin';
import { useInventario } from '../../stores/inventario';
import {ref, onMounted} from 'vue'
import SpeedDial from 'primevue/speeddial';
import SplitButton from 'primevue/splitbutton';
import Paginator from 'primevue/paginator';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import SelectButton from 'primevue/selectbutton'
import SelectButton from 'primevue/selectbutton';
import { useFormatear } from '../../stores/formatear';

const Admin = useAdmin()
const Inventario = useInventario()
const Formato = useFormatear()


const modal = ref(false)
const handleModal = ()=> modal.value = !modal.value

onMounted(()=>{
	Inventario.verMedicamentos()
	Inventario.verAccesorios()
})

const items = [
	{
		label:'Accesorio',
		command: ()=> Admin.handlRegistrarAccesorio()
	},
	{
		label:'Medicamento',
		command: ()=> Admin.handlRegistrarMedicinas()
		
	}
]
</script>

<template>

    <div class="contenedor-tiendas">
        <div class="contenedor-boton">
			<div class="contenido-boton">
				<SplitButton :model="items" icon="pi pi-plus" class="bg-primary border-round">
					<span class="agregar">Agregar</span>
				</SplitButton>
				<!-- <button
					@click="handleModal"
					class="botonAgregar"
					:class="modal ? 'border-menu' : '' "
					>Añadir Producto
				</button> -->
				<!-- <div v-if="modal" class="menu-user">
	
					<div class="menu">
						<div @click="">
							<p class="arriba">Accesorio</p>
						</div>
						<div @click="">
							<p class="abajo">Medicina</p>
						</div>
	
					</div>
				</div> -->
			</div>

		</div>

		<div class="contenido-productos">
			<h1>Productos</h1>
			<div class="listado-productos">
				<!-- Medicamentos -->
				<div class="medicamentos">
					<h2>Medicamentos</h2>
					<DataTable class="lista" :value="Inventario.medicamentos" paginator :rows="5" stripedRows  :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
						<Column class="col" field="medicamento.nombre" header="Nombre" sortable   style="width: 25%"></Column>
						<Column class="col" field="medicamento.precio" header="Precio" sortable  style="width: 25%"></Column>
						<Column class="col" field="medicamento.tipo_medicina.nombre"  sortable  header="Tipo" style="width: 25%"></Column>
						<Column class="col" field="cantidad_total" header="Cantidad Total" sortable   style="width: 25%"></Column>
						<Column class="col" field="estado" header="Estado"  sortable  style="width: 25%"></Column>
						<Column class="col" field="medicamento.volumen"  header="Volumen" style="width: 25%"></Column>
						<Column class="col" field="medicamento.fecha_venciminento" sortable  header="Caducación" style="width: 25%">
							<template #body="slotProps">
								{{ Formato.formatearFecha(slotProps.data.medicamento.fecha_venciminento) }}
							</template>
						</Column>
						<Column class="col" field="unidades_disponibles" sortable  header="Disponibles" style="width: 25%"></Column>
					</DataTable>
				</div>
				<div class="accesorios">
					<h2>Accesorios</h2>
					<DataTable class="lista" :value="Inventario.accesorios" paginator :rows="5" stripedRows  :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
						<Column field="accesorio.nombre" header="Nombre" sortable   style="width: 25%"></Column>
						<Column field="accesorio.precio" header="Precio" sortable  style="width: 25%"></Column>
						<Column field="accesorio.tipo_accesorio.nombre"  sortable  header="Tipo" style="width: 25%"></Column>
						<Column field="cantidad_total" header="Cantidad Total" sortable   style="width: 25%"></Column>
						<Column field="estado" header="Estado"  sortable  style="width: 25%"></Column>
						<Column field="unidades_disponibles" sortable  header="Disponibles" style="width: 25%"></Column>
					</DataTable>

				</div>
			</div>
		</div>


    </div>
</template>


<style scoped>
.agregar{
	color: white;
	background-color: #8B5CF6;
	display: flex;
	align-items: center;
	/* margin-right: 22px; */
	padding: 10px;
	border-radius: 10px 0px 0px 10px;
	text-align: center;
}
h2{
	color: #454545;
	margin-bottom: 3vh;
}
.listado-productos{
	padding: 6rem;
    border-radius: 10px;
    margin-bottom: 10rem;
	display: flex;
	flex-direction: column;
	gap: 6vh;
}
p {
    line-height: 1.75;
}
    
table.p-datatable-wrapper{

	padding: 20px;
}

.contenedor-boton {
	display: flex;
	justify-content: right;
	/* align-items: ; */
	/* height: max; */
	/* width: 100%; */
}
.contenido-boton{
	display: flex;
	flex-direction: column;
}
h1{
	text-align: center;
}
.contenido-productos{
	/* overflow-y: hidden; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* align-items: center; */
	gap: 3vh;
	padding: 10px;
}
.menu-user {
	width: 100px;
}


.menu {
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: left;
    /* gap: 1vh; */
    border-radius: 0px 0px 10px 10px;
    position: absolute;
    background-color: var(--color-morado-general);
	z-index: 100;
	box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);	
}
.menu-user p {
    cursor: pointer;
    color: white;
    padding: 10px;
}
.botonAgregar.border-menu{
	border-radius: 0px 10px 10px 0px;
}
.botonAgregar.border-menu:hover{
	transform: scale(1);
    background-color: var(--color-morado-general);

}

.menu-user p.arriba {
    /* border-top-left-radius: 10px;
    border-top-right-radius: 10px; */

}

.menu-user p.abajo {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.menu-user p:hover {


    background-color: var(--color-morado-oscuro-general);
    color: white;
    padding: 10px;
}
.botonAgregar {
	padding: 10px;
	border-style: none;
	background-color: var(--color-morado-general);
	color: white;
	border-radius: 15px;
	width: 10em;
	cursor: pointer;
	font-size: 1.3em;
	transition: all 0.2s ease;
}

.botonAgregar:hover {
	transform: scale(0.96);
	background-color: #6413d7;

}


</style>