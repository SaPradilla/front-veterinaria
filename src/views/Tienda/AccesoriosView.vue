<script setup>
import {onMounted} from 'vue'
import { useShop } from '../../stores/shop';
const Shop = useShop()
import Tag from 'primevue/tag';
import Button from 'primevue/button';

onMounted(()=>{
    Shop.verAccesorios()
})

</script>

<template>
    <div class="listado-medicamentos">

        <div class="contenedor-productos">

            <div v-for="producto in Shop.accesorios" class="carta-productos">
                <Tag style="position: absolute; " v-if="producto.estado !== 'Disponible'" class="tag-estado" :value="producto.estado" severity="warning" />

                <img :src="`http://localhost:6060/uploads/products/${producto.imagen}`" alt="" class="fondo">
                <div class="info-compra">

                  
                    
                    <div class="detalles">
                        <div class="nombres">
                            <p class="nombre">{{ producto.accesorio.nombre }} </p>
                            <p class="tipo"> {{ producto.accesorio.tipo_accesorio.nombre }}</p>
                        </div>
                        <span> {{ producto.accesorio.precio }} $</span>
                    </div>

                    <div class="acciones">
                        <Button :disabled="producto.estado !== 'Disponible'"  icon="pi pi-cart-plus" @click="Shop.agregarCarrito(producto)" label="Carrito" outlined />
                        <Button :disabled="producto.estado !== 'Disponible'"   label="Comprar" severity="success" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<style  scoped>


.listado-medicamentos {
    display: flex;
    /* width: 100%; */
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.contenedor-productos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    margin-top: 15vh;
    place-items: center;
    width: 100%;
    /* gap: 2vh; */
}


.carta-productos {
    /* width: 100px; */
    height: max-content;
    margin: 5px;
    /* margin: 0 auto; */
    box-sizing: border-box;

}

.carta-productos .fondo {
    width: 200px;
    height: 200px;
    border-radius: 7px;
    /* background-color: rgba(217, 217, 217, 1); */
}



.info-compra {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    /* height: 100px; */
    width: max-content;
}

.detalles {
    display: flex;
    /* height: 100px; */
    width: 200px;
    flex-direction: column;
    justify-content: space-between;
}

.detalles p {
    font-weight: 700;
}

.detalles span {
    font-weight: 700;
    color: rgba(183, 183, 183, 1);
}




p.nombre {
    align-self: stretch;

    font-size: clamp(0.5em, 5vw, 1em);
    font-weight: 700;
}

p.tipo {
    font-weight: 600;
}


.acciones {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1vh;
    margin-top: 10px;

}

.agregar {
    font-size: 0.9em;
    font-weight: 700;
    display: flex;
    padding: 5px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: rgba(223, 200, 255, 0.37);
    color: var(--color-morado-general);
    /* gap: 10px; */
    cursor: pointer;
    gap: 20px;
    transition: all 0.3s ease;
    /* box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25); */
}

.agregar:hover {
    background: rgba(241, 231, 255, 0.622);
    color: rgba(184, 134, 255, 0.37);
}

.agregar:hover path {

    fill: rgba(184, 134, 255, 0.37);
}

.agregar svg {
    height: 1em;
}

.agregar path {
    transition: all 0.3s ease;

    fill: var(--color-morado-general);
}

.comprar {
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    font-weight: 700;
    color: white;
    padding: 7px;
    font-size: 0.8em;
    background-color: rgba(52, 135, 65, 1);
    transition: all 0.3s ease;
}

.comprar:hover {
    color: #eee;
    background-color: rgba(52, 135, 64, 0.386);
}

</style>