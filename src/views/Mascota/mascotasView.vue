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
import { toast } from 'vue3-toastify'
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from 'vue-router';

const Cliente = useCliente()
const Paginacion = usePaginacion()
// const dashboard = useDashboard()
const Mascota = useMascota()
const Auth = useAuthStore()
const Admin = useAdmin()
const confirm = useConfirm();
const router = useRouter()


const items = [
	{
		label: 'Nueva Mascota',
		command: () => Admin.handleRegistroMascota()
	}, {
		label: 'Editar',
		command: () => handleSelectOption()
	}
]
const selectOpcion = ref(false)
const selectPet = ref(null)

onMounted(() => {
	Auth.ObtenerToken()
	Mascota.obtenerMascotas()

})


const handleSelectOption = () => selectOpcion.value = !selectOpcion.value
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
const edit = () => {
	if (!selectPet.value) {
		toast.error('Selecciona una mascota para editar', {
			transition: toast.TRANSITIONS.ZOOM,
			autoClose: 1000,
			position: toast.POSITION.TOP_RIGHT
		})
		return
	}
	const {numero,restoCadena} = separarStringNumeros(selectPet.value.edad)

	Mascota.MascotaUpdate = selectPet.value
	Mascota.MascotaUpdate.cliente_nombre = selectPet.value.cliente.nombre
    Mascota.MascotaUpdate.edad = numero
    Mascota.opcionEdad = ' ' + restoCadena 
	Mascota.MascotaUpdate.imagenUrl = selectPet.value.imagen
	Mascota.MascotaUpdate.genero = Mascota.MascotaUpdate.genero === 'Macho' ? true : false
	// console.log(Mascota.MascotaUpdate)
	// console.log(Mascota.opcionEdad)
	router.push({name:'editar-mascota'})
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
const onRowSelect = (event) => {
	
	selectPet.value = event.data
	confirmVerMascota()
};


const confirmVerMascota = () => {
    confirm.require({
        message: `¿Quiere ver el perfil de ${selectPet.value.nombre}?`,
        header: 'Confirmacion',
        // icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Ir',
        accept: () => {
			Mascota.verPerfilMascota(selectPet.value)
            // Empleado.verEmpleado(selectEmployee.value)
        },
        reject: () => {
           
        }
    });
};

</script>

<template>
	<ConfirmDialog></ConfirmDialog>
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

				<DataTable 
				v-model:selection="selectPet" 
				dataKey="id" 
				:value="Mascota.mascotas"
				selectionMode="single"
				paginator 
				:rows="5"
				stripedRows 
				:rowsPerPageOptions="[5, 10, 20, 50]" 
				tableStyle="min-width: 50rem"
				@row-dblclick="onRowSelect"
				>

					<Column v-if="selectOpcion" selectionMode="single" headerStyle="width: 3rem"></Column>
					<Column class="col" field="nombre" header="Nombre" sortable ></Column>
					<Column header="Foto">
						<template #body="slotProps">
							<img class="image" :src="`http://localhost:6060/uploads/pets/${slotProps.data.imagen}`" :alt="slotProps.data.imagen" />
						</template>
					</Column>
					<Column class="col" field="tipo_mascota" header="Tipo" sortable ></Column>
					<Column class="col" field="raza" sortable header="Raza" ></Column>
					<Column class="col" field="edad" sortable header="Edad" ></Column>
					<Column class="col" field="genero" sortable header="Genero" ></Column>

					<Column header="Dueño">
						<template #body="slotProps">
							<img @click="Cliente.verClienteAdmin(slotProps.data.cliente.id, Auth.token)"
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
			</div>

		</div>
	</div>
</template>

<style scoped>

.image {
	width:5em;
	height: 5em;
	border-radius: 100%;
	box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
}
.botones-accion {
	display: flex;
	gap: 20px;

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

h1 {
	font-size: clamp(1em, 5vw, 3em);

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
	height: clamp(20vh, 30vw, 50vh);
	width: 100%;
}

.contenedor-boton {
	display: flex;
	justify-content: right;
}

.botonAgregar {
	padding: 10px;
	border-style: none;
	background-color: var(--color-morado-general);
	color: white;
	border-radius: 25px;
	width: 10em;
	cursor: pointer;
	font-size: 1.3em;
	transition: all 0.2s ease;
}

.botonAgregar:hover {
	transform: scale(0.9);
	background-color: var(--color-morado-oscuro-general);

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
	background-color: var(--color-morado-general);
	color: white;
	border-radius: 20px;

	transition: all 0.2s ease;
	cursor: pointer;
}

.boton-perfil button:hover {
	transform: scale(0.9);
	background-color: var(--color-morado-oscuro-general);
}</style>