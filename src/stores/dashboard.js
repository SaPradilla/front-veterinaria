import { defineStore } from "pinia";
import { ref, reactive } from 'vue'

export const useDashboard = defineStore('dashboard', () => {
    // states
    
    const rolUser = ref('')
    const isAdmin = ref('')

    // Metodos
    
    return {
        rolUser,
        isAdmin

    }
})
