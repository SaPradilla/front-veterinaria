<script setup>

</script>

<template>
    <div class="servicios" id="">


        <div class="overlap-group">
            
            <h1 class="text-tittle">Nuestros Servicios</h1>

        
            <div class="services-cols">
                <div class="service-1 service">
                    <img class="citas-icon" alt="Citas icon" src="../../assets/img/citas-icon.png" />
                    <h2 class="text-service">Consultas</h2>
                </div>
                <div class="service-2 service">
                    <img class="guarderia-icon" alt="Guarderia icon" src="../../assets/img/guarderia-icon.png" />
                    <h2 class="text-service">Guarderia</h2>
                </div>
                <div class="service-3 service">
                    <img class="perro-icon" alt="Perro icon" src="../../assets/img/perro-icon.png" />
                    <h2 class="text-service">Estetica</h2>
                </div>
            </div>

            <div class="services-cols">

                <div class="service-1 service">
                    <img class="cirugia-icon" alt="Cirugia icon" src="../../assets/img/cirugia-icon.png" />
                    <h2 class="text-service">Cirugias</h2>
                </div>
                <div class="service-2 service">
                    <img class="urgencia-icon" alt="Urgencia icon" src="../../assets/img/urgencia-icon.png" />
                    <h2 class="text-service">Urgencias</h2>
                </div>
                <div class="service-3 service">
                    <img class="funeraria-icon" alt="Funeraria icon" src="../../assets/img/funeraria-icon.png" />
                    <h2 class="text-service">Funebres</h2>
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
    height: max-content;
}

/* Contenedor */

/* Imagen de fondo */
.servicios .overlap-group {
    background-image: url(../../assets/img/fondo-imagen.png);
    /* background-size: 100% 100%; */
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    padding: 40px;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* Titulo  */
h1.text-tittle {
    color: #ffffff;
    font-family: "Montserrat-Medium", Helvetica;
    font-size: clamp(1em,10vw,3em);
    font-weight: 600;
    text-align: center;
    margin-bottom: 10vh;
}


/* Contenedor de servicios */
.services-cols {
    display: grid;
    place-items: center;
    width: 100%;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
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
    font-size: clamp(1em,10vw,3em);
    font-weight: 600;
    text-align: center;
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
        /* margin-bottom: 20vh; */
    }

    .servicios .citas-icon,
    .servicios .guarderia-icon,
    .servicios .perro-icon,
    .servicios .cirugia-icon,
    .servicios .urgencia-icon,
    .servicios .funeraria-icon {
        height: 80px;
        width: 80px;
    }
    .servicios .overlap-group{
        background-position: center;

    }
}
</style>