<script setup>
import { ref, watch, reactive,onMounted,computed } from 'vue';
import { useMascota } from '../../stores/mascota';
import { useAuthStore} from '../../stores/auth';
import { useAdmin } from '../../stores/admin';
import { useCliente } from '../../stores/cliente';

// Primevue

import InputText from 'primevue/inputtext';

import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import InputSwitch from 'primevue/inputswitch';
import InputNumber from 'primevue/inputnumber'
import MultiSelect from 'primevue/multiselect';
import InlineMessage from 'primevue/inlinemessage';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';

import { useRouter } from 'vue-router';

// Stores
const Mascota = useMascota()
const Auth = useAuthStore()
const Admin = useAdmin()
const Cliente = useCliente()

const router = useRouter()

// States

const tipo = [
    {label:'Perro',name:'Perro'},
    {label:'Gato',name:'Gato'},
    {label:'Hámster',name:'Hámster'},
    {label:'Ave',name:'Ave'},
    {label:'Pez',name:'Pez'},
    {label:'Reptil',name:'Reptil'},
    {label:'Invertebrado',name:'Invertebrado'},
    {label:'Conejo',name:'Conejo'},

];
const vacunas = [
    {label:'Parvovirosis',name:'Parvovirosis'},
    {label:'Pentavalente',name:'Pentavalente'},
    {label:'Rabia',name:'Rabia'},
    {label:'Moquillo',name:'Moquillo'},
    {label:'Adenovirus',name:'Adenovirus'},
    {label:'Traqueobronquitis infecciosa canina',name:'Traqueobronquitis infecciosa canina'},
    {label:'Leptospira',name:'Leptospira'},

];
const tiposDeMascotas = [
    { 
        tipo: 'Perro', 
        razas: [
            { label: 'Labrador', name: 'Labrador' },
            { label: 'Poodle', name: 'Poodle' },
            { label: 'Pit Bull Terrier', name: 'Pit Bull Terrier' },
            { label: 'Terrier', name: 'Terrier' },
            { label: 'Bloodhound', name: 'Bloodhound' },
            { label: 'Bolognese', name: 'Bolognese' },
            { label: 'Boxer', name: 'Boxer' },
            { label: 'Chihuahua', name: 'Chihuahua' },
            { label: 'Collie', name: 'Collie' },
            { label: 'Dogo ', name: 'Dogo ' },
            { label: 'Harrier', name: 'Harrier' }
        ] 
    },
    { tipo: 'Gato', razas: [
        { label: 'Siamés', name: 'Siamés' },
        { label: 'Persa', name: 'Persa' },
        { label: 'Maine Coon', name: 'Maine Coon' }
    ] },
    { tipo: 'Hámster', razas: [
        { label: 'Dorado', name: 'Dorado' },
        { label: 'Sirio', name: 'Sirio' },
        { label: 'Ruso', name: 'Ruso' }
    ] },
    { tipo: 'Ave', razas: [
        { label: 'Canario', name: 'Canario' },
        { label: 'Periquito', name: 'Periquito' },
        { label: 'Loro', name: 'Loro' }
    ] },
    { tipo: 'Pez', razas: [
        { label: 'Guppy', name: 'Guppy' },
        { label: 'Beta', name: 'Beta' },
        { label: 'Goldfish', name: 'Goldfish' }
    ] },
    { tipo: 'Reptil', razas: [
        { label: 'Iguana', name: 'Iguana' },
        { label: 'Gecko', name: 'Gecko' },
        { label: 'Tortuga', name: 'Tortuga' }
    ] },
    { tipo: 'Invertebrado', razas: [
        { label: 'Araña', name: 'Araña' },
        { label: 'Caracol', name: 'Caracol' },
        { label: 'Cangrejo', name: 'Cangrejo' }
    ] },
    { tipo: 'Conejo', razas: [
        { label: 'Holandés', name: 'Holandés' },
        { label: 'Angora', name: 'Angora' },
        { label: 'Mini Rex', name: 'Mini Rex' }
    ] }
];


const razas = ref([]);


onMounted(() => {
    Auth.ObtenerToken()
    // Cliente.verClientes()
})

watch(() => Mascota.mascotaCliente.tipo_mascota, (newTipo) => {

    const mascotaSeleccionada = tiposDeMascotas.find(
        (mascota) => mascota.tipo === newTipo.name
    );

    Mascota.mascotaCliente.raza = mascotaSeleccionada ? mascotaSeleccionada.razas[0] : Mascota.mascotaCliente.raza?.label;

    razas.value = mascotaSeleccionada ? mascotaSeleccionada.razas : []; 
    console.log(razas.value)
}
)


watch(() => Mascota.mascotaCliente.vacunas, (newTipo) => {
    filtrarVacunasDisponibles();
    }
)
const filtrarVacunasDisponibles = ()=>{
    // Si la vacuna que esta en el state mascota.vacuna es igual al que esta en vacunas, se deja de mostrar
    return vacunas.filter(vacuna => Mascota.mascotaCliente.vacunas.indexOf(vacuna) === -1);
}

const imageUpload = ref(null)

const onUpload = (event) => {

    console.log(event.files[0])

    Mascota.mascotaCliente.imagen = event.files[0]

    imageUpload.value = event.files[0].objectURL

}

const deleteImage = () => {
    Mascota.mascotaCliente.imagen = null
    imageUpload.value = null
}
</script>

<template>
    
    <div class="contenedor">
        
        
        
        <div class="contenedor-registro">
            <div class="titulo">
                <h1>Registrar Mascota</h1>
                <InlineMessage v-if="Mascota.errorData" severity="error"> Todos los datos son obligatorios </InlineMessage>   
            </div>
            <div class="contenedor-formulario">
                <div class="formulario">

                    <div class="registro">
        
                        <h2>Datos Mascota</h2>
        
                        <FormKit type="form" id="form" @submit="" :actions="false"
                            incomplete-message="Ingrese todos sus datos para continuar">
                            <div class="inputs">
        
                                    <!-- <v-select  v-model="Mascota.mascotaCliente.clienteId" placeholder="Nombre del Dueño" name="clienteId"
                                        :options="Cliente.clientes" :reduce="nombre => nombre.id" label="nombre"></v-select>
                                        
                                    <Dropdown v-model="Mascota.mascotaCliente" :options="Cliente.clientes" checkmark  optionLabel="nombre"  placeholder="Nombre del dueño" />
                                     -->
                                
    
                                    <InputText type="text" v-model="Mascota.mascotaCliente.nombre" placeholder="Nombre Mascota" />
                                    <Dropdown v-model="Mascota.mascotaCliente.tipo_mascota" editable  :options="tipo" checkmark  optionLabel="label"   placeholder="Tipo de Mascota"/>
                                    <Dropdown v-model="Mascota.mascotaCliente.raza" editable :options="razas" checkmark  optionLabel="label"  placeholder="Raza"/>
                                    <div class="genero">
                                        <small>{{ Mascota.mascotaCliente.genero ? 'Macho' : 'Hembra'}}</small>
                                        <InputSwitch v-model="Mascota.mascotaCliente.genero" />
                                    </div>
                                    
                                    
                                    <div class="">
                                        <Dropdown style="width: 14vh;" v-model="Mascota.opcionEdad" :options="[' Años',' Meses']"  checkmark placeholder="Tipo" />
                                        <!-- <InputText type="text"  placeholder="Edad" /> -->
                                        <InputNumber v-model="Mascota.mascotaCliente.edad" :suffix="Mascota.opcionEdad" placeholder="Edad" />
                                    </div>
                                    
                                    

                            </div>
                        </FormKit>
                    </div>
                    <div class="vacunas">
                        <h2>Vacunas</h2>
                        <MultiSelect style="width: 200px;" v-model="Mascota.mascotaCliente.vacunas" display="chip" :options="vacunas" optionLabel="name" placeholder="Seleccione las vacunas"
                        :maxSelectedLabels="3" />

                        <div class="image-uploaded">
                            <div>
                                <FileUpload style="display: flex;" mode="basic" customUpload name="demo" :auto="true" @uploader="onUpload"
                                    accept="image/*" :maxFileSize="1000000" chooseLabel="Foto" />
                                <small v-if="imageUpload">{{ Mascota.mascotaCliente.imagen.name }}</small>
                            </div>
    
                            <div class="imagen" v-if="imageUpload">
                                <img v-if="imageUpload" class="img-upload" :src="imageUpload" alt="">
                                <i @click="deleteImage" v-if="imageUpload" class="pi pi-trash"></i>
                            </div>
                        </div>

                    </div>
                </div>
                
                <div class="acciones">

                    <Button @click="router.push({name:'info-perfil'})" label="Cancelar" severity="secondary" outlined  rounded  />
                    <Button @click="Mascota.registrarMascotaCliente" label="Agregar" rounded  />
                
                </div>
                
            </div>
    
        </div>

    </div>
</template>
<style scoped>


.image-uploaded{
    display: flex;
    align-items: start;
    width :100%;
    flex-direction: column;
    justify-content: left;
}
.image-uploaded i{
    cursor: pointer;
    color: var(--color-rojo);
}
.img-upload{
    height: 50px;
    width: 50px;
}
.imagen{
    border: 1px solid var(--color-morado-claro-general);
    border-radius:5px;
    padding: 4px ;
    display: flex;
    /* gap: 1vh; */
    align-items: end;
}

.acciones{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
.titulo{
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 3vh;
    gap: 10px;
}
.vacunas{
    width: 40vh;
    display: flex;
    flex-direction: column;
    gap: 2vh;
}
.genero{
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: var(--color-morado-general);
}
.contenedor{
    background: url('../../assets/img/perfil_background.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    align-items: center;
}

h1 {
    text-align: center;
    color: var(--color-morado-general);
    font-size: 2.4em;
    font-weight: bold;
}
h2 {
    margin-bottom: 5vh;
    font-size: 1.4em;
    color: var(--color-morado-general);
    font-weight: 600;

}



.agregar{
    margin-right: 5vh;
    margin: 0 auto;
    font-size: 1.2em;
    padding:10px;
    border-style: none;
    background-color: var(--color-morado-general);
    color: white;
    border-radius: 20px;
    width: 8em;
    transition: all 0.2s ease;
    cursor: pointer;

}
.agregar:hover{
    transform: translateY(-1px); 
    background-color: var(--color-morado-oscuro-general);
}
    
.formulario {
    /* max-height: max-content; */
    /* width: 40vh; */
    position: relative;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    gap: 50px;
}
.contenedor-registro {
    width: 100vh;
    /* height: 100vh; */
    display: flex;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.036);
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    flex-direction: column;
    gap: 10vh;
    width: max-content;
}

.contenedor-formulario {

    display: flex;
    flex-direction: column;

    gap: 2vh;

}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.registro .contenedor-genero {
    display: flex;
    align-items: center;
    gap: 20px;
}

</style>