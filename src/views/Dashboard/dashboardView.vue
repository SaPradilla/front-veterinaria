<script setup>
import menuDashboard from '../../components/UI/menuDashboard.vue';
import userAuth from '../../components/auth/userAuth.vue';
</script>

<template>

    <!-- <div class="contenedor-principal">

        <div class="menu-dashboard">
            <div class="contenido-menu">
                <menuDashboard />
            </div>
        </div>

        <div class="user">
            <userAuth />
        </div>
        
        <div class="contenedor-dashboard">
            <div class=""></div>
            <div class="contenido-principal">
                Dashboard
                <RouterView />
            </div>

        </div>
    </div> -->
    DASHBOARD
</template>


<style scoped>

.user {

    width: 100%;
    position: fixed;


}


h1 {
    text-align: center;
    color: var(--color-morado-general);
    font-size: 2.4em;
    font-weight: bold;
}

.header {
    position: fixed;
    top: 0;
    right:0;

}
.contenedor-principal {
    
    background-color: #F4F6FA;
    height: 100vh;
    /* width: 100%; */
    /* overflow-y: hidden; */
}

.contenedor-dashboard {

    padding: 10px;
    display: grid;
    grid-template-columns: 10% 90%;
    height: 80vh;
}

.menu-dashboard {
    /* background-color: var(--color-morado-general); */

    background-color: white;
	box-shadow: 0px 2px 4px -3px rgba(0,0,0,0.4);
    position: fixed;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;

}

.contenido-menu {
    /* overflow-y: hidden; */
    /* position: relative; */
}

.contenido-principal {
    margin-top: 20vh;
}


.registro-mascota {
    /* margin: 0 auto; */
    display: flex;
    flex-direction: column;
    gap: 6vh;
    justify-content: center;
    align-items: center;

}

.mascotas {
    /* overflow-y: scroll; */

	border-radius: 5px;
	padding: 40px;

}
</style>