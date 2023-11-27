<script setup>
    import menuDashboard from '../components/UI/menuDashboard.vue';
    import Mascotas from '../components/Mascotas.vue';
    import userAuth from '../components/auth/userAuth.vue';
    import RegistroMascota from '../components/RegistroMascota.vue';
</script>

<template>
    
    <div class="contenedor-principal">
        
            <userAuth/>
            <button class="botonVolver"> Volver </button>
        
        <div class="contenedor-dashboard">
            <div class="menu-dashboard">
                    <div class="contenido-menu">

                        <menuDashboard/>
                    </div>

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
    .header{
        display: flex;
        justify-content: right;
        align-items: right;
        flex-direction: column;
    }
    .contenedor-principal{
        margin-left: 5vh;
        margin-right: 5vh;
        /* overflow-y: hidden; */
    }
    .contenedor-dashboard{

        padding: 10px;
        display: grid;
        grid-template-columns: 10% 90%;
        
        /* overflow: hidden; */
        height: 70vh;
    }
    .botonVolver{
        margin-right: 5vh;
        
        float: right;
        font-size: 1.2em;
        padding:10px;
        border-style: none;
        background-color: #5a0fc3;
        color: white;
        border-radius: 20px;
        width: 8em;
        transition: all 0.2s ease;
        cursor: pointer;

    }
    .botonVolver:hover{
        transform: scale(0.9); 
        background-color: #6413d7;
    }
    
    .menu-dashboard{
        /* overflow-y: hidden; */
        display: flex;
        align-items: center;
        text-align: left;
        height: 70vh;
        
    }
    .contenido-menu{
        /* overflow-y: hidden; */
        position: absolute;
    }

    .contenido-principal{
        margin-top: 10vh;

    }

</style>