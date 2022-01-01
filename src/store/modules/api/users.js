import API from '@aws-amplify/api';

export default {
  namespaced: true,
  state: {
    apiPath: '/users',
  },
  modules: {
  },
  getters: {
    getApiPath: (state) => state.apiPath,
  },
  mutations: {
  },
  actions: {
    fetchUsers: async (context) => {
      // TODO apply the token refresh as an interceptor/aspect on each api call
      await context.dispatch('_auth/refreshUserSession', null, { root: true });

      const payload = {
        headers: {
          Authorization: context.rootGetters['_auth/getAuthHeader'],
          // 'Access-Control-Allow-Origin': context.rootGetters['_api/getCorsHeader'],
        },
        response: true,
        queryStringParameters: {
        },
      };
      try {
        await API
          .get(context.rootGetters['_api/getApiName'], context.getters.getApiPath, payload)
          .then((response) => {
            context.commit('setUserProps', response.data.Props, { root: true });
          })
          .catch((error) => {
            if (error.response.status === 404) {
              context.commit('setUserProps', {}, { root: true });
              return false;
            }
            console.log('fetchUsers', error.response);
            return true;
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
