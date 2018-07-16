import Vue from 'vue'

const eventBus = new Vue({})

Object.defineProperty(Vue.prototype, '$bus', {
  get () {
    return this.$root.eventBus
  }
})

export default eventBus
