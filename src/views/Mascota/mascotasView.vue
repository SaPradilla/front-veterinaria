<script setup>

// const dashboard = useDashboard()
import { onMounted, watch, ref } from 'vue'
// import { useDashboard } from '../../stores/dashboard';
import { useMascota } from '../../stores/mascota';
import { useAuthStore } from '../../stores/auth';
import { usePaginacion } from '../../stores/paginacion'
import { useAdmin } from '../../stores/admin';
import { useCliente } from '../../stores/cliente';

import SplitButton from 'primevue/splitbutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag'
import Button from 'primevue/button';
import {toast} from 'vue3-toastify'

const Cliente = useCliente()
const Paginacion = usePaginacion()
// const dashboard = useDashboard()
const Mascota = useMascota()
const Auth = useAuthStore()
const Admin = useAdmin()



const items = [
	{
		label:'Nueva Mascota',
		command:()=> Admin.handleRegistroMascota()
	},{
		label:'Editar',
		command:()=> handleSelectOption()
	}
]
const selectOpcion = ref(false)
const selectPet = ref(null)

onMounted(() => {
	Auth.ObtenerToken()
	Mascota.obtenerMascotas()

})


const handleSelectOption = ()=> selectOpcion.value = !selectOpcion.value

const edit = ()=>{
	if(!selectPet.value){
		toast.error('Selecciona una mascota para editar',{
			transition: toast.TRANSITIONS.ZOOM,
			autoClose: 1000,
			position: toast.POSITION.TOP_RIGHT
		})
		return
	}
	Mascota.redirigirEditarMascota(selectPet.value)
}
const handleClick = () => {
	if (Mascota.mascotas.length < 4) {
		return
	}
	Paginacion.cambiarPaginaMascota()
}
const getSeverity = (estado) => {
	return estado ? 'success' : 'warning'
}
</script>

<template>
	<div class="contenedor-mascotas">
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
		<!-- <div class="contenedor-boton">
			<button @click="" class="botonAgregar">Añadir Mascota</button>
		</div> -->
		
		<div class="contenido-mascotas">
			<h1>Mascotas</h1>
			<div v-if="selectOpcion" @click="handleSelectOption()" class="botones-accion">
				<Button @click="edit" icon="pi pi-pencil" severity="success" rounded outlined />

				<Button icon="pi pi-times" severity="danger" rounded outlined aria-label="Cancel" />
			</div>
			<div class="lista-mascotas">

				<DataTable v-model:selection="selectPet" dataKey="id" :value="Mascota.mascotas" paginator :rows="5"
					stripedRows :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">

					<Column v-if="selectOpcion" selectionMode="single" headerStyle="width: 3rem"></Column>
					<Column class="col" field="nombre" header="Nombre" sortable style="width: 25%"></Column>
					<Column class="col" field="tipo_mascota" header="Tipo" sortable style="width: 25%"></Column>
					<Column class="col" field="raza" sortable header="Raza" style="width: 25%"></Column>
					<Column class="col" field="edad" sortable header="Edad" style="width: 25%"></Column>
					<Column class="col" field="genero" sortable header="Genero" style="width: 25%"></Column>

					<Column header="Dueño" >
						<template #body="slotProps">
							<img @click="Cliente.verCliente(slotProps.data.cliente.id, Auth.token)"
								src="../../assets/img/Cliente.svg" alt="">
						</template>
					</Column>
					<Column header="Estado">
						<template #body="slotProps">
							<Tag class="tag-estado" @click="Mascota.cambiarEstadoMascota(Auth.token, slotProps.data.id)"
								:value="slotProps.data.isActive ? 'Activo' : 'Inactivo'"
								:severity="getSeverity(slotProps.data.isActive)" />
						</template>
					</Column>


				</DataTable>

				<!-- <table>

					<thead>
						<tr>
				
							<th>Nombre</th>
							<th>Tipo</th>
							<th>Edad</th>
							<th>Raza</th>
							<th>Genero</th>
							<th>Dueño</th>
							<th>Estado</th>
							<th></th>
							<th></th>
						</tr>
					</thead>

					<tbody>

						<tr v-for="mascota in  ">

							

							

							<td>
								<div class="contenedor-estado"
								@click=""
								:class="mascota.isActive ? 'activo' : 'inactivo'"
								>
									<div class="circulo"></div>
									<p class="titulo-estado">{{ mascota.isActive ? 'Activo' : 'Inactivo' }}</p>
								</div>

							</td>
							<td>
								<div class="boton-perfil">
									<button @click="Mascota.verPerfilMascota(mascota)" >Ver Perfil</button>
								</div>
							</td>
							<td
							@click=""
							><img src="../../assets/img/editar.svg" alt="" srcset=""></td>
						</tr>


					</tbody>
				</table> -->

			</div>
			
		</div>
	</div>
</template>

<style scoped>
.botones-accion{
	display: flex;
	gap: 20px;

}

.contenedor-boton {
	display: flex;
	justify-content: right;
}
.contenido-boton{
	display: flex;
	z-index: 1;
	flex-direction: column;
}.menu{
	/* cursor: pointer; */
	color: white;
	background-color: #8B5CF6;
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

h1 {
	color: var(--color-morado-general);
	font-weight: 700;
	text-align: center;
}

.contenido-mascotas {
	/* overflow-y: hidden; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* align-items: center; */
	gap: 3vh;
}

.lista-mascotas {
	height: clamp(20vh,30vw,50vh);
	width: 100%;
}

.contenedor-boton {
	display: flex;
	justify-content: right;
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


img.foto-mascota {

	height: 50px;
	width: 50px;
	border-radius: 100%;


}

.boton-perfil button {
	width: max-content;
	padding: 10px;
	border-style: none;
	background-color: #5a0fc3;
	color: white;
	border-radius: 20px;

	transition: all 0.2s ease;
	cursor: pointer;
}

.boton-perfil button:hover {
	transform: scale(0.9);
	background-color: #6413d7;
}
</style>