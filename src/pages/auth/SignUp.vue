<template>
  <div class="home">
    <div>
      <div class="hdr">
        Sign Up
      </div>
      <p>Enter all the information below to obtain a new account.</p>
      <form @keyup.enter="signUp">
        <div>
          <label class="tablabel" for="usernameInput">
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
          <label class="tablabel" for="nameInput">
            Name:
          </label><br/>
          <input
            class="signinTxt"
            id="nameInput"
            type="text"
            v-model="name"
            required
            placeholderx="Enter your full name"
          />
        </div>
        <div>
          <label class="tablabel" for="emailInput">
            Email:
          </label><br/>
          <input
            class="signinTxt"
            id="emailInput"
            type="text"
            v-model="email"
            required
            placeholderx="Enter your email address"
          />
        </div>
        <div>
          <label class="tablabel" for="passwordInput">
            Password:
          </label><br/>
          <input
            class="signinTxt"
            id="passwordInput"
            type="password"
            v-model="password"
            required
            placeholderx="Enter Password"
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
          aria-label="Sign Up"
          class="button loadingBtn"
          @click.native="signUp"
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
      email: '',
      name: '',
      password: '',
      passverify: '',
    };
  },
  mounted() {
    // clear existing status message
    this.$store.dispatch('_auth/clearAuthenticationStatus');
  },
  mixins: [authMixin],
  computed: {
  },
  methods: {
    async signUp() {
      if (this.password !== this.passverify) {
        // console.log('unmatched');
        this.password = '';
        this.passverify = '';
        document.getElementById('passwordInput').focus();
        this.$store.dispatch('_auth/setAuthenticationError', { message: 'Passwords do not match' });
        return;
      }

      this.isLoadingBtn = true;
      await this.$store.dispatch('_auth/signUp', {
        username: this.username,
        password: this.password,
        attributes: {
          name: this.name,
          email: this.email,
        },
      });
      this.isLoadingBtn = false;

      if (!this.hasAuthenticationStatus) {
        this.$router.push('confirmSignUp');
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
