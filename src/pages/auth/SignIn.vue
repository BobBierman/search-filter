<template>
  <div class="home">
    <div>
      <div class="hdr">
        Sign In
      </div>
      <p v-show="getUsername">
        You are currently signed in as <b>{{ getUsername }}</b><br/><br/>
        <a @click="signOut">Sign Out</a><br/>
        <a @click="changePage('changePassword')">Change Password</a>
      </p>
      <div v-show="!getUsername">
        <!--<a @click="fillin">fill in</a><br/>-->
        <form id="signinForm" @keyup.enter="signIn">
          <div>
            <label class="tablabel" for="userNameInput">
              User Name:
            </label><br/>
            <input
              class="signinTxt"
              id="userNameInput"
              type="text"
              v-model="username"
              required
              placeholderx="Enter User Name"
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
          <div class="error">
            <v-alert />
          </div>
          <VueLoadingButton
            aria-label="Sign In"
            class="button loadingBtn"
            @click.native="signIn"
            :loading="isLoadingBtn"
            :styled="isStyledLoadingBtn"
          >Submit</VueLoadingButton>
        </form>
        <div>
          <p>
            <a @click="changePage('signUp')">Create an account</a>
            or
            <a @click="changePage('passwordReset')">Reset password</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import commonMixin from '@/shared/common-mixin';
import authMixin from './auth-mixin';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  mixins: [authMixin, commonMixin],
  created() {
    this.username = '';
    this.password = '';
  },
  methods: {
    ...mapActions('_favorites', ['fetchFavorites']),
    ...mapActions('_users', ['fetchUsers']),
    fillin() {
      this.username = 'biermarm';
      this.password = 'TestAwsPw1';
    },
    async signIn() {
      // replaced submit button with VueLoadingButton so need to manually trigger validation
      if (!document.getElementById('signinForm').reportValidity()) {
        return;
      }

      this.isLoadingBtn = true;
      console.log('SignIn page signing in...');
      await this.$store.dispatch('_auth/signIn', {
        username: this.username,
        password: this.password,
      });
      console.log('SignIn page signed in.');
      this.isLoadingBtn = false;
      if (!this.hasAuthenticationStatus) {
        await this.$store.dispatch('_favorites/fetchFavorites', null, { root: true });
        await this.$store.dispatch('_users/fetchUsers', null, { root: true });
        // console.log('SignIn page favorites fetched', this.$store.getters.getFavorites);
        this.$router.push('search');
        // this.changePage('signIn');
      }
    },
    async signOut() {
      await this.$store.dispatch('_auth/signOut');
      this.username = '';
      this.password = '';
      this.changePage('signIn');
    },
  },
};
</script>

<style scoped>
  .loadingBtn {
    font-size: 16px;
    margin-right: 14px;
  }
  .fixed {
    display:block;
    width: 500px;
    word-wrap: break-word;
  }
</style>
