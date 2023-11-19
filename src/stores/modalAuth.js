import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
export const useModalAuthStore = defineStore('modalAuth', () => {
    // states
    const modalLogin = reactive({
        showModalLogin: true,
        animateModalLogin: false
    })

    const modalRegister = reactive({
        showModalRegister: false,
        animateModalRegister: false
    })

    // Metodos

    const handleClickModal = () => {

        if (!modalLogin.showModalLogin) {

            // Ocultar Register
            modalRegister.animateModalRegister = true
            setTimeout(() => {
                modalRegister.showModalRegister = false
            }, 300)

            // Mostrar login 
            modalLogin.showModalLogin = true
            setTimeout(() => {
                modalLogin.animateModalLogin = false
            }, 300)

        } else {

            // Ocultar login
            modalLogin.animateModalLogin = true
            setTimeout(() => {
                modalLogin.showModalLogin = false
            }, 300)

            // Mostrar Register
            modalRegister.showModalRegister = true
            setTimeout(() => {
                modalRegister.animateModalRegister = false
            }, 300)

        }

    }
    return {
        modalLogin,
        modalRegister,

        handleClickModal,

    }
})
