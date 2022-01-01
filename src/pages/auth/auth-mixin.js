import VueLoadingButton from 'vue-loading-button';
import { mapGetters, mapActions } from 'vuex';
// import Amplify from '@aws-amplify/core';
// const { Logger } = Amplify.Logger;
// const logger = new Logger('SignUpPage');

export default {
  created() {
    /// console.log('mixin created');
  },
  data() {
    return {
      // page: 'signIn',
      isLoadingBtn: false,
      isLoadingBtn2: false,
      isLoadingBtn3: false,
      isStyledLoadingBtn: true,
    };
  },
  components: {
    VueLoadingButton,
  },
  computed: {
    ...mapGetters('_auth', [
      'hasAuthenticationStatus',
      'isAuthorized',
      'isTokenExpired',
      'getPage',
      'getUserAttributes',
      'getUser',
      'getUsername',
      'getSession',
    ]),
    ...mapGetters([
      'getUserProps',
    ]),
    /*
    ...mapState({
      user: (state) => state.auth.user,
      isAuthenticated: (state) => state.auth.isAuthenticated,
    }), */
    /* getSession() {  // moved to auth.js
      if (this.user?.signInUserSession) {
        return this.user.signInUserSession;
      }
      return null;
    }, */
  },
  methods: {
    ...mapActions('_auth', ['setPage']),
    changePage(page) {
      // this.page = page;
      this.$store.dispatch('_auth/setPage', page);
      console.log('change page', page);
      // console.log('change page', this.getPage());
    },
  },
};
