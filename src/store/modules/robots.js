import axios from 'axios';

export default {
  // state is always namespaced (requires qualifier e.g. $state.robots.item)
  // mutations, actions, getters are not namespaced unless this is true
  // so if this is false or not set, functions of the same name will be called across all modules
  namespaced: true,
  state: {
    cart: [],
    parts: null,
    // foo: 'robots-foo',
  },
  mutations: {
    addRobotToCart(state, robot) {
      state.cart.push(robot);
    },
    updateParts(state, parts) {
      state.parts = parts;
    },
  },
  actions: {
    // getParts(context) {  : context object exposes several objects for working with  state
    // getParts({state, getters, commit, dispatch}) {  : deconstructed
    getParts({ commit }) {
      // axios.get('http://localhost:8081/api/parts');  would be a cors issue
      axios.get('/api/parts') // requires vue.config.js to work without host name
        .then((result) => commit('updateParts', result.data))
        .catch(console.error);
    },
    addRobotToCart({ commit, state }, robot) {
      const cart = [...state.cart, robot];
      return axios.post('/api/cart', cart)
        .then(() => commit('addRobotToCart', robot))
        .catch(console.error);
    },
  },
  getters: {
    cartSaleItems(state) {
      return state.cart.filter((item) => item.head.onSale);
    },
    /* foo(state) {
      return `robots-getter/${state.foo}`;
    }, */
  },
};
