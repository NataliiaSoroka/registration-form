import * as types from './mutation-types'
import { clone } from 'ramda'

const state = {
  form: {}
}

const getters = {
  getForm: state => state.form
}

const actions = {
  fillFirstStep ({ commit }, oneStep) {
    commit(types.SET_FIRST_STEP, oneStep)
  },
  fillSecondStep ({ commit }, twoStep) {
    commit(types.SET_SECOND_STEP, twoStep)
  },
  resetForm ({ commit }) {
    commit(types.SET_DEFAULT_FORM)
  }
}

const mutations = {
  [types.SET_FIRST_STEP] (state, firstStep) {
    state.form.oneStep = clone(firstStep)
  },
  [types.SET_SECOND_STEP] (state, secondStep) {
    state.form.twoStep = clone(secondStep)
  },
  [types.SET_DEFAULT_FORM] (state) {
    state.form = {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
