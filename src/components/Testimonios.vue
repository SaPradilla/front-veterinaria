<script setup>

</script>

<template>
  <div>
    <div class="testimonios">
      <div class="overlap-wrapper">
        <div class="overlap">
          <div class="blur-shapes">
            <div class="ellipse"></div>
            <div class="ellipse1"></div>
          </div>
          <div class="contenedor">
            <div class="text-wrapper">TESTIMONIOS</div>
            <hr>
            <div class="contenedor-testi">

              <div class="card">
                <div class="contenido-card">
                  <div class="imagenes-perfil">

                    <img class="perfiles" alt="María R" src="../assets/img/cara2.jpg" />

                  </div>
                  <div class="title">María R</div>
                  <p class="message">
                    Pelitos es el lugar perfecto para cuidar a nuestras mascotas. Siempre se preocupan por el bienestar
                    de nuestros peludos amigos. ¡Gracias por ser tan atentos y profesionales!
                  </p>
                </div>
              </div>

              <div class="card">
                <div class="div">
                  <div class="imagenes-perfil">

                    <img class="perfiles" alt="Juan P." src="../assets/img/cara1.jfif" />

                  </div>
                  <div class="title">Juan P.</div>
                  <p class="message">
                    Llevo a mi perro a Pelitos desde que era un cachorro, y siempre he recibido un servicio excepcional.
                    El equipo de veterinarios se preocupa realmente por los animales y su salud.
                  </p>
                </div>
              </div>

              <div class="card">
                <div class="contenido-card-2">
                  <div class="imagenes-perfil">
                    <img class="perfiles" alt="Carolina D" src="../assets/img/cara3.jpg" />
                  </div>
                  <div class="title">Carolina D</div>
                  <p class="message">
                    Siempre me siento bienvenida en Pelitos. Los veterinarios son apasionados por lo que hacen, y eso se
                    nota en la atención que brindan a mis mascotas.
                  </p>
                </div>
              </div>

              <div class="card">
                <div class="div">
                  <div class="imagenes-perfil">
                    <img class="perfiles" alt="Ana M" src="../assets/img/cara4.jpg" />
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
  </div>
</template>


<style scoped>
.testimonios {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;

}

.testimonios .overlap-wrapper {
  background-color: #ffffff;
  height: 1024px;
  width: 1920px;
}

.testimonios .overlap {
  height: 997px;
  left: 168px;
  position: relative;
  top: 21px;
  width: 1472px;
}

.testimonios .blur-shapes {
  height: 997px;
  left: 0;
  position: absolute;
  top: 0;
  width: 1472px;
}

.testimonios .ellipse {
  background: linear-gradient(180deg, rgba(90, 15, 195, 0.37) 0%, rgb(90, 15, 195) 100%);
  border-radius: 164px/160px;
  filter: blur(200px);
  height: 320px;
  left: 15px;
  position: absolute;
  top: 16px;
  transform: rotate(5.86deg);
  width: 328px;
}
.testimonios .ellipse1 {
  background: linear-gradient(180deg, rgba(90, 15, 195, 0.37) 0%, rgb(90, 15, 195) 100%);
  border-radius: 14px/160px;
  filter: blur(160px);
  height: 500px;
  left: 900px;
  position: absolute;
  top: 400px;
  transform: rotate(5.86deg);
  width: 108px;
}

.testimonios .img {
  height: 565px;
  left: 920px;
  position: absolute;
  top: 438px;
  width: 808px;
}

.testimonios .contenedor {
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  height: 623px;
  justify-content: space-between;
  left: 239px;
  position: absolute;
  top: 180px;
}

.testimonios .text-wrapper {
  color: #5a0fc3;
  font-family: "Montserrat-Bold", Helvetica;
  font-size: 64px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 16px;
  margin-top: -1px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.testimonios hr {
  height: 15px;
  border-style: none;
  border-radius: 10px;
  background-color: #5a0fc3;
  position: relative;
  width: 345px;
}

.testimonios .contenedor-testi {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 50px;
  position: relative;
}

.testimonios .card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 15px #00000040;
  height: 483px;
  position: relative;
  width: 239px;
}

.testimonios .contenido-card {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 57px;
  height: 410px;
  justify-content: center;
  left: 20px;
  position: relative;
  top: 17px;
  width: 191px;
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
  font-family: var(--h3-font-family);
  font-size: var(--h3-font-size);
  font-style: var(--h3-font-style);
  font-weight: var(--h3-font-weight);
  letter-spacing: var(--h3-letter-spacing);
  line-height: var(--h3-line-height);
  position: relative;
  text-align: center;
}

.testimonios .message {
  align-self: stretch;
  color: #000000;
  font-family: var(--body-font-family);
  font-size: var(--body-font-size);
  font-style: var(--body-font-style);
  font-weight: var(--body-font-weight);
  letter-spacing: var(--body-letter-spacing);
  line-height: var(--body-line-height);
  position: relative;
  text-align: center;
}

.testimonios .div {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 57px;
  height: 386px;
  justify-content: center;
  left: 20px;
  position: relative;
  top: 29px;
  width: 191px;
}


.testimonios .contenido-card-2 {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 57px;
  height: 362px;
  justify-content: center;
  left: 20px;
  position: relative;
  top: 41px;
  width: 191px;
}
</style>