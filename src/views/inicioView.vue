<script setup>
  import {RouterLink,RouterView} from 'vue-router'
  import HeaderVue from '../components/Header.vue'
  import Inicio from '../components/Inicio.Vue';
  import Nosotros from '../components/Nosotros.vue';
  import Servicios from '../components/Servicios.vue';
  import Testimonios from '../components/Testimonios.vue';
</script>

<template>
  <div class="header">
    <HeaderVue/>
  </div>
  <Inicio/>
  <div class="nosotros" id="nosotros">
    <Nosotros/>
  </div>
  <div class="servicios" id="servicios">
    <Servicios/>
  </div>
  <div class="testimonios" id="testimonios">
    <Testimonios/>
  </div>
</template>

<style scoped>

  div.header{
    z-index: 1000;
    top: 0;
    position: sticky;
  }
</style>
