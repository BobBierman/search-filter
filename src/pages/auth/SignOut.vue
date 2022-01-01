<template>
  <div>
    You have been signed out.
    Click <a @click="changePage('signIn')">here</a> to sign in.
  </div>
</template>

<script>
import authMixin from './auth-mixin';

export default {
  async created() {
    await this.$store.dispatch('_auth/signOut');
    // this.$router.push('account');
  },
  mixins: [authMixin],
};
</script>
