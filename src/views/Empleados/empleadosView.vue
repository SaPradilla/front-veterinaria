<script setup>
import { onMounted, watch ,ref} from 'vue'

import { useAuthStore } from '../../stores/auth';
import { usePaginacion } from '../../stores/paginacion'
import { useCliente } from '../../stores/cliente';
import { useEmpleado } from '../../stores/empleado';
import { useAdmin } from '../../stores/admin'


import SplitButton from 'primevue/splitbutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag'
import Button from 'primevue/button';
import { toast } from 'vue3-toastify'

const selectOpcion = ref(false)
const selectEmployee = ref(null)

const items = [
	{
		label:'Nuevo empleado',
		command:()=> Admin.handleRegistroEmpleado()
	},{
		label:'Editar',
		command:()=> handleSelectOption()
	}
]
const handleSelectOption = ()=> selectOpcion.value = !selectOpcion.value

const Empleado = useEmpleado()
const Cliente = useCliente()
const Paginacion = usePaginacion()

const Auth = useAuthStore()
const Admin = useAdmin()

onMounted(() => {
	Auth.ObtenerToken()
	Empleado.verEmpleados()
})

const edit = ()=>{
	if(!selectEmployee.value){
		toast.error('Selecciona un empleado para editar',{
			transition: toast.TRANSITIONS.ZOOM,
			autoClose: 1000,
			position: toast.POSITION.TOP_RIGHT
		})
		return
	}
	Empleado.redigiriEditarEmpleado(selectEmployee.value)
	// Mascota.redirigirEditarMascota(selectPet.value)
}

const handleClick = () => {
	if (Empleado.empleados.length < 4) {
		return
	}
	Paginacion.cambiarPaginaEmpleado()
}
const getSeverity = (estado) => {
	return estado ? 'success' : 'warning'
}

</script>

<template>
	<div class="contenedor-empleados">
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
			<button @click="" class="botonAgregar">Añadir Empleado</button>
		</div> -->
		<div class="contenido-empleados">
			<h1>Empleados</h1>
			<div v-if="selectOpcion" @click="handleSelectOption()" class="botones-accion">
				<Button @click="edit" icon="pi pi-pencil" severity="success" rounded outlined />

				<Button icon="pi pi-times" severity="danger" rounded outlined aria-label="Cancel" />
			</div>
			<div class="lista-empleados">
				<!-- td> {{empleado.nombre}} </td>
					<td> {{ empleado.apellido }} </td>
					<td> {{ empleado.numero_celular}}</td>
					<td> {{ empleado.email }} </td>

					
					<th>Nombre</th>
					<th>Apellido</th>
					<th>Celular</th>
					<th>Email</th>
					<th>Rol</th>
					<th>Estado</th> -->
				<DataTable v-model:selection="selectEmployee" dataKey="id" :value="Empleado.empleados" paginator :rows="5"
					stripedRows :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">

					<Column v-if="selectOpcion" selectionMode="single" headerStyle="width: 3rem"></Column>

					<Column class="col" field="nombre" header="Nombre" sortable style="width: 25%"></Column>
					<Column class="col" field="apellido" header="Apellido" sortable style="width: 25%"></Column>
					<Column class="col" field="numero_celular" sortable header="Celular" style="width: 25%"></Column>
					
					<Column header="Rol" >
						<template #body="slotProps">
							<div class="rol">
                                    <img @click="Empleado.verPerfilEmpleado(slotProps.data)" src="../../assets/img/Cliente.svg" alt="">
                                    <p>{{ slotProps.data.rol}}</p>
                                </div>
							<!-- <img @click="Cliente.verCliente(slotProps.data.cliente.id, Auth.token)"
								src="../../assets/img/Cliente.svg" alt=""> -->

						</template>
					</Column>
					<Column header="Estado">
						<template #body="slotProps">
							<Tag class="tag-estado" @click="Empleado.cambiarEstadoEmpleado(Auth.token,slotProps.data.id)"
								:value="slotProps.data.isActive ? 'Activo' : 'Inactivo'"
								:severity="getSeverity(slotProps.data.isActive)" />
						</template>
					</Column>


				</DataTable>
			</div>
			<!-- <div class="lista-mascotas">
				<table>

					<thead>
						<tr>


							<th></th>
							<th></th>
						</tr>
					</thead>

					<tbody>

						<tr v-for="empleado in  ">


							<

							<td>
                               
                            </td>

							<td>
								<div class="contenedor-estado activo"
								@click=""
								:class="empleado.isActive ? 'activo' : 'inactivo'"
								>
									<div class="circulo"></div>
									<p class="titulo-estado">{{ empleado.isActive ? 'Activo' : 'Inactivo' }}</p>
								</div>
	
							</td>

							<td>
								<div class="boton-perfil">
							
									<button @click="Empleado.verEmpleado(empleado)">Ver</button>
								</div>
							</td>
							<td @click=""
							><img src="../../assets/img/editar.svg" alt="" srcset=""></td>
						</tr>
					</tbody>
				</table>
	
			</div> -->

			<!-- <div class="paginacion">
				<div class="contenedor-paginacion">
					<div class="paginacionBotones anterior"
						v-if="Paginacion.currentPageEmpleado > 1"
						@click="Paginacion.cambiarPaginaAnteriorEmpleado()"	
					>
					<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875q-.375.375-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75q0-.375.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388q.375.375.375.875t-.375.875L9.55 12Z"/></svg>

					</div>


					<p v-for="pageNumber in Paginacion.totalPagesEmpleado" :key="Paginacion.totalPagesEmpleado"  >
						
						{{  Paginacion.currentPageEmpleado - pageNumber - 1 < 1 ?  '' : Paginacion.currentPageEmpleado - pageNumber - 1 }}

					</p>
					 <p v-for="pageNumber in Paginacion.totalPagesEmpleado" :key="Paginacion.totalPagesEmpleado"  >
						
						{{  Paginacion.currentPageEmpleado - pageNumber  < 1 ? '' : Paginacion.currentPageEmpleado - pageNumber  }}

					</p>

					<p class="currentPage"> {{ Paginacion.currentPageEmpleado }}</p>

					<div 
					class="paginacionBotones siguiente"  
					:class="Empleado.empleados.length < 4 ? 'nomas' : 'simas' "
					@click="handleClick() "
					>
					<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path  d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887L14.475 12Z"/></svg>
					</div>
				</div>
			</div> -->
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

.contenido-empleados {
	overflow-y: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* align-items: center; */
	gap: 3vh;
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
	width: 25vh;
	cursor: pointer;
	font-size: 1.2em;
	transition: all 0.2s ease;
}

.botonAgregar:hover {
	transform: scale(0.9);
	background-color: #6413d7;

}



table {
	background-color: white;
	box-shadow: 0px 10px 15px -20px rgba(0, 0, 0, 0.1);
	width: 120vh;
	border-collapse: collapse;
	overflow: hidden;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	text-align: center;
}

thead {
	background-color: var(--color-morado-general);
	height: 50px;
}

th {
	font-weight: 500;
	font-size: 1.3em;
	padding-left: 50px;

	color: white;
}

tr {
	border-top-style: solid;
	border-top-color: var(--color-gris-claro);
	border-top-width: 0, 2px;
}

td {
	height: 10px;
	padding: 20px;
	background-color: rgba(255, 255, 255, 0.2);
	color: black;

}

img.foto-mascota {

	height: 50px;
	width: 50px;
	border-radius: 100%;


}

div.circulo {
	border-radius: 100%;
	height: 20px;
	width: 20px;
	margin: 0 auto;
}

div.circulo {
	color: var(--color-verde-ok);
	background-color: var(--color-verde-ok);
}

p.titulo-estado {
	text-align: center;
}

div.contenedor-estado {
	transition: all 0.2s ease;
	cursor: pointer;
}

div.contenedor-estado:hover {
	filter: brightness(50%);
}

div.contenedor-estado.activo .circulo {
	background-color: var(--color-verde-ok);
}

div.contenedor-estado.activo p.titulo-estado {
	color: var(--color-verde-ok);
}

div.contenedor-estado.inactivo .circulo {
	background-color: var(--color-rojo);
}

div.contenedor-estado.inactivo p.titulo-estado {
	color: var(--color-rojo);
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
}</style>