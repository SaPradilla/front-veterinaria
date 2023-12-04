<script setup>
	import {onMounted} from 'vue'
	import { useDashboard } from '../stores/dashboard';
	import { useMascota } from '../stores/mascota';
	import { useAuthStore } from '../stores/auth';
	import {usePaginacion} from '../stores/paginacion'
	import { useCliente } from '../stores/cliente';

	const Cliente = useCliente()
	const Paginacion = usePaginacion()
    const dashboard = useDashboard()
	const Auth = useAuthStore()

	onMounted(()=>{
		Auth.ObtenerToken()
		// Mascota.obtenerMascotas()
	})

</script>

<template>
	<div class="contenedor-mascotas">
		<div class="contenedor-boton">
			<button 
			@click="dashboard.handleRegistroEmpleado"
			class="botonAgregar">Registrar Empleado</button>
		</div>
		<div class="contenido-mascotas">
			<h1>Empleados</h1>
			<div class="lista-mascotas">
				<table>

					<thead>
						<tr>
							<th>Nombre</th>
							<th>Apellido</th>
							<th>Celular</th>
							<th>Email</th>
							<th>Rol</th>
							<th>Estado</th>
							<th></th>
							<th></th>
						</tr>
					</thead>

					<tbody>
	
						<!-- <tr v-for="mascota in Mascota.mascotas "> -->
						<tr>
							<!-- <td>
								<img class="foto-mascota" src="../assets/img/wally.jpeg" alt="">
							</td>
	 -->
							<td> Santiago </td>
							<td> Pradilla </td>
							<td> 57 317288723 </td>
							<td> 123@correo.com </td>
							
							<td>
                                <div class="rol">
                                    <img @click="" src="../assets/img/Cliente.svg" alt="">
                                    <p>Admin</p>
                                </div>
                            </td>

							<td>
								<div class="contenedor-estado activo"
								@click=""
								>
									<div class="circulo"></div>
									<p class="titulo-estado">Activo</p>
								</div>
	
							</td>

							<td>
								<div class="boton-perfil">
									<button @click="">Ver</button>
								</div>
							</td>
							<td><img src="../assets/img/editar.svg" alt="" srcset=""></td>
						</tr>

                        <tr>
							<!-- <td>
								<img class="foto-mascota" src="../assets/img/wally.jpeg" alt="">
							</td>
	 -->
							<td> Santiago </td>
							<td> Pradilla </td>
							<td> 57 317288723 </td>
							<td> 123@correo.com </td>
							
							<td>
                                <div class="rol">
                                    <img @click="" src="../assets/img/Cliente.svg" alt="">
                                    <p>Admin</p>
                                </div>
                            </td>

							<td>
								<div class="contenedor-estado activo"
								@click=""
								>
									<div class="circulo"></div>
									<p class="titulo-estado">Activo</p>
								</div>
	
							</td>

							<td>
								<div class="boton-perfil">
									<button @click="">Ver</button>
								</div>
							</td>
							<td><img src="../assets/img/editar.svg" alt="" srcset=""></td>
						</tr>
					</tbody>
				</table>
	
			</div>
			<div class="paginacion">
				<div class="contenedor-paginacion">
					<button
					class="paginacionBotones"
					v-if="Paginacion.currentPage > 1"
					@click="Paginacion.cambiarPaginaAnterior()">Anterior</button>

					<p v-for="pageNumber in Paginacion.totalPages" :key="Paginacion.totalPages"  >
						
						{{  Paginacion.currentPage - pageNumber - 1 < 1 ?  '' : Paginacion.currentPage - pageNumber - 1 }}

					</p>
					 <p v-for="pageNumber in Paginacion.totalPages" :key="Paginacion.totalPages"  >
						
						{{  Paginacion.currentPage - pageNumber  < 1 ? '' : Paginacion.currentPage - pageNumber  }}

					</p>

					<p class="currentPage"> {{ Paginacion.currentPage }}</p>
					<button class="paginacionBotones"  @click="Paginacion.cambiarPagina()">Siguiente</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
td img{
	transition: all 0.2s ease;
	cursor: pointer;
}

td img:hover{
	filter: brightness(50%) ;
	transform: translateY(-0.4px);
}
.paginacionBotones{
	background-color: var(--color-morado-general);
	border: none;
	color:white;
	padding: 6px;
	border-radius: 10px;
	cursor:pointer;
	transition: all 0.2s ease;
}
.paginacionBotones:hover{
	background-color: var(--color-morado-claro-general);
	transform: translateY(-1px);
}
p.currentPage{
	color: var(--color-morado-general);
	/* font-size: 1.4em; */
	font-weight: 700;
}
h1{
	color: var(--color-morado-general);
	font-weight:700;
}
.contenido-mascotas {
	overflow-y: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
	width: 100vh;
	border-collapse: collapse;
	overflow: hidden;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    text-align: center;
}

thead {
    background-color: var(--color-morado-muy-claro);
    height: 50px;
}

th {
	font-weight: 500;
	font-size: 1.3em;
	color: black;
}

td {
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
div.contenedor-estado{
	transition: all 0.2s ease;
	cursor: pointer;
}
div.contenedor-estado:hover{
	filter: brightness(50%);
}
div.contenedor-estado.activo .circulo{
	background-color: var(--color-verde-ok);
}
div.contenedor-estado.activo p.titulo-estado{
	color: var(--color-verde-ok);
}
div.contenedor-estado.inactivo .circulo{
	background-color: var(--color-rojo);
}
div.contenedor-estado.inactivo p.titulo-estado{
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
}

.contenedor-paginacion{
	display: flex;
	flex-direction: row;
	gap: 5vh;
	text-align: center;
}


</style>