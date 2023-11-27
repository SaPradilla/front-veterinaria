import './assets/main.css'

import  vSelect   from 'vue-select';
import "vue-select/dist/vue-select.css";
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { plugin,defaultConfig,} from '@formkit/vue'
import config from '../formkit.config'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component("v-select", vSelect )

app.use(createPinia())
app.use(router)
app.use(plugin,defaultConfig(config))
app.use(Vue3Toasity,{autoClose:3000})
app.mount('#app')
