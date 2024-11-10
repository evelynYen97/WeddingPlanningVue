
import { createApp } from 'vue'
import { createPinia } from 'pinia'



import App from './App.vue'
import router from './router'
//導入vuetify讓vue使用
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import * as components from 'vuetify/components';  
import * as directives from 'vuetify/directives'; 
import '@mdi/font/css/materialdesignicons.css';



import PrimeVue from 'primevue/config';
import Noir from '@/assets/css/toDoStyle/Noir';


const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
  });


app.use(PrimeVue, {
  theme: {
      preset: Noir,
      options: {
          prefix: 'p',
          darkModeSelector: '.p-dark',
          cssLayer: false,
      }
  }
});

app.use(createPinia())
app.use(router)
app.use(vuetify);
app.mount('#app')
