import API from '@aws-amplify/api';
// import api from './api';

export default {
  namespaced: true,
  // initial state
  state: {
    apiPath: '/favorites',
  },
  modules: {
    // api,
  },
  getters: {
    getApiPath: (state) => state.apiPath,
    // getAuthHeader: () => this.getAuthHeader(),
  },
  mutations: {
  },
  actions: {
    // ...mapActions(['setFavorites']),
    fetchFavorites: async (context) => {
      await context.dispatch('_auth/refreshUserSession', null, { root: true });

      const payload = {
        headers: {
          Authorization: context.rootGetters['_auth/getAuthHeader'],
          // 'Access-Control-Allow-Origin': context.rootGetters['_api/getCorsHeader'],
        },
        response: true, // OPTIONAL (return entire Axios response instead of only response.data)
        queryStringParameters: {
        },
      };
      // console.log('token ', context.rootGetters['_auth/getAuthHeader']);
      // console.log('token ', context.getters['api/auth/getIdToken']);
      /* console.log('name,path ', context.getters['api/getApiName'], context.getters.getApiPath);
      console.log('token ', context.getters['api/getAuthHeader']);
       */
      // console.log('auth ', this.getAuthHeader());
      try {
        await API
          .get(context.rootGetters['_api/getApiName'], context.getters.getApiPath, payload)
          .then((response) => {
            // this.$store.dispatch('setFavorites', response.data.Favorites);
            context.commit('setFavorites', response.data.Favorites, { root: true });
          })
          .catch((error) => {
            if (error.response.status === 404) {
              context.commit('setFavorites', {}, { root: true });
              return false;
            }
            console.log('fetchFavorites', error.response);
            return true;
          });
      } catch (err) {
        console.log(err);
        // context.commit('_auth/setAuthenticationError', err, { root: true });
      }
    },
    updateFavorites: async (context, favs) => {
      await context.dispatch('_auth/refreshUserSession', null, { root: true });

      const payload = {
        body: { Favorites: favs },
        headers: {
          Authorization: context.rootGetters['_auth/getAuthHeader'],
        },
      };
      try {
        await API
          // .post(this.state.apiName, '/favorites', payload)
          .post(context.rootGetters['_api/getApiName'], context.getters.getApiPath, payload)
          .then((response) => {
            // Add your code here
            console.log('favorites update successful', response);
          })
          .catch((error) => {
            console.log(error.response);
          });
        // context.commit('setUserAuthenticated', user);
      } catch (err) {
        console.log(err);
        // context.commit('_auth/setAuthenticationError', err, { root: true });
      }
    },
  },
};
