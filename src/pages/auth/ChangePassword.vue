<template>
  <div class="home">
    <div class="hdr">
      Change Password
    </div>
    <div v-show="getUsername">
      You are currently signed in as <b>{{ getUsername }}</b><br/>
      <p>Request a password change.</p>
      <form id="signinForm" @keyup.enter="passwordChange">
        <div>
          <label class="tablabel" for="currentPasswordInput">
            Current Password:
          </label><br/>
          <input
            class="signinTxt"
            id="currentPasswordInput"
            type="password"
            v-model="currentPassword"
            required
            placeholderx="Enter Current Password"
          />
        </div>
        <div>
          <label class="tablabel" for="newPasswordInput">
            New Password:
          </label><br/>
          <input
            class="signinTxt"
            id="newPasswordInput"
            type="password"
            v-model="newPassword"
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
          aria-label="Change Password"
          class="button loadingBtn"
          @click.native="passwordChange"
          :loading="isLoadingBtn"
          :styled="isStyledLoadingBtn"
        >Submit</VueLoadingButton>
      </form>
    </div>
    <div v-show="!getUsername">
      You are not signed in.
      <p>Click <a @click="changePage('signIn')">here</a> to sign in.</p>
    </div>
  </div>
</template>

<script>
import authMixin from './auth-mixin';

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      passverify: '',
    };
  },
  mixins: [authMixin],
  methods: {
    async passwordChange() {
      if (!document.getElementById('signinForm').reportValidity()) {
        return;
      }

      if (this.newPassword !== this.passverify) {
        this.newPassword = '';
        this.passverify = '';
        document.getElementById('newPasswordInput').focus();
        this.$store.dispatch('_auth/setAuthenticationError', { message: 'Passwords do not match' });
        return;
      }

      this.isLoadingBtn = true;
      await this.$store.dispatch('_auth/passwordChange', {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
      });
      this.isLoadingBtn = false;
      this.currentPassword = '';
      this.newPassword = '';
      this.passverify = '';
      document.getElementById('currentPasswordInput').focus();
      /*
      if (!this.hasAuthenticationStatus) {
        this.$router.push('account');
      }  */
    },
  },
};
</script>

<style scoped>
  .loadingBtn {
    font-size: 16px;
  }
</style>
