<script setup>

</script>
<template>
    <div class="nosotros">

        <div class="contenido">
            <div class="texto-nosotros">¿Quienes Somos?</div>
            <div class="contenedor-contenido">
                <img class="fondo-shape" alt="Fondo shape" src="../../assets/img/fondo-shape.png" />

                <div class="flexcontainer">
                    <p class="text">
                        En Pelitos tenemos un corazón profundamente comprometido con el futuro de los animales.

                    </p>
                    <p class="text">
                        Nuestro amor inquebrantable por las criaturas de nuestro planeta nos ha llevado a la
                        creación de la
                        empresa Pelitos que salva vidas día tras día.
                    </p>
                </div>

            </div>
        </div>

        <div class="footer-nosotros">
            <div class="contenedor-footer">

                <p>Pelitos ha marcado una diferencia significativa en la <strong>salud</strong> y la
                    <strong>felicidad</strong> de las mascotas. <strong>Su pasión y
                        compromiso </strong> hacia el futuro de los animales son evidentes en cada consulta y tratamiento,
                    garantizando un
                    mañana más brillante para nuestras adoradas mascotas.</p>

                <button class="botonInfo">Leer Más</button>

            </div>
        </div>
    </div>
</template>

<style scoped >
.nosotros {
    margin-top: 10vh;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: max-content;
    justify-content: space-between;
}


.nosotros .contenido {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: max-content;
    width: 100%;
}

.nosotros .texto-nosotros {
    color: var(--color-morado-general);
    font-size: clamp(2rem, 5vw, 4em);
    font-weight: 700;
    position: relative;
    text-align: center;
    white-space: nowrap;
    width: fit-content;
}

.nosotros .contenedor-contenido {
    align-items: center;
    display: flex;
    justify-content: space-between;
    /* padding: 0px 19px; */
    position: relative;
    height: 60vh;
}

.nosotros .fondo-shape {
    height: 400px;
    object-fit: cover;
    position: relative;
}

.nosotros .flexcontainer {
    display: flex;
    height: max-content;
    /* max-height: 250px; */
    flex-direction: column;
    gap: 74px;
}


.flexcontainer .text {
    font-weight: 600;
    line-height: 1em;
    position: relative;
    font-size: clamp(.5em, 4vw, 1.6em);
}

.footer-nosotros {
    margin: 0 auto;
    justify-content: center;
    display: flex;
    overflow: hidden;
    margin-bottom: 100px;
}

.contenedor-footer {
    display: flex;
    flex-direction: column;
    /* justify-content: flex-end; */
    align-items: center;
    gap: 10px;
}

.contenedor-footer p {
    color: var(--color-morado-oscuro-general);
    text-align: center;
    font-size: clamp(1em, 3vw, 1.7em);
}


.botonInfo {
    margin: 10px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-style: none;
    background-color: #ffffff;
    color: var(--color-morado-general);
    border-radius: 10px;
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 1.3em;
    height: 60px;
    font-weight: 800;
    padding: 1em;
    text-align: center;
}

.botonInfo:hover {
    transform: scale(0.9);
    background-color: #ebddff;
}




@media (max-width: 768px) {
    .nosotros {
        padding: 0px;
        overflow-x: hidden;
        overflow-y: hidden;
    }


    .nosotros .fondo-shape {
        margin-top: 40px;
        height: 300px;
        width: 300px;
    }

    .nosotros .text {
        text-align: center;
        line-height: 26px;
    }

    .nosotros .contenedor-contenido {
        /* width: 1000px; */
        display: flex;
        flex-direction: column;
    }

    .nosotros .flexcontainer {
        gap: 10px;
    }

    .footer-nosotros {

        margin-top: 80px;
        margin-bottom: 50px;
    }

    .contenedor-footer {
        height: max-content;
        /* display: inline; */
        gap: 1px;

    }

    .contenedor-footer p {
        line-height: 1.3em;
        font-weight: 500;
    }

    .botonInfo {
        font-size: 1em;
        width: max-content;
        font-weight: 800;
    }



}</style>