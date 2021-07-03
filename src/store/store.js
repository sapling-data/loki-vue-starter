/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';

const state = {
  count: 0,
};

const mutations = {
  updateCount(state, payload) {
    state.count += payload.number;
  },
};

const actions = {
  updateCount(context, payload) {
    context.commit('updateCount', payload);
  },
};

const store = createStore({
  state,
  mutations,
  actions,
});

export default store;
