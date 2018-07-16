// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import eventBus from '@/plugins/event-bus'

sync(store, router)

Vue.use(Vuetify)
Vue.use(Vuelidate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    eventBus
  },
  router,
  store,
  components: { App },
  template: '<App/>'
})
