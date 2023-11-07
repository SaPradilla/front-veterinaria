<script setup>
defineProps({
    animar: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits(['toggleModal'])

</script>

<template>
    <div class="modal" >
        <div class="contenedor-modal"
        :class="animar ? 'animar' : 'cerrar'"
        >
            <div class="contenedor-titulos">
                <div class="titulos">

                    <a @click="$emit('toggleModal')" href="#nosotros">Nosotros</a>
                    <a @click="$emit('toggleModal')" href="#servicios">Servicios</a>
                    <a @click="$emit('toggleModal')" href="#testimonios">Testimonios</a>
                    <a @click="$emit('toggleModal')" href="#productos">Productos</a>
                    <a @click="$emit('toggleModal')" href="#contacto">Contacto</a>
                    <a @click="$emit('toggleModal')" href="#pqr">PQR</a>

                </div>
            </div>

        </div>
    </div>
</template>


<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(14px) brightness(100%);
    background-color: rgba(90, 15, 195, 0.5);
 
}


.contenedor-modal {
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
    width: 80%;
    padding: 20px;
    opacity: 0;
}
.contenedor-modal.animar {
    opacity: 1;
}

.contenedor-modal.cerrar {
    opacity: 0;
}


.contenedor-titulos {
    display: grid;
    place-content: center;
}

.titulos {
    display: flex;
    flex-direction: column;
}

.titulos a {
    color: white;
    text-decoration: none;
    text-align: center;
    font-size: 3.4em;
    font-weight: 800;
    margin: 30px 0;
    transition: all 0.2s ease;

}

.titulos a:hover {
    transform: scale(0.9);

}
</style>