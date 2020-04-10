import * as types from '../mutation-types'
const state = {
  game_info: ''
}

const getters = {}

const actions = {}

const mutations = {
  [types.RECORD_GLOBAL_GAME_INFO] (state, gameInfo) {
    state.game_info = gameInfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
