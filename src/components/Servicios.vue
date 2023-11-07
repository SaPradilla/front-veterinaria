<script setup>

</script>

<template>
    <div class="servicios">

        <div class="overlap-group-wrapper">
            <div class="overlap-group">
                <div class="text-wrapper-7">Nuestros Servicios</div>
                <div class="frame">
                    <div class="ser">
                        <div class="text-wrapper">Consultas</div>
                        <img class="citas-icon" alt="Citas icon" src="../assets/img/citas-icon.png" />
                    </div>
                    <div class="div">
                        <div class="text-wrapper-2">Guarderia</div>
                        <img class="guarderia-icon" alt="Guarderia icon" src="../assets/img/guarderia-icon.png" />
                    </div>
                    <div class="ser-2">
                        <div class="text-wrapper-3">Estetica</div>
                        <img class="perro-icon" alt="Perro icon" src="../assets/img/perro-icon.png" />
                    </div>
                    <div class="ser-3">
                        <div class="text-wrapper-4">Cirugias</div>
                        <img class="cirugia-icon" alt="Cirugia icon" src="../assets/img/cirugia-icon.png" />
                    </div>
                    <div class="ser-4">
                        <img class="urgencia-icon" alt="Urgencia icon" src="../assets/img/urgencia-icon.png" />
                        <div class="text-wrapper-5">Urgencias</div>
                    </div>
                    <div class="ser-5">
                        <img class="funeraria-icon" alt="Funeraria icon" src="../assets/img/funeraria-icon.png" />
                        <div class="text-wrapper-6">Funebres</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.frame div:hover {
    cursor: pointer;
    transform: scale(0.9);
}

.frame div:hover {
    transition: all 0.2s ease;

}

.servicios {
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 130vh;
    overflow-y: hidden;

}

.servicios .overlap-group-wrapper {
    height: 130vh;
    width: 1920px;
}

.servicios .overlap-group {
    background-image: url(../assets/img/fondo-imagen.png);
    background-size: 100% 100%;
    height: 130vh;

    position: relative;
}

.servicios .frame {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 74px 100px;
    height: 562px;
    justify-content: center;
    left: 308px;
    position: absolute;
    top: 231px;
    width: 1304px;
}

.servicios .ser {
    height: 178px;
    position: relative;
    width: 330px;
}

.servicios .text-wrapper {
    color: #ffffff;
    font-family: "Montserrat-Light", Helvetica;
    font-size: 60px;
    font-weight: 300;
    height: 14px;
    left: 0;
    letter-spacing: 0;
    line-height: 16px;
    position: absolute;
    text-align: center;
    top: 164px;
    white-space: nowrap;
    width: 328px;
}

.servicios .citas-icon {
    height: 134px;
    left: 87px;
    position: absolute;
    top: -2px;
    width: 153px;
}

.servicios .div {
    height: 186.39px;
    position: relative;
    width: 336px;
}

.servicios .text-wrapper-2 {
    color: #ffffff;
    font-family: "Montserrat-Light", Helvetica;
    font-size: 60px;
    font-weight: 300;
    height: 20px;
    left: 0;
    letter-spacing: 0;
    line-height: 16px;
    position: absolute;
    text-align: center;
    top: 166px;
    width: 334px;
}

.servicios .guarderia-icon {
    height: 133px;
    left: 108px;
    position: absolute;
    top: -2px;
    width: 118px;
}

.servicios .ser-2 {
    height: 226px;
    position: relative;
    width: 280px;
}

.servicios .text-wrapper-3 {
    color: #ffffff;
    font-family: "Montserrat-Light", Helvetica;
    font-size: 60px;
    font-weight: 300;
    height: 20px;
    left: 0;
    letter-spacing: 0;
    line-height: 16px;
    position: absolute;
    text-align: center;
    top: 206px;
    width: 278px;
}

.servicios .perro-icon {
    height: 184px;
    left: 95px;
    position: absolute;
    top: 0;
    width: 123px;
}

.servicios .ser-3 {
    height: 196px;
    position: relative;
    width: 383px;
}

.servicios .text-wrapper-4 {
    color: #ffffff;
    font-family: "Montserrat-Light", Helvetica;
    font-size: 64px;
    font-weight: 300;
    height: 23px;
    left: 0;
    letter-spacing: 0;
    line-height: 16px;
    position: absolute;
    text-align: center;
    top: 173px;
    width: 381px;
}

.servicios .cirugia-icon {
    height: 146px;
    left: 117px;
    position: absolute;
    top: 0;
    width: 146px;
}

.servicios .ser-4 {
    height: 202px;
    position: relative;
    width: 383px;
}

.servicios .urgencia-icon {
    height: 157px;
    left: 111px;
    position: absolute;
    top: 0;
    width: 157px;
}

.servicios .text-wrapper-5 {
    color: #ffffff;
    font-family: "Montserrat-Light", Helvetica;
    font-size: 64px;
    font-weight: 300;
    height: 23px;
    left: 0;
    letter-spacing: 0;
    line-height: 16px;
    position: absolute;
    text-align: center;
    top: 179px;
    width: 381px;
}

.servicios .ser-5 {
    height: 187px;
    position: relative;
    width: 383px;
}

.servicios .funeraria-icon {
    height: 127px;
    left: 118px;
    position: absolute;
    top: 0;
    width: 127px;
}

.servicios .text-wrapper-6 {
    color: #ffffff;
    font-family: "Montserrat-Light", Helvetica;
    font-size: 64px;
    font-weight: 300;
    height: 23px;
    left: 0;
    letter-spacing: 0;
    line-height: 16px;
    position: absolute;
    text-align: center;
    top: 164px;
    width: 381px;
}

.servicios .text-wrapper-7 {
    color: #ffffff;
    font-family: "Montserrat-Medium", Helvetica;
    font-size: 64px;
    font-weight: 500;
    height: 16px;
    left: 662px;
    letter-spacing: 0;
    line-height: 16px;
    position: absolute;
    text-align: center;
    top: 64px;
    white-space: nowrap;
}

@media (max-width: 768px) {
    .servicios {
        overflow-x: hidden;
    }

    .servicios .text-wrapper-7 {
        font-size: 40px;
        left: unset;
        text-align: center;
        font-weight: 800;
        top: 20px;
        position: relative;

    }

    .servicios .overlap-group-wrapper {
        height: 100vh;
        width: 100%;
    }

    .servicios .overlap-group {
        background-size: auto;
        /* background-size: contain; */
        background-repeat: no-repeat;
        background-position-x: center;
        height: 130vh;
        width: 100%;
    }
    .servicios .frame {
        gap: 10px;
        height: 10px;
        left: 10px;
        top: 10px;

    }
}</style>