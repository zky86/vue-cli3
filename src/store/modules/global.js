import * as types from '../mutation-types'
const state = {
  current_info: ''
}

const getters = {}

const actions = {}

const mutations = {
  [types.RECORD_GLOBAL_CURRENT_INFO] (state, currentnfo) {
    state.current_info = currentnfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
