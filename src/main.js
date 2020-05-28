import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iterationStorage from './modules/iterationLS'
import '@/assets/styles/general.scss'

Vue.config.productionTip = false

Vue.use(iterationStorage)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
