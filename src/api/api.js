import { mapGetters } from 'vuex';

export default {
  created() {
    console.log('api mixin created');
  },
  data() {
    return {
      apiName: 'SearchEngineFilter',
      authHeader: '',
      corsHeader: '*',
    };
  },
  computed: {
    ...mapGetters('_auth', [
      'getIdToken',
    ]),
    getApiName() {
      return this.apiName;
    },
    getCorsHeader() {
      return this.corsHeader;
    },
    getAuthHeader() {
      return `Bearer ${this.$store.getters['_auth/getIdToken']}`;
    },
  },
  methods: {
  },
};
