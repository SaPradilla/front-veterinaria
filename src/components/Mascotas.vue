<script setup>
</script>

<template>
	<div class="contenedor-mascotas">
		<div class="contenedor-boton">
			<button class="botonAgregar">Añadir Mascota</button>
		</div>
		<div class="contenido-mascotas">
			<h1>Listado de mascotas</h1>
			<div class="lista-mascotas">
				<table>
					<thead>
						<tr>
							<th></th>
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
	
						<tr>
							<td>
								<img class="foto-mascota" src="../assets/img/wally.jpeg" alt="">
							</td>
	
							<td>Matias</td>
							<td>Perro</td>
							<td>7 años </td>
							<td>Pekines</td>
							<td>Macho</td>
							<td><img src="../assets/img/Cliente.svg" alt=""></td>
							<td>
								<div class="contenedor-estado">
									<div class="circulo"></div>
									<p class="titulo-estado">Activo</p>
								</div>
	
							</td>
							<td>
								<div class="boton-perfil">
									<button>Ver Perfil</button>
								</div>
							</td>
							<td><img src="../assets/img/editar.svg" alt="" srcset=""></td>
						</tr>
						<tr>
							<td>
								<img class="foto-mascota" src="../assets/img/wally.jpeg" alt="">
							</td>
	
							<td>Matias</td>
							<td>Perro</td>
							<td>7 años </td>
							<td>Pekines</td>
							<td>Macho</td>
							<td><img src="../assets/img/Cliente.svg" alt=""></td>
							<td>
								<div class="contenedor-estado">
									<div class="circulo"></div>
									<p class="titulo-estado">Activo</p>
								</div>
							</td>
							<td>
								<div class="boton-perfil">
									<button>Ver Perfil</button>
	
								</div>
							</td>
							<td><img src="../assets/img/editar.svg" alt="" srcset=""></td>
						</tr>
						<tr>
							<td>
								<img class="foto-mascota" src="../assets/img/wally.jpeg" alt="">
							</td>
	
							<td>Matias</td>
							<td>Perro</td>
							<td>7 años </td>
							<td>Pekines</td>
							<td>Macho</td>
							<td><img src="../assets/img/Cliente.svg" alt=""></td>
							<td>
								<div class="contenedor-estado">
									<div class="circulo"></div>
									<p class="titulo-estado">Activo</p>
								</div>
							</td>
							<td>
								<div class="boton-perfil">
									<button>Ver Perfil</button>
								</div>
							</td>
							<td><img src="../assets/img/editar.svg" alt="" srcset=""></td>
						</tr>
					</tbody>
				</table>
	
			</div>
			<div class="paginacion">
				<div class="contenedor-paginacion">
					<p>1</p>
					<p>2</p>
					<p>3</p>
					<p>..</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
h1{
	color: var(--color-morado-general);
	font-weight:700;
}
.contenido-mascotas {
	overflow-y: hidden;

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 5vh;
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
	width: 800px;
	border-collapse: collapse;
	overflow: hidden;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

thead {
	margin-bottom: 50px;

}

th {
	font-weight: 700;
	font-size: 1.3em;
	padding-left: 50px;
	color: var(--color-morado-general);
}

td {
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
	color: var(--color-verde-ok);
}

div.circulo.activo {
	background-color: var(--color-verde-ok);
}

p.titulo-estado.activo {
	color: var(--color-verde-ok);
}

div.circulo.inactivo {
	background-color: var(--color-rojo);
}

p.titulo-estado.inactivo {
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
.contenedor-paginacion p{
	
}

</style>