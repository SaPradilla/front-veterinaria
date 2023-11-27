<script setup>
  import {RouterView} from 'vue-router'
</script>

<template>
  <div class="contenedor">

    <RouterView/>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .contenedor{
    height: 100%;
    overflow-x: hidden;
    
  }
}
</style>
