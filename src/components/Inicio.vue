<script setup>

</script>
<template>
    <div>
        <div class="inicio">
            <div class="overlap-group-wrapper">
                <div class="overlap-group">
                    <div class="blur-shapes">
                        <div class="ellipse"></div>
                        <div class="ellipse-2"></div>
                    </div>
                    <div class="contenedor-inicio">
                        <div class="contenedor-textos">
                            <div class="text-wrapper">Veterinaria</div>
                            <img class="texto-pelitos" alt="Texto pelitos" src="../assets/img/texto-pelitos.png" />
                            <button class="botonCita"> Solicitar Cita</button>
                        </div>
                        <img class="vector-veterinaria" alt="Vector veterinaria"
                            src="../assets/img/vector-veterinaria.png" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.botonCita{
    padding: 20px;
    border-style: none;
    background-color: #5a0fc3;
    color: white;
    border-radius: 10px;
    width: 15em;
    transition: all 0.2s ease;
    cursor: pointer;

}
.botonCita:hover{
    transform: scale(0.9); 
    background-color: #6413d7;

}
.inicio {

    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100vh;
}
.inicio .blur-shapes {
    left: 0;
    position: absolute;
    top: 0;
}

.inicio .ellipse {
    background: linear-gradient(180deg, rgb(90, 15, 195) 0%, rgb(90, 15, 195) 100%);
    border-radius: 164px/160px;
    filter: blur(267px);
    height: 320px;
    left: 1424px;
    position: absolute;
    top: 0;
    width: 328px;
}

.inicio .ellipse-2 {
    background: linear-gradient(180deg, rgb(90, 15, 195) 0%, rgb(90, 15, 195) 100%);
    border-radius: 164px/160px;
    filter: blur(267px);
    height: 320px;
    left: 0;
    position: absolute;
    top: 892px;
    width: 328px;
}

.inicio .contenedor-inicio {
    margin-top: 14vh;
    align-items: center;
    display: flex;
    top: 305px;
    width: 1315px;
}

.inicio .contenedor-textos {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 300px;
    justify-content: space-between;
    width: 737px;
}

.inicio .text-wrapper {
    color: #000000;
    font-family: 'Oooh Baby', cursive;
    font-size: 10em;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 16px;
    text-align: center;
}

.inicio .texto-pelitos {
    height: 100px;
    width: 497px;
}

.inicio .vector-veterinaria {
    height: 506px;
    width: 489px;
}
</style>