import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'

Vue.use(Vuex)

const plugin = store => {
  const storage = window.sessionStorage
  for (let i = 0, length = storage.length; i < length; i++) {
    if (storage.key(i).indexOf('agent') === 0) {
      const _keys = storage
        .key(i)
        .split('_')
      _keys.shift()
      store.state[_keys.shift()][_keys.join('_')] = JSON.parse(storage.getItem(storage.key(i)))
    }
  }
  store.subscribe(mutation => {
    mutation
      .type
      .indexOf('RECORD') === 0 && mutation.payload !== undefined && storage.setItem(mutation.type.replace('RECORD', 'agent').toLowerCase(), JSON.stringify(mutation.payload))
  })
}

export default new Vuex.Store({
  state: {
    collapse: false,
    token: 'abcd'
  },
  modules: {
    global
  },
  actions: {
    toggle ({
      state
    }) {
      state.collapse = !state.collapse
    },
    toggleLoading ({
      state
    }, payload) {
      // console.log(state)
      // state.loading = !state.loading
      state.loading = payload === undefined
        ? !state.loading
        : payload
    },

    updateUserInfo: ({
      commit, state
    }, payload) => {
      console.log(333)
    }
  },
  plugins: [plugin]
})
