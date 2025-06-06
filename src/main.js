import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de importar el router

const app = createApp(App);
app.use(router); // Usar Vue Router en la app
app.mount('#app');