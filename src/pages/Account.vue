<template>
  <div class="home">
    <div class="hdr">
      Account
    </div>
    <div>
      <Auth />
    </div>
    <div v-if="getUser">
      <hr />
      My Profile
      <table>
        <tr>
          <td>
            Name:
          </td>
          <td class="center">
            {{ getUser.signInUserSession.idToken.payload.name }}
          </td>
        </tr>
        <tr>
          <td>
            Email:
          </td>
          <td class="center">
            {{ getUser.signInUserSession.idToken.payload.email }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Auth from './auth/Auth.vue';
import authMixin from './auth/auth-mixin';
// import util from '../../lambdas/layers/nodejs/util-layer';

export default {
  name: 'Account',
  props: {
    msg: String,
  },
  mixins: [authMixin],
  components: {
    Auth,
  },
  data() {
    return {
      field: '',
    };
  },
  created() {
    // util.consul('consul log');
    if (this.$route.query.page) {
      this.changePage(this.$route.query.page);
    }
  },
  computed: {
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
