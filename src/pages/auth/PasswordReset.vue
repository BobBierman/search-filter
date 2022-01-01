<template>
  <div class="home">
    <div class="hdr">
      Reset Password
    </div>
    <div>
      <p>Request a password reset code via email.</p>
      <form @keyup.enter="passwordReset">
        <div>
          <label class="tablabel" for="usernameInput">
            Username:
          </label><br/>
          <input
            class="signinTxt"
            id="usernameInput"
            type="text"
            v-model="username"
            required
            autofocus
            placeholderx="Enter User Name"
          />
        </div>
        <div class="error">
          <v-alert />
        </div>
        <VueLoadingButton
          aria-label="Reset Password"
          class="button loadingBtn"
          @click.native="passwordReset"
          :loading="isLoadingBtn"
          :styled="isStyledLoadingBtn"
        >Submit</VueLoadingButton>
      </form>
    </div>
  </div>
</template>

<script>
import authMixin from './auth-mixin';

export default {
  data() {
    return {
      username: '',
    };
  },
  mixins: [authMixin],
  methods: {
    async passwordReset() {
      this.isLoadingBtn = true;
      await this.$store.dispatch('_auth/passwordReset', {
        username: this.username,
      });
      this.isLoadingBtn = false;
      if (!this.hasAuthenticationStatus) {
        // this.$router.push('confirmPasswordReset');
        this.changePage('confirmPasswordReset');
      }
    },
  },
};
</script>

<style scoped>
  .loadingBtn {
    font-size: 16px;
  }
</style>
