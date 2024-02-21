<script setup>
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router'

defineProps({
    animar: {
        type: Boolean,
        required: true
    }
})

const Auth = useAuthStore()
const router = useRouter()

const redirigirLogin = () => router.push({ name: 'auth' })

const redirigirTienda = () => router.push({ name: 'tienda' })


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
                    
                    <div @click="redirigirTienda" class="tienda">

                        <a>Tienda</a>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="#ffffff"
                            d="M11.15 22.825L1.175 12.85L11.975 2h10v10zM17.475 8q.625 0 1.063-.437t.437-1.063q0-.625-.437-1.062T17.475 5q-.625 0-1.062.438T15.975 6.5q0 .625.438 1.063T17.475 8" />
                        </svg>
                    </div>
                    <a  v-if="Auth.token" @click="router.push({name:'info-perfil'})">Ver cuenta</a>

                    <div class="login" v-if="Auth.token === null" ><a @click="redirigirLogin">Iniciar Sesion</a></div>
                    <a v-if="Auth.token" @click="Auth.cerroSesion">Cerrar Sesion</a>

                    <!-- <a @click="$emit('toggleModal')" href="#pqr">PQR</a> -->

                </div>
            </div>

        </div>
    </div>
</template>


<style scoped>
.login{
    cursor: pointer;
}
div.tienda{
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    cursor: pointer;
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
}
.tienda:hover, a  {
    transform: scale(0.9);
}
svg{
    height: 40px;
}
/* {
    transform: scale(0.9);
} */
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
    font-size: 2.5em;
    font-weight: 800;
    margin: 30px 0;
    transition: all 0.2s ease;

}


</style>