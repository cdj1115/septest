import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Icon } from '@iconify/vue/dist/iconify.js';
import router from "./router";

createApp(App).use(Icon).use(router).mount('#app')
