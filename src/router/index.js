import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import oneStep from '@/components/oneStep'
import twoStep from '@/components/twoStep'
import threeStep from '@/components/threeStep'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
      redirect: '/1'
    },
    {
      path: '/1',
      name: 'oneStep',
      component: oneStep
    },
    {
      path: '/2',
      name: 'twoStep',
      component: twoStep
    },
    {
      path: '/3',
      name: 'threeStep',
      component: threeStep
    }
  ]
})
