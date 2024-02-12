<script setup>

</script>

<template>
  <div class="testimonios">

    <div class="container-testimonios">
      <div class="contenedor">
        <div class="text-wrapper">TESTIMONIOS</div>
        <hr>

        <div class="contenedor-testi">

          <div class="cards">
            <!-- Carta 1 -->
            <div class="card">

              <div class="contenido-card">

                <div class="imagenes-perfil">
                  <img class="perfiles" alt="María R" src="../../assets/img/cara2.jpg" />
                </div>

                <div class="title">María R</div>
                <p class="message">
                  Pelitos es el lugar perfecto para cuidar a nuestras mascotas. Siempre se preocupan por el bienestar
                  de nuestros peludos amigos. ¡Gracias por ser tan atentos y profesionales!
                </p>

              </div>

            </div>
            <!-- Carta 2 -->
            <div class="card">

              <div class="contenido-card">

                <div class="imagenes-perfil">
                  <img class="perfiles" alt="Juan P." src="../../assets/img/cara1.jfif" />
                </div>

                <div class="title">Juan P.</div>

                <p class="message">
                  Llevo a mi perro a Pelitos desde que era un cachorro, y siempre he recibido un servicio excepcional.
                  El equipo de veterinarios se preocupa realmente por los animales y su salud.
                </p>

              </div>
            </div>
            <!-- Carta 3 -->
            <div class="card">

              <div class="contenido-card">

                <div class="imagenes-perfil">
                  <img class="perfiles" alt="Carolina D" src="../../assets/img/cara3.jpg" />
                </div>

                <div class="title">Carolina D</div>

                <p class="message">
                  Siempre me siento bienvenida en Pelitos. Los veterinarios son apasionados por lo que hacen, y eso se
                  nota en la atención que brindan a mis mascotas.
                </p>

              </div>

              </div>
            <!-- Carta 4 -->
            <div class="card">

              <div class="contenido-card">

                <div class="imagenes-perfil">
                  <img class="perfiles" alt="Ana M" src="../../assets/img/cara4.jpg" />
                </div>

                <div class="title">Ana M</div>

                <p class="message">
                  El equipo de Pelitos es tan amable y comprensivo. Siempre están dispuestos a responder a todas mis
                  preguntas y preocupaciones sobre la salud de mis animales.
                </p>

              </div>

              </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>


<style scoped>
.testimonios {
  width: 100%;
  margin-top: 10vh;
}
.testimonios .container-testimonios {
  background-color: #ffffff;
  width: 100%;

}
.testimonios .contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 60px;
}

.testimonios .text-wrapper {
  color: var(--color-morado-general);
  font-size: clamp(2.4em,5vw,4em);
  font-weight: 700;
  text-align: center;
  width: fit-content;
}

.testimonios hr {
  height: 3px;
  border-style: none;
  border-radius: 10px;
  background-color: var(--color-morado-general);
  position: relative;
  width: 345px;
}

.testimonios .contenedor-testi {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
  width: 100%;
}

.testimonios .cards {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  gap: 50px;
  margin: 0 auto;
  /* height: 100%; */
  place-items: center;
} 
.testimonios .card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 15px #00000040;
  height: 400px;
  position: relative;
  width: 239px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.testimonios .contenido-card {
  display: flex;
  flex-direction: column;
  gap: 57px;
  height: max-content;
  justify-content: space-evenly;
  align-items: center;

}

.testimonios .card:hover {
  cursor: pointer;
  transform: translateY(-3px);
  transition: all 0.2s ease;
}

.testimonios .imagenes-perfil {
  height: max-content;
  width: max-content;

}

.testimonios .perfiles {
  height: 70px;
  width: 70px;
  border-radius: 40px;
  margin: 0 auto;
}

.testimonios .title {
  align-self: stretch;
  color: #000000;
  font-weight: 800;
  position: relative;
  text-align: center;
  font-size: clamp(0.5em,10vw,1em);
}

.testimonios .message {
  align-self: stretch;
  color: #000000;
  position: relative;
  text-align: center;
}


@media (max-width: 768px) {
  .testimonios hr {
    width: 200px;
  }
  /* 
  .testimonios .contenedor {
    gap: 30px;
  }

  .testimonios .cards {
    display: unset;
  }

  .testimonios .card {
    height: 250px;
    width: 140px;
  }

  .testimonios .contenido-card {
    gap: 10px;
    top: 1px;
    height: 200px;
    width: 140px;
    left: 0;

  }
  */

  .testimonios .perfiles {
    height: 60px;
    width: 60px;
  }
}
</style>