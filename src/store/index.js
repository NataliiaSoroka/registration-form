/**
 * @desc store module for general purpose
 */

import Vue from 'vue'
import Vuex from 'vuex'
import formData from './formData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    formData
  }
})
