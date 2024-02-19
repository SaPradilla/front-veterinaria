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
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";


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

const confirm = useConfirm();


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
const onRowSelect = (event) => {
	
	selectEmployee.value = event.data
	confirmVerCliente()
};



const confirmVerCliente = () => {
    confirm.require({
        message: `¿Quiere visualizar el perfil de ${selectEmployee.value.nombre}?`,
        header: 'Confirmacion',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Ir',
        accept: () => {
            Empleado.verEmpleado(selectEmployee.value)
        },
        reject: () => {
           
        }
    });
};

</script>

<template>
	<ConfirmDialog></ConfirmDialog>
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

		<div class="contenido-empleados">
			<h1>Empleados</h1>
			<div v-if="selectOpcion" @click="handleSelectOption()" class="botones-accion">
				<Button @click="edit" icon="pi pi-pencil" severity="success" rounded outlined />

				<Button icon="pi pi-times" severity="danger" rounded outlined aria-label="Cancel" />
			</div>
			<div class="lista-empleados">

				<DataTable
					v-model:selection="selectEmployee" 
					dataKey="id" 
					:value="Empleado.empleados"
					selectionMode="single"
					paginator 
					:rows="5"
					:metaKeySelection="false"
					@row-dblclick="onRowSelect"
					:rowsPerPageOptions="[5, 10, 20, 50]" 
					tableStyle="min-width: 50rem"
		
					
					>

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
							<!-- <img @click="Cliente.verClienteAdmin(slotProps.data.cliente.id, Auth.token)"
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
					<!-- <button @click="">Ver</button> -->

				</DataTable>
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


h1 {
	color: var(--color-morado-general);
	font-weight: 700;	
	text-align: center;
	font-size: clamp(1em,5vw,3em);

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

</style>	