<script setup>

</script>
<template>
    <div class="nosotros">
        <div class="overlap-group-wrapper">
            <div class="blur-shapes">
                <div class="ellipse"></div>
                <div class="ellipse-2"></div>
                <div class="ellipse-3"></div>
            </div>
            <div class="contenido">

                <div class="texto-nosotros">¿Quienes Somos?</div>
                <div class="contenedor-contenido">
                    <img class="fondo-shape" alt="Fondo shape" src="../assets/img/fondo-shape.png" />
                    <div class="flexcontainer">
                        <p class="text">
                            <span class="text-wrapper">
                                En Pelitos tenemos un corazón profundamente comprometido con el futuro de los animales.
                            </span>
                        </p>
                        <p class="text">
                            <span class="text-wrapper">
                                Nuestro amor inquebrantable por las criaturas de nuestro planeta nos ha llevado a la
                                creación de la
                                empresa Pelitos que salva vidas día tras día.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-nosotros">
        <div class="contenedor-footer">

            <p>Pelitos ha marcado una diferencia significativa en la salud y la felicidad de las mascotas. Su pasión y
                compromiso hacia el futuro de los animales son evidentes en cada consulta y tratamiento, garantizando un
                mañana más brillante para nuestras adoradas mascotas.</p>
            <button class="botonInfo">Leer Más</button>
        </div>
    </div>
</template>

<style scoped >
.contenedor-footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
}

.contenedor-footer p {
    color: hsl(0, 0%, 100%);
    text-align: center;
    font-family: Montserrat;
    font-size: 27px;
    font-style: normal;
    font-weight: 800;
    line-height: 34px;

}

.footer-nosotros {
    margin: 0 auto;
    justify-content: center;
    display: flex;
    overflow: hidden;
    width: 60%;
    background-color: rgb(90, 15, 195, 86%);
    height: 300px;
    border-radius: 50px;
    margin-bottom: 100px;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.3);
}

.blur-shapes {
    left: 30;
    position: absolute;
    top: 30;
}

.ellipse {
    background: linear-gradient(180deg, rgb(90, 15, 195) 0%, rgb(90, 15, 195) 100%);
    border-radius: 164px/160px;
    filter: blur(267px);
    height: 320px;
    left: 1270px;
    position: absolute;
    top: 0;
    width: 328px;
}

.ellipse-2 {
    background: linear-gradient(180deg, rgb(90, 15, 195) 0%, rgb(90, 15, 195) 100%);
    border-radius: 164px/160px;
    filter: blur(267px);
    height: 320px;
    left: 0;
    position: absolute;
    top: 892px;
    width: 328px;
}

.ellipse-3 {
    background: linear-gradient(180deg, rgb(90, 15, 195) 0%, rgb(90, 15, 195) 100%);
    border-radius: 164px/160px;
    filter: blur(250px);
    height: 320px;
    left: 700px;
    position: absolute;
    top: 500px;
    width: 328px;
}

.botonInfo {
    margin: 10px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-style: none;
    background-color: #ffffff;
    color: #5a0fc3;
    border-radius: 10px;
    width: 300px;
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 1.6em;
    height: 60px;
    font-weight: 800;

}

.botonInfo:hover {
    transform: scale(0.9);
    background-color: #ebddff;
}

.nosotros {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: max-width;


}


.nosotros .contenido {
    align-items: center;
    display: inline-flex;
    flex-direction: column;
    height: 712px;
    justify-content: space-between;
    padding: 21px 0px;
    top: 169px;
}

.nosotros .texto-nosotros {
    color: #5a0fc3;
    font-family: "Montserrat-Bold", Helvetica;
    font-size: 5em;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 16px;
    position: relative;
    text-align: center;
    white-space: nowrap;
    width: fit-content;
}

.nosotros .contenedor-contenido {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
    padding: 0px 19px;
    position: relative;
    width: 1315px;
}

.nosotros .fondo-shape {
    height: 625px;
    object-fit: cover;
    position: relative;
    width: 621px;
}

.nosotros .flexcontainer {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 74px;
    width: 704px;
}

.nosotros .text {
    align-self: stretch;
    color: #5a0fc3;
    font-family: "Montserrat-Bold", Helvetica;
    font-size: 1.3em;
    font-weight: 700;
    line-height: 47.5px;
    position: relative;
}

.nosotros .text-wrapper {
    color: #5a0fc3;
    font-family: "Montserrat-Bold", Helvetica;
    font-size: 1.3em;
    letter-spacing: 0;
}

@media (max-width: 768px) {
    .botonInfo {
        width: 250px;
        font-weight: 800;
        
    }
    .footer-nosotros{
        margin-top: 10px;
        padding: 10px;
        height: 200px;
        width: 70%;
    }
    .contenedor-footer p{
        line-height: 16px;
        font-size: 15px;
        font-weight: bold;
    }
    .nosotros .contenido{
        height: 600px;
    }
    .footer-nosotros{
        margin-top: 40px;
        margin-bottom: 50px;
        border-radius: 40px;

    }
    .nosotros {
        padding: 0px;
        overflow-x: hidden;
        overflow-y: hidden;

    }
    .nosotros .texto-nosotros{
        font-size: 3em;

    }
    .nosotros .fondo-shape{
        margin-top: 40px;
        height: 300px;
        width: 300px;
    }
    .nosotros .text{
        text-align: center;
        font-size: 1.2em;
        line-height: 26px;
        font-weight: bold;
    }
    .nosotros .flexcontainer{
        gap: 20px;
        width: 400px;
    }
    .nosotros .contenedor-contenido{
        width: 1000px;
        display: flex;
        flex-direction: column;
    }
    .ellipse {
        filter: blur(100px);

        left: 50px;
        top: 800px;

        height: 200px;
        height: 100px;
    }

    .ellipse-2 {
        filter: blur(100px);

        height: 100px;
        width: 100px;
        top: 100px;
        left: 300px;
        position: absolute;
    }

    .ellipse-3 {
        height:100px;
        
        left: 400px;
        filter: blur(180px);
        position: unset;



    }

}</style>