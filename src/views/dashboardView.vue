<script setup>
    import menuDashboard from '../components/UI/menuDashboard.vue';
    import Mascotas from '../components/Mascotas.vue';
    import userAuth from '../components/auth/userAuth.vue';
    import RegistroMascota from '../components/RegistroMascota.vue';
</script>

<template>
    
    <div class="contenedor-principal">
        <userAuth/>

        <div class="contenedor-dashboard">
            <div class="menu-dashboard">
              
                    <menuDashboard/>

            </div>
            <div class="contenido-principal">
                <div class="registro-mascota">
                    <RegistroMascota/>
                </div>
                <!-- <div class="mascotas">
                <Mascotas/>
                </div> -->
            </div>
        </div>
    </div>
    
</template>


<style scoped>
    .contenedor-principal{
        margin: 2vh;
        overflow-y: hidden;

    }
    .contenedor-dashboard{
        padding: 10px;
        display: grid;
        grid-template-columns: 10% 90%;
        margin-top: 5vh;
        overflow: hidden;
    }
    .menu-dashboard{
        display: flex;
        align-items: center;
        text-align: left;
    }

    .contenido-principal{
        margin-top: 10vh;
        
    }

</style>