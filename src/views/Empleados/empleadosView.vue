<script setup>
	import {onMounted,watch} from 'vue'

	import { useAuthStore } from '../../stores/auth';
	import {usePaginacion} from '../../stores/paginacion'
	import { useCliente } from '../../stores/cliente';
	import { useEmpleado } from '../../stores/empleado';
    import {useAdmin} from '../../stores/admin'
	const Empleado  = useEmpleado()
	const Cliente = useCliente()
	const Paginacion = usePaginacion()
    
	const Auth = useAuthStore()
    const Admin = useAdmin()
	onMounted(()=>{
		Auth.ObtenerToken()
		Empleado.verEmpleados()
	})
	watch(() => Empleado.empleados.isActive, (newTipo) => {
	})
	const handleClick = ()=>{
		if(Empleado.empleados.length  <4){
			return 
		}
		Paginacion.cambiarPaginaEmpleado()
	}
</script>

<template>
	<div class="contenedor-mascotas">
		<div class="contenedor-boton">
			<button 
			@click="Admin.handleRegistroEmpleado"
			class="botonAgregar">Añadir Empleado</button>
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

						<tr v-for="empleado in Empleado.empleados ">


							<td> {{empleado.nombre}} </td>
							<td> {{ empleado.apellido }} </td>
							<td> {{ empleado.numero_celular}}</td>
							<td> {{ empleado.email }} </td>

							<td>
                                <div class="rol">
                                    <img @click="Empleado.verPerfilEmpleado(empleado)" src="../../assets/img/Cliente.svg" alt="">
                                    <p>{{ empleado.rol}}</p>
                                </div>
                            </td>

							<td>
								<div class="contenedor-estado activo"
								@click="Empleado.cambiarEstadoEmpleado(Auth.token,empleado.id)"
								:class="empleado.isActive ? 'activo' : 'inactivo'"
								>
									<div class="circulo"></div>
									<p class="titulo-estado">{{ empleado.isActive ? 'Activo' : 'Inactivo' }}</p>
								</div>
	
							</td>

							<td>
								<div class="boton-perfil">
									<!-- <button @click="dashboard.handleVerEmpleado(empleado)">Ver</button> -->
									<button @click="Empleado.verEmpleado(empleado)">Ver</button>
								</div>
							</td>
							<td @click="Empleado.redigiriEditarEmpleado(empleado)"
							><img src="../../assets/img/editar.svg" alt="" srcset=""></td>
						</tr>
					</tbody>
				</table>
	
			</div>
			
			<div class="paginacion">
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
			</div>
		</div>
	</div>
</template>

<style scoped>
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
	box-shadow: 0px 10px 15px -20px rgba(0,0,0,0.1);
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
tr{
	border-top-style: solid;
	border-top-color: var(--color-gris-claro);
	border-top-width: 0,2px;
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