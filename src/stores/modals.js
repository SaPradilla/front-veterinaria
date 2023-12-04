import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
export const useModals = defineStore('modals', () => {
    // states
    const modalCliente = ref(false)
    const animarCliente = ref(false)
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
    return {
        modalCliente,
        animarCliente,
        toggleModalCliente
    }
})
