import { defineStore } from "pinia";
import { ref, reactive } from 'vue'

export const usePermisosUser = defineStore('permisosUser', () => {
    // states
    
    const rolUser = ref('')
    const isAdmin = ref('')
    const userLogin = reactive({
        nombre:'',
        rol:'',
        apellido:'',
    })
    // Metodos
    
    return {
        rolUser,
        isAdmin,
        userLogin

    }
})
