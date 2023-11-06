<script setup>

</script>
<template>
    <div class="nav-bar">
        <div class="frame">
            <img class="pelitos" alt="Pelitos" src="../assets/img/pelitos-4.png" />
            <div class="div">
                <div class="label"> <a href="#nosotros">Nosotros</a></div>
                <div class="label"> <a href="#servicios">Servicios</a></div>
                <div class="label"><a href="#testimonios">Testimonios</a></div>
                <div class="label"><a href="#productos">Productos</a></div>
                <div class="label"><a href="#contacto">Contacto</a></div>
                <div class="label"><a href="#pqr">PQR</a></div>
                <img class="linea" alt="Linea" src="../assets/img/Linea.svg" />
                <img class="avatar" alt="Avatar" src="../assets/img/avatar.svg" />
            </div>
        </div>
    </div>
</template>
<style>

.nav-bar {
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 50px;
    box-shadow: 3px 3px 10px #00000040;
    height: 60px;
    width: 1350px;
}

.nav-bar .frame {
    align-items: flex-end;
    display: inline-flex;
    gap: 634px;
    left: 16px;
    position: relative;
    
}
.frame a{
    all: unset;
}

.nav-bar .pelitos {
    height: 52px;
    position: relative;
    width: 85px;
}

.nav-bar .div {
    align-items: center;
    display: flex;
    gap: 13px;
    padding: 1px 4px;
    position: relative;
    width: 557px;
}

.nav-bar .label {
    cursor: pointer;
    color: var(--black);
    font-family: var(--button-text-font-family);
    font-size: var(--button-text-font-size);
    font-style: var(--button-text-font-style);
    font-weight: var(--button-text-font-weight);
    letter-spacing: var(--button-text-letter-spacing);
    line-height: var(--button-text-line-height);
    position: relative;
    text-align: center;
    transition: all 0.2s ease;
    white-space: nowrap;
    width: fit-content;
}

.label:hover {
    transform: scale(0.9);
}

.nav-bar .linea {
    height: 20px;
    position: relative;
    width: 1.5px;
}

.nav-bar .avatar {
    height: 40px;
    position: relative;
    width: 40px;
    transition: all 0.2s ease;

}

.avatar:hover {
    transform: scale(0.9);
}</style>
