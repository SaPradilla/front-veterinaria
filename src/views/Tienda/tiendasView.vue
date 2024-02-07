<script setup>
import { useAdmin } from '../../stores/admin';
import { useInventario } from '../../stores/inventario';
import {ref, onMounted} from 'vue'
import { useRouter} from 'vue-router'
import SpeedDial from 'primevue/speeddial';
import SplitButton from 'primevue/splitbutton';
import Paginator from 'primevue/paginator';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import SelectButton from 'primevue/selectbutton'
import SelectButton from 'primevue/selectbutton';
import Tag from 'primevue/tag'
import Button from 'primevue/button';

// import SpeedDial from 'primevue/speeddial';
import Divider from 'primevue/divider';


import { useFormatear } from '../../stores/formatear';
import { useAuthStore } from '../../stores/auth';

const Admin = useAdmin()
const Inventario = useInventario()
const Formato = useFormatear()
const router = useRouter()
const Auth = useAuthStore()
const modal = ref(false)
const selectOptionMedicine = ref(false)

const selectMedicine = ref(null)
const selectAccesory = ref(null)

// metodos
const handleModal = ()=> modal.value = !modal.value
const handleSelectionMedicine = ()=> selectOptionMedicine.value = !selectOptionMedicine.value

onMounted(()=>{
	Inventario.verMedicamentos()
	Inventario.verAccesorios()
})

const items = [
	{
		label:'Medicamento',
		command: ()=> Admin.handlRegistrarMedicinas()
		
	},
	{
		label:'Accesorio',
		command: ()=> Admin.handlRegistrarAccesorio()
	}
]
const itemsAcciones = [
	{
		label:'Editar',
		icon: 'pi pi-pencil',	
		command:()=> handleSelectionMedicine()
	},
	{
		label:'Borrar',
		icon: 'pi pi-trash',	
		command:()=> show()
	}
]

const edit = ()=>{
	handleSelectionMedicine()
	
	router.push({name:"editar-medicina"})

	Inventario.updateMedicinadata.nombre = selectMedicine.value.medicamento.nombre
	Inventario.updateMedicinadata.tipo_medicinaId = selectMedicine.value.medicamento.tipo_medicina
	// Inventario.updateMedicinadata.estado = selectMedicine.value.estado
	Inventario.updateMedicinadata.precio = selectMedicine.value.medicamento.precio
	// Inventario.updateMedicinadata.volumen = selectMedicine.value.medicamento.volumen

	Inventario.updateMedicinadata.fecha_venciminento = Formato.formatoFechaDDMMYY(selectMedicine.value.medicamento.fecha_venciminento)
	Inventario.updateMedicinadata.idMedicina = selectMedicine.value.medicamento.id
	Inventario.tipoVolumen = Formato.extraerString(selectMedicine.value.medicamento.volumen)

	Inventario.updateMedicinadata.volumen = Formato.extraerNumbers(selectMedicine.value.medicamento.volumen)

	Inventario.updateMedicinadata.cantidad_total = selectMedicine.value.cantidad_total

	// Inventario.tipoxd = selectMedicine.value.medicamento.tipo_medicina.nombre
	// console.log()

	// Inventario.actualizarMedicina()
}
const getSeverity = (product)=>{
	console.log(product)
	if(product === 'Disponible') return 'success'
	if(product === 'Agotado') return 'warning'
}
// const cambiarEstadoMedicine = (id)=>{
// 	Inventario.cambiarEstadoMedicine(Auth.token,id)
// }
</script>

<template>

    <div class="contenedor-tiendas">
        <div class="contenedor-boton">
			<div class="contenido-boton">
				<SplitButton :model="items" icon="pi pi-plus" class="bg-primary border-round">
					<span class="agregar">Agregar</span>
				</SplitButton>
			</div>

		</div>

		<div class="contenido-productos">
			<h1>Productos</h1>
			<div class="listado-productos">
				<!-- Medicamentos -->
				<div class="medicamentos">
					<div class="titulo-medicamentos">
						<h2>Medicamentos</h2>
						<div class="botones">
							<div class="">
								<SpeedDial class="acciones" buttonClass="p-button-outlined"  showIcon="pi pi-bars" hideIcon="pi pi-times"   :transitionDelay="150" 	 :model="itemsAcciones" direction="right" />
							</div>
							<div v-if="selectOptionMedicine" @click="handleSelectionMedicine()" class="cancelar">
								<Button @click="edit" icon="pi pi-pencil" severity="success" rounded outlined aria-label="Search" />

								<Button icon="pi pi-times" severity="danger" rounded outlined aria-label="Cancel" />
	
							</div>
						</div>

					</div>
						
					<div v-if="Inventario.medicamentos.length !== 0">
						<DataTable v-model:selection="selectMedicine" dataKey="id"  :value="Inventario.medicamentos" paginator :rows="5" stripedRows  :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
							<Column v-if="selectOptionMedicine" selectionMode="single" headerStyle="width: 3rem"></Column>
							<Column class="col" field="medicamento.nombre" header="Nombre" sortable   style="width: 25%"></Column>
							<Column class="col" field="medicamento.precio" header="Precio" sortable  style="width: 25%"></Column>
							<Column class="col" field="medicamento.tipo_medicina.nombre"  sortable  header="Tipo" style="width: 25%"></Column>
							<Column class="col" field="cantidad_total" header="Cantidad Total" sortable   style="width: 25%"></Column>
							<!-- <Column class="col" field="estado" header="Estado"  sortable  style="width: 25%"></Column> -->
							<Column header="Estado">
								<template #body="slotProps">
									<Tag class="tag-estado"  @click="Inventario.cambiarEstadoMedicine(Auth.token,slotProps.data.medicamento.id)" :value="slotProps.data.estado" :severity="getSeverity(slotProps.data.estado)" />
								</template>
							</Column>

							<Column class="col" field="medicamento.volumen"  header="Volumen" style="width: 25%"></Column>
							<Column class="col" field="medicamento.fecha_venciminento" sortable  header="Caducación" style="width: 25%">
								<template #body="slotProps">
									{{ Formato.formatearFecha(slotProps.data.medicamento.fecha_venciminento) }}
								</template>
							</Column>
							<Column class="col" field="unidades_disponibles" sortable  header="Disponibles" style="width: 25%"></Column>
						</DataTable>
					</div>
					<div v-else>
						<p>No hay medicamento :( </p>
					</div>
				</div>
				<Divider />
				<div class="accesorios">
					<h2>Accesorios</h2>
					<div v-if="Inventario.accesorios.length !== 0">
						<DataTable class="lista" :value="Inventario.accesorios" paginator :rows="5" stripedRows  :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
							<Column field="accesorio.nombre" header="Nombre" sortable   style="width: 25%"></Column>
							<Column field="accesorio.precio" header="Precio" sortable  style="width: 25%"></Column>
							<Column field="accesorio.tipo_accesorio.nombre"  sortable  header="Tipo" style="width: 25%"></Column>
							<Column field="cantidad_total" header="Cantidad Total" sortable   style="width: 25%"></Column>
							<Column field="estado" header="Estado"  sortable  style="width: 25%"></Column>
							<Column field="unidades_disponibles" sortable  header="Disponibles" style="width: 25%"></Column>
						</DataTable>
					</div>
					<div v-else>
						<p>No hay accesorios :(</p>
					</div>

				</div>
			</div>
		</div>


    </div>
</template>


<style scoped>
.tag-estado{
	cursor: pointer;
}
.medicamentos{
	height: clamp(20vh,30vw,50vh);
}
.acciones{
	display: flex;
	align-items: center;
	position: relative;
	/* gap: 20px; */
	/* justify-content: space-between; */
	/* width: 200px; */
	height: 10px;
}
.titulo-medicamentos{
	display: flex;
	/* gap: 5px; */
	flex-direction: column;
	position: relative;
	height: clamp(100px,10vw,150px);
}
.botones{
	display: flex;
	justify-content: space-between;
	/* margin-bottom: 20px; */

}
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
	/* padding: 6rem; */
    border-radius: 10px;
    margin-bottom: 10rem;
	display: flex;
	flex-direction: column;
	gap: 6vh;
	justify-content: left;
}
p {
    line-height: 1.75;
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
	z-index: 1;
	flex-direction: column;
}
h1{
	text-align: center;
	font-size: clamp(1em,5vw,3em);
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