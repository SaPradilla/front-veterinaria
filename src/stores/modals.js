import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
export const useModals = defineStore('modals', () => {

    // states

    // Cliente 
    const modalCliente = ref(false)
    const animarCliente = ref(false)
    //Perfil Mascota
    const modalMascotaPerfil = ref(false)
    const animarMascotaPerfil = ref(false)

    //Empleados
    const modalEmpleado = ref(false)
    const animarEmpleado = ref(false)

    // Metodos
    const toggleModalCliente = () => {
        if (!modalCliente.value) {
            modalCliente.value = true;
            setTimeout(() => {
                animarCliente.value = true;
            }, 300);
        } else {
            animarCliente.value = false;
            setTimeout(() => {
                modalCliente.value = false;
            }, 300);
        }
    }

    const toggleMascotaPerfil = () => {
        if (!modalMascotaPerfil.value) {
            modalMascotaPerfil.value = true;
                setTimeout(() => {
                    animarMascotaPerfil.value = true;
                }, 300);
            } else {
                animarMascotaPerfil.value = false;
                setTimeout(() => {
                    modalMascotaPerfil.value = false;
                }, 300);
            }
    }

    const toggleModalEmpleado = () => {
        if (!modalEmpleado.value) {
            modalEmpleado.value = true;
            setTimeout(() => {
                animarEmpleado.value = true;
            }, 300);
        } else {
            animarEmpleado.value = false;
            setTimeout(() => {
                modalEmpleado.value = false;
            }, 300);
        }
    }

    return {
        modalCliente,
        animarCliente,
        modalMascotaPerfil,
        animarMascotaPerfil,
        modalEmpleado,
        animarEmpleado,

        toggleModalCliente,
        toggleMascotaPerfil,
        toggleModalEmpleado
    }
})
