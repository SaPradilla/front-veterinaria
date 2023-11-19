<script setup>

</script>

<template>
    <div class="servicios">


        <div class="overlap-group">
            <h1 class="text-tittle">Nuestros Servicios</h1>

            <div class="content-services">

                <div class="services-cols">
                    <div class="service-1 service">
                        <img class="citas-icon" alt="Citas icon" src="../assets/img/citas-icon.png" />
                        <h2 class="text-service">Consultas</h2>
                    </div>
                    <div class="service-2 service">
                        <img class="guarderia-icon" alt="Guarderia icon" src="../assets/img/guarderia-icon.png" />
                        <h2 class="text-service">Guarderia</h2>
                    </div>
                    <div class="service-3 service">
                        <img class="perro-icon" alt="Perro icon" src="../assets/img/perro-icon.png" />
                        <h2 class="text-service">Estetica</h2>
                    </div>

                </div>
                <div class="services-cols">
                    <div class="service-1 service">
                        <img class="cirugia-icon" alt="Cirugia icon" src="../assets/img/cirugia-icon.png" />
                        <h2 class="text-service">Cirugias</h2>
                    </div>
                    <div class="service-2 service">
                        <img class="urgencia-icon" alt="Urgencia icon" src="../assets/img/urgencia-icon.png" />
                        <h2 class="text-service">Urgencias</h2>
                    </div>
                    <div class="service-3 service">
                        <img class="funeraria-icon" alt="Funeraria icon" src="../assets/img/funeraria-icon.png" />
                        <h2 class="text-service">Funebres</h2>
                    </div>
                </div>
            </div>


        </div>

    </div>
</template>

<style scoped>
/* Contenedor principal */
.servicios {
    overflow: hidden;
    width: 100%;
    height: 100vh;
}

/* Contenedor */

/* Imagen de fondo */
.servicios .overlap-group {
    background-image: url(../assets/img/fondo-imagen.png);
    background-size: 100% 100%;
    position: relative;
    height: 100%;
}

/* Titulo  */
h1.text-tittle {
    color: #ffffff;
    font-family: "Montserrat-Medium", Helvetica;
    font-size: 64px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10vh;
}


/* Padre de servicios */
.content-services {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 300px;

}

/* Contenedor de servicios */
.services-cols {
    display: flex;
    gap: 100px;
}

/* Servicio */
.service {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* Texto de servicio */
.servicios .text-service {
    color: #ffffff;
    font-family: "Montserrat-Light", Helvetica;
    font-size: 60px;
    font-weight: 300;
    height: 1px;
    left: 0;
    letter-spacing: 0;


    text-align: center;
    top: 164px;
    white-space: nowrap;
    width: 328px;
}

/* tamaño icons */
.servicios .citas-icon {
    height: 134px;
    width: 153px;
}

.servicios .guarderia-icon {
    height: 133px;

    width: 118px;
}

.servicios .perro-icon {
    height: 184px;
    width: 123px;
}

.servicios .cirugia-icon {
    height: 146px;
    width: 146px;
}

.servicios .urgencia-icon {
    height: 157px;
    width: 157px;
}

.servicios .funeraria-icon {
    height: 127px;
    width: 127px;
}

/* Hover servicios */
.service:hover {
    cursor: pointer;
    transform: scale(0.9);
    transition: all 0.2s ease;

}
@media (max-width: 768px) {
    h1.text-tittle {
        margin-bottom: 20vh;
    }

    .content-services {

        gap: 40px;
    }

    .service {
        width: 30px;
    }

    .services-cols {
        gap: 10vhpx;
    }

    .servicios .citas-icon,
    .servicios .guarderia-icon,
    .servicios .perro-icon,
    .servicios .cirugia-icon,
    .servicios .urgencia-icon,
    .servicios .funeraria-icon {
        height: 60px;
        width: 60px;
    }

    .servicios .text-service {
        font-size: 20px;

    }
}</style>