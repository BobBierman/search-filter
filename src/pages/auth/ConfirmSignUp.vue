<template>
  <div class="home">
    <div>
      <h2>Confirm Sign Up</h2>
      <p>
        Check your email for a verification code and enter it below to complete the sign up.
        Click <a @click="confirmResend">Resend Code</a>
        if you do not receive the email within a few minutes.
      </p>
      <form @keyup.enter="confirmSignUp">
        <div>
          <label for="usernameInput">
            User Name:
          </label><br/>
          <input
            class="signinTxt"
            id="usernameInput"
            type="text"
            v-model="username"
            required
            placeholderx="Enter User Name"
          />
        </div>
        <div>
          <label for="codeInput">
            Verification Code:
          </label><br/>
          <input
            class="signinTxt"
            id="codeInput"
            type="password"
            v-model="code"
            required
            placeholderx="Enter Verification Code"
          />
        </div>
        <div class="error">
          <v-alert />
        </div>
        <VueLoadingButton
          aria-label="Confirm Signup"
          class="button loadingBtn"
          @click.native="confirmSignUp"
          :loading="isLoadingBtn"
          :styled="isStyledLoadingBtn"
        >Submit</VueLoadingButton>
        <VueLoadingButton
          aria-label="Confirm Resend"
          class="button loadingBtn"
          @click.native="confirmResend"
          :loading="isLoadingBtn2"
          :styled="isStyledLoadingBtn"
        >Resend Code</VueLoadingButton>
      </form>
      <!--<button @click="confirmResend">Resend Code</button>-->
    </div>
  </div>
</template>

<script>
import authMixin from './auth-mixin';

export default {
  data() {
    return {
      username: '',
      code: '',
    };
  },
  mixins: [authMixin],
  methods: {
    async confirmSignUp() {
      this.isLoadingBtn = true;
      await this.$store.dispatch('_auth/confirmSignUp', {
        username: this.username,
        code: this.code,
      });
      this.isLoadingBtn = true;
      if (!this.hasAuthenticationStatus) {
        // this.$router.push('signIn');
        this.changePage('signIn');
      }
    },
    async confirmResend() {
      this.isLoadingBtn2 = true;
      await this.$store.dispatch('_auth/confirmResend', {
        username: this.username,
      });
      this.isLoadingBtn2 = false;
    },
  },
};
</script>

<style scoped>
  .loadingBtn {
    font-size: 16px;
    margin-right: 14px;
  }
</style>
