<script setup>

    import { useRoute } from 'vue-router';
    import { useAdmin } from '../../stores/admin';

    const route = useRoute()

    const Admin = useAdmin()


</script>

<template>
    <div class="contenedor-menu">
        
        <div class="menu dashboard"
            @click="Admin.handleDashboard"
            :class="route.name === 'dashboard' ? 'seleccionado' : '' "
        >
            <svg class="icons iconDashboard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                    d="M9 21H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2zm6 0h4c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2zm6-13V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2z" />
            </svg>
            <h1> Dashboard</h1>
        </div>
        <div class="menu mascota"
            @click="Admin.handleMascota"
            :class=" route.name === 'mascotas' ||  route.name === 'registro-mascota' ||  route.name === 'editar-mascota' ? 'seleccionado' : '' "
        >
            <svg class="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M490.39 182.75c-5.55-13.19-14.77-22.7-26.67-27.49l-.16-.06a46.46 46.46 0 0 0-17-3.2h-.64c-27.24.41-55.05 23.56-69.19 57.61c-10.37 24.9-11.56 51.68-3.18 71.64c5.54 13.2 14.78 22.71 26.73 27.5l.13.05a46.53 46.53 0 0 0 17 3.2c27.5 0 55.6-23.15 70-57.65c10.24-24.87 11.37-51.63 2.98-71.6ZM381.55 329.61c-15.71-9.44-30.56-18.37-40.26-34.41C314.53 250.8 298.37 224 256 224s-58.57 26.8-85.39 71.2c-9.72 16.06-24.6 25-40.36 34.48c-18.07 10.86-36.74 22.08-44.8 44.16a66.93 66.93 0 0 0-4.65 25c0 35.95 28 65.2 62.4 65.2c17.75 0 36.64-6.15 56.63-12.66c19.22-6.26 39.09-12.73 56.27-12.73s37 6.47 56.15 12.73C332.2 457.85 351 464 368.8 464c34.35 0 62.3-29.25 62.3-65.2a67 67 0 0 0-4.75-25c-8.06-22.1-26.74-33.33-44.8-44.19ZM150 188.85c11.9 14.93 27 23.15 42.52 23.15a42.88 42.88 0 0 0 6.33-.47c32.37-4.76 52.54-44.26 45.92-90C242 102.3 234.6 84.39 224 71.11C212.12 56.21 197 48 181.49 48a42.88 42.88 0 0 0-6.33.47c-32.37 4.76-52.54 44.26-45.92 90c2.76 19.2 10.16 37.09 20.76 50.38Zm163.16 22.68a42.88 42.88 0 0 0 6.33.47c15.53 0 30.62-8.22 42.52-23.15c10.59-13.29 17.95-31.18 20.75-50.4c6.62-45.72-13.55-85.22-45.92-90a42.88 42.88 0 0 0-6.33-.47C315 48 299.88 56.21 288 71.11c-10.6 13.28-18 31.19-20.76 50.44c-6.62 45.72 13.55 85.22 45.92 89.98ZM111.59 308.8l.14-.05c11.93-4.79 21.16-14.29 26.69-27.48c8.38-20 7.2-46.75-3.15-71.65C120.94 175.16 92.85 152 65.38 152a46.4 46.4 0 0 0-17 3.2l-.14.05c-11.9 4.75-21.13 14.29-26.66 27.48c-8.38 20-7.2 46.75 3.15 71.65C39.06 288.84 67.15 312 94.62 312a46.4 46.4 0 0 0 16.97-3.2Z" />
            </svg>
            <h1>Mascotas</h1>
        </div>
        <div class="menu empleado"
        @click="Admin.handleEmpleado"
        :class=" route.name === 'empleados' || route.name === 'empleado'  || route.name === 'editar-empleado' || route.name === 'registro-empleado'  ? 'seleccionado' : '' "
        >
            <svg class="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 51">
                <path
                    d="M25.5 0C11.3985 0 0 11.475 0 25.5C0 32.263 2.6866 38.749 7.46878 43.5312C9.83667 45.8991 12.6478 47.7774 15.7416 49.0589C18.8354 50.3404 22.1513 51 25.5 51C32.263 51 38.749 48.3134 43.5312 43.5312C48.3134 38.749 51 32.263 51 25.5C51 22.1513 50.3404 18.8354 49.0589 15.7416C47.7774 12.6478 45.8991 9.83667 43.5312 7.46878C41.1633 5.10088 38.3522 3.22257 35.2584 1.94107C32.1646 0.659577 28.8487 0 25.5 0ZM34.68 16.167C37.4085 16.167 39.6015 18.36 39.6015 21.0885C39.6015 23.817 37.4085 26.01 34.68 26.01C33.3747 26.01 32.1229 25.4915 31.2 24.5685C30.277 23.6456 29.7585 22.3938 29.7585 21.0885C29.733 18.36 31.9515 16.167 34.68 16.167ZM19.38 12.138C22.695 12.138 25.398 14.841 25.398 18.156C25.398 21.471 22.695 24.225 19.38 24.225C16.065 24.225 13.362 21.471 13.362 18.156C13.362 14.8155 16.0395 12.138 19.38 12.138ZM19.38 35.4195V44.982C13.26 43.0695 8.415 38.352 6.273 32.334C8.925 29.478 15.6315 28.05 19.38 28.05C20.7315 28.05 22.44 28.2285 24.225 28.5855C20.043 30.804 19.38 33.7365 19.38 35.4195ZM25.5 45.9C24.786 45.9 24.123 45.9 23.46 45.798V35.4195C23.46 31.7985 30.957 29.988 34.68 29.988C37.4085 29.988 42.075 30.9825 44.472 32.9205C41.4885 40.494 34.119 45.9 25.5 45.9Z" />
            </svg>
            <h1>Empleados</h1>
        </div>
        <div class="menu cirugia"
        @click="Admin.handleCirugia"
        :class=" route.name === 'cirugias'  ? 'seleccionado' : '' "
        >
            <svg class="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 66">
                <path
                    d="M22.3929 44H12.2143V33H22.3929V23.8333H34.6071V33H44.7857V44H34.6071V53.1667H22.3929V44ZM57 18.3333V58.6667C57 62.7 53.3357 66 48.8571 66H8.14286C3.66429 66 0 62.7 0 58.6667V18.3333C0 14.3 3.66429 11 8.14286 11H48.8571C53.3357 11 57 14.3 57 18.3333ZM48.8571 18.3333H8.14286V58.6667H48.8571V18.3333ZM52.9286 0H4.07143V7.33333H52.9286V0Z" />
            </svg>
            <h1>Cirugias</h1>
        </div>
        <div class="menu tienda"
        @click="Admin.handleTienda"
        :class=" route.name === 'tiendas'  ? 'seleccionado' : '' "

        >
            <svg class="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <path
                    d="M6.12444 5.77778H45.8467L43.1311 2.88889H8.46444L6.12444 5.77778ZM50.6711 6.44222C51.5089 7.42444 52 8.66667 52 10.1111V46.2222C52 47.7546 51.3913 49.2242 50.3077 50.3077C49.2242 51.3913 47.7546 52 46.2222 52H5.77778C4.24542 52 2.77582 51.3913 1.69227 50.3077C0.608728 49.2242 0 47.7546 0 46.2222V10.1111C0 8.66667 0.491111 7.42444 1.32889 6.44222L5.31556 1.58889C6.12444 0.606667 7.30889 0 8.66667 0H43.3333C44.6911 0 45.8756 0.606667 46.6556 1.58889L50.6711 6.44222ZM8.66667 43.3333H26V34.6667H8.66667V43.3333Z" />
            </svg>
            <h1>Tienda</h1>
        </div>

        <div class="menu tienda"
        @click="Admin.handlCitas"
        :class=" route.name === 'citas'  ? 'seleccionado' : '' "

        >
        <svg  class="icons cita" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path  d="M12 14.154q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.539q-.23.23-.54.23Zm-4 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.539q-.23.23-.54.23Zm8 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.539q-.23.23-.54.23ZM12 18q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.54Q12.31 18 12 18Zm-4 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.54Q8.31 18 8 18Zm8 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.54Q16.31 18 16 18ZM5.615 21q-.69 0-1.152-.462Q4 20.075 4 19.385V6.615q0-.69.463-1.152Q4.925 5 5.615 5h1.77V2.77h1.077V5h7.153V2.77h1V5h1.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463H5.615Zm0-1h12.77q.23 0 .423-.192q.192-.193.192-.423v-8.77H5v8.77q0 .23.192.423q.193.192.423.192Z"/>
        </svg>

        <h1>Citas</h1>
        </div>
    </div>
</template>

<style scoped>

.contenedor-menu {
    display: flex;
    flex-direction: column;
    
    gap: clamp(10px,1vw,60px);
    padding: 2vh;
}

.menu {
    text-align: center;
}

svg.icons {
    width: clamp(8px,3vw,40px);
    height: clamp(10px,3vw,40px);
    fill: #B0A09B
}
svg.cita{
    width: clamp(8px,3vw,40px);
    height: clamp(10px,3vw,40px);
}
h1 {
    font-size: clamp(.5em,1vw,1.3em);
    color: #B0A09B
}

div.menu:hover svg,
div.menu:hover h1 {
    transition: all 0.2s ease;
    fill: var(--color-morado-general);
    color: var(--color-morado-general);
    cursor: pointer;
}
div.menu.mascota.seleccionado h1,
div.menu.mascota.seleccionado svg
{
    fill: var(--color-morado-general);
    color: var(--color-morado-general);
}
div.menu.dashboard.seleccionado h1,
div.menu.dashboard.seleccionado svg
{
    fill: var(--color-morado-general);
    color: var(--color-morado-general);
}

div.menu.tienda.seleccionado h1,
div.menu.tienda.seleccionado svg
{
    fill: var(--color-morado-general);
    color: var(--color-morado-general);
}

div.menu.cirugia.seleccionado h1,
div.menu.cirugia.seleccionado svg
{
    fill: var(--color-morado-general);
    color: var(--color-morado-general);
}

div.menu.empleado.seleccionado h1,
div.menu.empleado.seleccionado svg
{
    fill: var(--color-morado-general);
    color: var(--color-morado-general);
}
</style>