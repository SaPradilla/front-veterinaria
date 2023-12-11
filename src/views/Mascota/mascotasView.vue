<script setup>

    
   
    // const dashboard = useDashboard()
    import {onMounted,watch} from 'vue'
	// import { useDashboard } from '../../stores/dashboard';
	import { useMascota } from '../../stores/mascota';
	import { useAuthStore } from '../../stores/auth';
	import {usePaginacion} from '../../stores/paginacion'
	import { useAdmin } from '../../stores/admin';
	import { useCliente } from '../../stores/cliente';

	const Cliente = useCliente()
	const Paginacion = usePaginacion()
    // const dashboard = useDashboard()
	const Mascota = useMascota()
	const Auth = useAuthStore()
    const Admin = useAdmin()

	onMounted(()=>{
		Auth.ObtenerToken()
		Mascota.obtenerMascotas()
		
	})
	watch(() => Mascota.mascotas.isActive, (newTipo) => {

	})
	const handleClick = ()=>{
		if(Mascota.mascotas.length  < 4){
			return 
		}
		Paginacion.cambiarPaginaMascota()
	}
</script>

<template>
    
	<div class="contenedor-mascotas">

		<div class="contenedor-boton">
			<button
			@click="Admin.handleRegistroMascota"
			class="botonAgregar">Añadir Mascota</button>
		</div>
		
		<div class="contenido-mascotas">
			<h1>Listado de mascotas</h1>
			<div class="lista-mascotas">
				<table>

					<thead>
						<tr>
							<!-- <th></th> -->
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

						<tr v-for="mascota in Mascota.mascotas ">
							<!-- <td>
								<img class="foto-mascota" src="../assets/img/wally.jpeg" alt="">
							</td>
	                        -->
							<td>{{ mascota.nombre }}</td>
							<td>{{mascota.tipo_mascota}}</td>
							<td>{{mascota.edad}} años </td>
							<td>{{mascota.raza}}</td>
							<td>{{mascota.genero}}</td>

							<td><img @click="Cliente.verCliente(mascota.cliente.id,Auth.token)" src="../../assets/img/Cliente.svg" alt=""></td>

							<td>
								<div class="contenedor-estado"
								@click="Mascota.cambiarEstadoMascota(Auth.token,mascota.id)"
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
							@click="Mascota.redirigirEditarMascota(mascota)"
							><img src="../../assets/img/editar.svg" alt="" srcset=""></td>
						</tr>


					</tbody>
				</table>

			</div>
			<div class="paginacion">
				<div class="contenedor-paginacion">
					<div
						class="paginacionBotones"
						v-if="Paginacion.currentPageMascota > 1"
						@click="Paginacion.cambiarPaginaAnteriorMascota()"
					>
					<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875q-.375.375-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75q0-.375.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388q.375.375.375.875t-.375.875L9.55 12Z"/></svg>

					</div>

					<p v-for="pageNumber in Paginacion.totalPagesMascota" :key="Paginacion.totalPagesMascota"  >
						
						{{  Paginacion.currentPageMascota - pageNumber - 1 < 1 ?  '' : Paginacion.currentPageMascota - pageNumber - 1 }}

					</p>
					 <p v-for="pageNumber in Paginacion.totalPagesMascota" :key="Paginacion.totalPagesMascota"  >
						
						{{  Paginacion.currentPageMascota - pageNumber  < 1 ? '' : Paginacion.currentPageMascota - pageNumber  }}

					</p>

					<p class="currentPage"> {{ Paginacion.currentPageMascota }}</p>
					<div class="paginacionBotones"  @click="handleClick()"
						:class="Mascota.mascotas.length < 4 ? 'nomas' : 'simas' "
					
					>
						<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path  d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887L14.475 12Z"/></svg>
					
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<style scoped>
.paginacion{
	position: absolute;
	top: 80vh;
	width: 30vh;
	background-color: white;
	box-shadow: 0px 10px 15px -20px rgba(0,0,0,0.1);
	padding: 10px;
	border-radius: 30px;
	/* right: 0; */
}
.contenedor-paginacion{
	display: flex;
	flex-direction: row;
	gap: 5vh;
	text-align: center;
	justify-content: space-around;
	align-items: center;
}
.contenedor-paginacion p{
	font-size: 1.2em;
}

td img{
	transition: all 0.2s ease;
	cursor: pointer;
}

td img:hover{
	filter: brightness(50%) ;
	transform: translateY(-0.4px);
}
.paginacionBotones{
	/* background-color: var(--color-morado-general); */
	color:white;
	padding: 6px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	cursor:pointer;
	
	transition: all 0.2s ease;
}
.paginacionBotones svg{
	width: 1.2em;
	
}
.paginacionBotones path{
	width: 1.2em;
	fill: var(--color-morado-general);
	
}
.paginacionBotones.anterior:hover{
	
	transform: translateX(-2px);
	filter: brightness(5%);
}
.paginacionBotones.siguiente.simas:hover{

	transform: translateX(2px);
	filter: brightness(5%);
}
.paginacionBotones.nomas{
	cursor: not-allowed;
}
.paginacionBotones.nomas path{
	cursor: not-allowed;
	fill: var(--color-gris-oscuro);
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
	width: 10em;
	cursor: pointer;
	font-size: 1.3em;
	transition: all 0.2s ease;
}

.botonAgregar:hover {
	transform: scale(0.9);
	background-color: #6413d7;

}


table {
	background-color: white;
	box-shadow: 0px 10px 15px -20px rgba(0,0,0,0.1);
	width: 120vh;
	border-collapse: collapse;
	overflow: hidden;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    text-align: center;

	
}

thead {
	margin-bottom: 50px;
	background-color: var(--color-morado-general);
    height: 50px;

}
tr{
	border-top-style: solid;
	border-top-color: var(--color-gris-claro);
	border-top-width: 0,2px;
}
th {
	font-weight: 500;
	font-size: 1.3em;
	padding-left: 50px;
	color: white;
}

td {
	padding: 1vh;
	margin: 0 auto;
	padding-left: 50px;
	padding-top: 3vh;
	background-color: rgba(255, 255, 255, 0.2);
	color: var(--color-gris);

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




</style>