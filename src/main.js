import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.css'
import App from './App.vue'
import { Icon } from '@iconify/vue/dist/iconify.js';
import router from "./router";
const pinia = createPinia();
createApp(App).use(pinia).use(Icon).use(router).mount("#app");
