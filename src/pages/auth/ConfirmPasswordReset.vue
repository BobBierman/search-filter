<template>
  <div class="home">
    <div class="hdr">
      Confirm Reset Password
    </div>
    <div>
      <p>Confirm a password reset using the code you received via email.</p>
      <form @keyup.enter="confirmPasswordReset">
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
        <div>
          <label class="tablabel" for="codeInput">
            Verification Code:
          </label><br/>
          <input
            class="signinTxt"
            id="codeInput"
            type="password"
            v-model="code"
            required
            placeholderx="Enter Code"
          />
        </div>
        <div>
          <label class="tablabel" for="passwordInput">
            New Password:
          </label><br/>
          <input
            class="signinTxt"
            id="passwordInput"
            type="password"
            v-model="password"
            required
            placeholderx="Enter New Password"
          />
        </div>
        <div>
          <label class="tablabel" for="passwordInputVerify">
            Verify Password:
          </label><br/>
          <input
            class="signinTxt"
            id="passwordInputVerify"
            type="password"
            v-model="passverify"
            required
            placeholderx="Re-enter Password"
          />
        </div>
        <div class="error">
          <v-alert />
        </div>
        <VueLoadingButton
          aria-label="Confirm Password Reset"
          class="button loadingBtn"
          @click.native="confirmPasswordReset"
          :loading="isLoadingBtn"
          :styled="isStyledLoadingBtn"
        >Submit</VueLoadingButton>
        <VueLoadingButton
          aria-label="Resend Code"
          class="button loadingBtn"
          @click.native="passwordResetResend"
          :loading="isLoadingBtn2"
          :styled="isStyledLoadingBtn"
        >Resend Code</VueLoadingButton>
      </form>
      <!--<button @click="passwordResetResend"></button>-->
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
      password: '',
      passverify: '',
    };
  },
  mixins: [authMixin],
  methods: {
    async confirmPasswordReset() {
      if (this.password !== this.passverify) {
        // console.log('unmatched');
        this.password = '';
        this.passverify = '';
        document.getElementById('passwordInput').focus();
        this.$store.dispatch('_auth/setAuthenticationError', { message: 'Passwords do not match' });
        return;
      }

      this.isLoadingBtn = true;
      await this.$store.dispatch('_auth/confirmPasswordReset', {
        username: this.username,
        code: this.code,
        password: this.password,
      });
      this.isLoadingBtn = false;
      if (!this.hasAuthenticationStatus) {
        // this.$router.push('signIn');
        this.changePage('signIn');
      }
    },
    async passwordResetResend() {
      this.isLoadingBtn2 = true;
      await this.$store.dispatch('_auth/passwordReset', {
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
