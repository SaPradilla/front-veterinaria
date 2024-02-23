<script setup>
import { RouterLink, RouterView } from 'vue-router'

import HeaderVue from '../components/UI/Header.vue'
import Inicio from '../components/Inicio/Inicio.vue'
import Nosotros from '../components/Inicio/Nosotros.vue';
import Servicios from '../components/Inicio/Servicios.vue';
import Testimonios from '../components/Inicio/Testimonios.vue';
import Contacto from '../components/Inicio/Contacto.vue';
import Footer from '../components/Inicio/Footer.vue'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/auth';
import { useInicio } from '../stores/inicio';
// stores
const Auth = useAuthStore()
const InicioStore = useInicio()
// States


onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  Auth.ObtenerToken()
})

// Metodos
const handleScroll = () => {
  // console.log(window.scrollY)
  if (window.scrollY > 900) {
    InicioStore.scrolled = true;
  } else {
    InicioStore.scrolled = false;
  }
}

</script>

<template>
  <div class="contenedor-inicio">
    <div class="header">
      <HeaderVue />
    </div>
    <div class="inicio-component" id="inicio">
      <Inicio />
    </div>
    <div class="nosotros-component" id="nosotros">
      <Nosotros />

    </div>
    <Servicios id="servicios" />

    <div class="testimonios-component" id="testimonios">
      <Testimonios />
    </div> 
    <div class="contacto-component" id="contacto">
      <Contacto/>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>
div.header {
  z-index: 1000;
  top: 0;
  position: sticky;
}

.contenedor-inicio{

}
.inicio-component,
.nosotros-component,
.testimonios-component,
.contacto-component{
  width: 60%;
  margin: 0 auto;

}

@media (max-width: 768px) {
  .inicio-component,
  .nosotros-component,
  .testimonios-component,
  .contacto-component{
    width: 100%;
    margin: 0 auto;
  }
}
</style>
