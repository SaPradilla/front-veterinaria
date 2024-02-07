<script setup>
import Button from 'primevue/button';
</script>

<template>

    <div class="contenedor-perfil">
        <div class="info-perfil">
            <div class="foto-perfil"></div>
            <div class="content-perfil">
                <div class="nombres">
                    <p class="nombre"></p>
                    <p class="apellido"></p>
                </div>
                <div class="editar-perfil">
                    <Button label="Editar Perfil" severity="secondary" rounded />
                </div>
            </div>
            
        </div>
    </div>
</template>

<style scoped>

.contenido-perfil{
    width: 100%;
    height: 100%;
}
</style>