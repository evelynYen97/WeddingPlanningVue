
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
// import Aura from '@primevue/themes/aura';
import Noir from '@/assets/css/toDoStyle/Noir';
// import AppState from '@/assets/css/toDoStyle/appState'; //若要使用動態切換主題 考慮加 
// import ThemeSwitcher from './components/ThemeSwitcher.vue';



const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
  });

//   app.use(PrimeVue, {
//     theme: {
//         preset: Lara,
//         options: {
//             cssLayer: {
//                 name: 'primevue',
//                 order: 'tailwind-base, primevue, tailwind-utilities'
//             }
//         }
//     }
//  });

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

// app.use(AppState);
app.use(createPinia())
app.use(router)
app.use(vuetify);
app.mount('#app')
