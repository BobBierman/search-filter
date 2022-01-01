export default {
  namespaced: true,
  state: {
    apiName: 'SearchEngineFilter',
    authHeader: '',
    corsHeader: '*',
  },
  modules: {
  },
  getters: {
    getApiName: (state) => state.apiName,
    getCorsHeader: (state) => state.corsHeader,
    // no good it returns a promise
    // getAuthHeader: async () =>
    //   `Bearer ${(await API.Auth.currentSession()).getIdToken().getJwtToken()}`,
  },
  mutations: {
  },
  actions: {
  },
};
