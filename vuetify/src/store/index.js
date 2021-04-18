import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },

  mutations: {
    increment(state, step) {
      state.count += step;
    }
  },

  actions: {
    incrementWithDelay(context, step) {
      setTimeout(() => {
        context.commit("increment", step)
      }, 500);
    }
  },

  modules: {
  }
})
