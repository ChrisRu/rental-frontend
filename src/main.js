import Vue from 'vue';
import App from './components/App.vue';
import router from './router';
import { createProvider } from './vue-apollo';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  provide: createProvider().provide(),
  render: h => h(App)
}).$mount('#app');
