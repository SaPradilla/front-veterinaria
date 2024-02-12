<script setup>

import SplitButton from 'primevue/splitbutton';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';


const router = useRouter()

</script>

<template>
    <TabView>
        <TabPanel header="Mascotas">
            <div class="contenedor-boton">
                <div class="contenido-boton">
                    <Button @click="router.push({name:'registro-mascota-user'})" style="font-size: .8em;  " label="Añadir mascota" rounded outlined />
                </div>
            </div>

            <!-- <div class="sin-mascotas"  v-if="Cliente.mascotasCliente">
                        <h2>No tienes mascotas registradas :( </h2>
                    </div> -->
            <div class="contenedor-mascotas">
                <div class="image"></div>
                <div class="info-mascota">
                    <h1> Matias </h1>
                    <div class="more-info">
                        <strong>Perrro</strong>
                        <p>7 años</p>
                    </div>
                    <div class="info-menu">
                        <p>Adminstrar</p>
                        <i class="pi pi-cog"></i>

                    </div>
                </div>
                <div class="info-medica">
                    <h2>Vacunas</h2>
                    <p>Parvovirosis Pentavalente Rabia
                        Moquillo, Adenovirus ,traqueobronquitis infecciosa canina
                        Leptospira
                    </p>
                </div>
            </div>

        </TabPanel>
        <TabPanel header="Citas">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </TabPanel>
        <TabPanel header="Compras">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
                sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
                expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </TabPanel>
    </TabView></template>

<style scoped>

.contenedor-mascotas{
    display: flex;
    
    /* justify-content: left; */
    align-items: center;
    gap: 4vh;

}
.sin-mascotas{
    display: flex;
    /* align-items: center; */
    justify-content: center;
    text-align: center;
    color: var(--color-gris-oscuro);
}
.image{
    height: 100px;
    width: 100px;
    background-color: #D9D9D9;
    border-radius: 100%;
}


.contenedor-boton {
	display: flex;
	justify-content: right;
    /* font-size: .3em; */
}
.contenido-boton{
    display: flex;
	z-index: 1;
	flex-direction: column;
}
.menu{
	/* cursor: pointer; */
	color: white;
	background-color: var(--color-morado-general);
	display: flex;
	align-items: center;
	gap: 10px;
	/* margin-right: 22px; */
	padding: 2px;
	border-radius: 10px 0px 0px 10px;
	text-align: center;
}
.info-mascota{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.more-info{
    display: flex;
    gap: 10px;
    color: var(--color-morado-general);
}
h1{
    font-size: clamp(.7em,10vw,1.4em);
}
h2{
    color: var(--color-gris-oscuro);
    font-size: clamp(.4em,10vw,1.2em);
}
.info-menu{
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 10px;
}
.info-medica{
    width:300px;
}
.info-medica p{
    font-size: clamp(.4em,3vw,.8em);
}
</style>