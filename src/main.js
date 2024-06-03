import { createApp } from 'vue'
import router from './router/index.js'
import './style.css'
import App from './App.vue'
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueMask from '@devindex/vue-mask';

const options = {
  // default options here
};

const pinia = createPinia();


const app = createApp(App);
app.use(pinia).use(router).use(VueSweetalert2).use(Toast, options).use(VueMask);

app.mount('#app');
