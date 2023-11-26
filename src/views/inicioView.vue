<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderVue from '../components/Header.vue'
import Inicio from '/workspaces/front-veterinaria/src/components/Inicio.vue';
import Nosotros from '../components/Nosotros.vue';
import Servicios from '../components/Servicios.vue';
import Testimonios from '../components/Testimonios.vue';
import { onMounted, ref } from 'vue'

// States
const scrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
})

// Metodos
const handleScroll = () => {
  // console.log(window.scrollY)
  if (window.scrollY > 900) {
    scrolled.value = true;
  } else {
    scrolled.value = false;
  }
}

</script>

<template>
  <div class="contenedor-inicio">
    <div class="header">
      <HeaderVue :scrolled="{ 'scrolled': scrolled }" />
    </div>
    <Inicio />
    <div class="nosotros" id="nosotros">
      <Nosotros />
    </div>
    <div class="servicios" id="servicios">
      <Servicios />
    </div>
    <div class="testimonios" id="testimonios">
      <Testimonios />
    </div>
  </div>
</template>

<style scoped>
div.header {
  z-index: 1000;
  top: 0;
  position: sticky;
}

@media (max-width: 768px) {
  .contenedor-inicio{
    overflow-x: hidden;
  }
}
</style>
