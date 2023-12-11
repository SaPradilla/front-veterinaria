<script setup>
import { useAdmin } from '../../stores/admin';

const Admin = useAdmin()
</script>

<template>

    <div class="contenedor-tiendas">
        <div class="contenedor-boton">

			<button
                @click="Admin.handlRegistrarMedicinas"
                class="botonAgregar">Añadir Medicina
            </button>

		</div>
    </div>
</template>


<style scoped>

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
</style>