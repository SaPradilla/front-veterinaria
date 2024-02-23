<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useAdmin } from '../../stores/admin'
import { useInventario } from '../../stores/inventario'

import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';

import InputGroupAddon from 'primevue/inputgroupaddon';
// import FloatLabel from 'primevue/floatlabel';

const Admin = useAdmin()
const Inventario = useInventario()

const fechaHoy = new Date()
onMounted(() => {
    Inventario.verTipoAccesorio()
})
// const value = ref(100)
const tipoModal = ref(false)

const nuevoTipo = ref('')
const imageUpload = ref(null)

const handleTipoModal = () => {
    tipoModal.value = !tipoModal.value
}

const agregarTipo = () => {
    Inventario.agregarTipoAccesorio({ nombre: nuevoTipo.value })
    handleTipoModal()
    nuevoTipo.value = ''
}

const onUpload = (event) => {
    console.log(event.files[0])

    Inventario.accesoryData.imagen = event.files[0]

    imageUpload.value = event.files[0].objectURL

}

const deleteImage = () => {
    Inventario.accesoryData.imagen = null
    imageUpload.value = null
}

</script>

<template>
    <div class="con">
        <div></div>
        <button @click="Admin.handleTienda" class="botonVolver"> Volver </button>
    </div>
    <div class="contenido-registro">
        <h1>Registro Accesorio</h1>
        <div class="formulario">
            <form>

                <InputText type="text" v-model="Inventario.accesoryData.nombre" placeholder="Nombre" />
                <div class="select">

                    <Dropdown v-model="Inventario.accesoryData.tipo_accesorioId" :options="Inventario.tipo_accesorio"
                        checkmark optionLabel="nombre" showClear placeholder="Tipo de accesorio" />

                    <small @click="handleTipoModal"> Agregar </small>

                    <InputGroup v-if="tipoModal">
                        <InputText v-model="nuevoTipo" placeholder="Agregar Tipo" />
                        <Button @click="handleTipoModal" outlined icon="pi pi-times" severity="danger" />

                        <Button @click="agregarTipo" icon="pi pi-check" />
                    </InputGroup>
                </div>


                <InputNumber v-model="Inventario.accesoryData.precio" inputId="currency-us" mode="currency" currency="COP"
                    locale="es-ES" placeholder="Precio" />

                <div class="image-uploaded">
                    <div>

                        <FileUpload mode="basic" customUpload name="demo" :auto="true" @uploader="onUpload" accept="image/*"
                            :maxFileSize="1000000" chooseLabel="Imagen del Producto" />
                        <small v-if="imageUpload">{{ Inventario.accesoryData.imagen.name }}</small>
                    </div>

                    <div class="imagen" v-if="imageUpload">
                        <img v-if="imageUpload" class="img-upload" :src="imageUpload" alt="">
                        <i @click="deleteImage" v-if="imageUpload" class="pi pi-trash"></i>
                    </div>
                </div>


                <!-- <InputText type="text" v-model="value" placeholder="Nombre"/> -->
                <InputText v-model.number="Inventario.accesoryData.cantidad_total" placeholder="Cantidad" />
                <Slider v-model="Inventario.accesoryData.cantidad_total" />

                <Textarea v-model="Inventario.accesoryData.descripcion" rows="3" cols="30" placeholder="Descripcion" />
                <Button @click="Inventario.agregarAccesorio" label="Agregar" />


            </form>


        </div>
    </div>
</template>
<style scoped>
.image-uploaded {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.image-uploaded i {
    cursor: pointer;
    color: var(--color-rojo);
}

.img-upload {
    height: 50px;
    width: 50px;
}

.imagen {
    border: 1px solid var(--color-morado-claro-general);
    border-radius: 5px;
    padding: 4px;
    display: flex;
    /* gap: 1vh; */
    align-items: end;
}

h1 {
    color: var(--color-morado-claro-general);
}

.contenido-registro {
    gap: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.formulario {
    width: 40%;
}

.formulario form {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.select {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 10px;
}

.select small {
    text-align: left;
    color: #5f5f5fee;
    cursor: pointer;
}

.con {
    position: absolute;
    top: 25vh;
    right: 0;

}

.opciones {
    margin-bottom: 2vh;
    margin-bottom: 2vh;
}
</style>