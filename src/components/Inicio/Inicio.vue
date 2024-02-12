<script setup>
import { useInicio } from '../../stores/inicio';

// Stores
const Inicio = useInicio()
</script>

<template>

    <div class="inicio">
        <div class="contenedor-inicio">

            <div class="contenedor-textos">

                <img class="veterinaria-fondo" src="../../assets/img/veterinaria-fondo.svg" alt="veterinaria">

                <div class="text-veterinaria">Veterinaria</div>
                <div class="pelitos"> PELITOS </div>
                
                <button @click="Inicio.redirigirSolicitudCita" class="botonCita"> Agendar Cita</button>
            
            </div>

            <img class="vector-veterinaria" alt="Vector veterinaria" src="../../assets/img/vector-veterinaria.png" />

        </div>
    </div>
 
</template>

<style scoped>
.inicio {
    width: 100%;
    display: flex;
    justify-content: center ;
    /* overflow-y: hidden;
    overflow-x: hidden; */
    height: max-content;
    height: 100vh;
}
.inicio .contenedor-inicio {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.inicio .contenedor-textos {
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

}

.inicio .text-veterinaria {

    color: #000000;
    font-family: 'Oooh Baby', cursive;
    font-size: clamp(4em,10vw,10em);
    font-weight: 400;
    text-align: center;
    height: auto;  

}
.pelitos{
    font-size: clamp(4em,10vw,6.3em);
    font-weight: 900;
}

.inicio .vector-veterinaria {
    height: auto;
    width: 400px;
    max-width: 100%;
    transition: all 0.2s ease;
}

.inicio .vector-veterinaria:hover {
    transform: scale(1.01);
}

.veterinaria-fondo {
    display: none;
}

.botonCita {
    padding: 10px;
    border-style: none;
    background-color: var(--color-morado-general);
    color: white;
    border-radius: 15px;
    width: 10em;
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 1.5em;

}

.botonCita:hover {
    transform: scale(0.9);
    background-color: var(--color-morado-oscuro-general);

}
@media (max-width: 768px) {
    .veterinaria-fondo {
        height: 300px;
        width: 300px;
        display: unset;
        margin-bottom: 50px;
    }

    img.vector-veterinaria {
        display: none;
    }

    .inicio {
        overflow-x: hidden;
    }

    .inicio .contenedor-inicio {
        margin: 0 auto;
    }
    .contenedor-textos{
        gap: 1px;
    }
    .botonCita {
        width: 14em;
        border-radius: 18px;
        font-size: large;
    }
}
</style>