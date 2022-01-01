import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
import createPersist from 'vuex-localstorage';
// import dataFavorites from '../data/favorites';
import _auth from './modules/auth';
import _api from './modules/api/api';
import _favorites from './modules/api/favorites';
import _users from './modules/api/users';
// import favoritesData from './modules/api/favorites';

// import robotsModule from './modules/robots';
// import usersModule from './modules/users';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

// clear the store in dev tools:
// localStorage.removeItem('<createPersist.namespace>-default')
// localStorage.removeItem('search-filter-default')
export default new Vuex.Store({
  state: {
    foo: 'root-foo', // root state
    // favorites: favoritesData,
    favorites: {},
    userProps: {},
  },
  modules: {
    // robots: robotsModule,
    // users: usersModule,
    _auth,
    _api,
    _favorites,
    _users,
  },
  strict: debug,
  plugins: [
    createPersist({
      namespace: 'search-filter',
      initialState: {},
      // ONE_WEEK
      expires: 7 * 24 * 60 * 60 * 1e3,
    }),
  ],
  getters: {
    getFavorites: (state) => state.favorites,
    getUserProps: (state) => state.userProps,
    foo(state) {
      return `root-getter/${state.foo}`;
    },
  },
  mutations: {
    setFavorites: (state, favs) => {
      state.favorites = favs;
      // console.log('setFavorites');
    },
    setUserProps: (state, props) => {
      state.userProps = props;
      // console.log('setUserProps');
    },
    updateFavs(state, fav) {
      /*
      console.log('updateFaves', fav);
      console.log('updateFaves', fav.name);
      if (state.favorites[fav.name]) {
        console.log(fav.name, 'exists');
      } else {
        console.log(fav.name, 'not exists');
      } */
      // console.log('updateFaves oa1', { ...fav.sites });
      // console.log('updateFaves oa2', fav.sites);
      // console.log(new Date().getTime());
      // console.log('updateFaves oa3', JSON.parse(JSON.stringify(fav.sites)));
      // console.log(new Date().getTime());
      // console.log('updateFaves oa4', fav.sites.slice());
      // console.log(new Date().getTime());
      // cannot use fav.sites because arrays are by ref and produces an illegal vuex mutation error
      // .slice() is faster than parse/stringify to clone an array
      // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
      state.favorites = {
        ...state.favorites,
        [fav.name]: { type: fav.type, sites: fav.sites.slice() },
      };
      // console.log('updateFaves favs', state.favorites);
    },
  },
  actions: {
    // getParts(context) {  : context object exposes several objects for working with  state
    // getParts({state, getters, commit, dispatch}) {  : deconstructed
    getFavsFromDb({ state }) {
      // axios.get('http://localhost:8081/api/parts');  would be a cors issue
      /*
      axios.get('/api/parts') // requires vue.config.js to work without host name
        .then((result) => commit('updateParts', result.data))
        .catch(console.error);
       */
      // console.log(dataFavorites);
      return state.favorites;
      // return commit('updateFavs', dataFavorites);
    },
  },
/*  state: {
    cart: [],
    parts: null,
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
  }, */
});
