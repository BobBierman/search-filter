<template>
  <div class="home">
    <!--Page: {{ getPage }}-->
    <div>
      <SignIn v-if="getPage === 'signIn'"/>
      <SignOut v-if="getPage === 'signOut'"/>
      <SignUp v-if="getPage === 'signUp'"/>
      <ChangePassword v-if="getPage === 'changePassword'"/>
      <ConfirmPasswordReset v-if="getPage === 'confirmPasswordReset'"/>
      <ConfirmSignup v-if="getPage === 'confirmSignup'"/>
      <PasswordReset v-if="getPage === 'passwordReset'"/>
      <Amplify v-if="getPage === 'amplify'"/>
    </div>
    <div v-if="isAdmin">
      <hr />
      <vsa-list :init-active="false" :auto-collapse="true"  v-if="getSession">
        <vsa-item>
          <vsa-heading>
            Auth pages
          </vsa-heading>
          <vsa-content>
            <ul>
              <li>
                <a @click="changePage('signIn')">Sign in</a>
              </li>
              <li>
                <a @click="changePage('signOut')">Sign Out</a>
              </li>
              <li>
                <a @click="changePage('signUp')">Sign Up</a>
              </li>
              <li>
                <a @click="changePage('confirmSignup')">Confirm Signup</a>
              </li>
              <li>
                <a @click="changePage('changePassword')">Change Password</a>
              </li>
              <li>
                <a @click="changePage('passwordReset')">Password Reset</a>
              </li>
              <li>
                <a @click="changePage('confirmPasswordReset')">Confirm Password Reset</a>
              </li>
              <li>
                <a @click="changePage('amplify')">Amplify</a>
              </li>
            </ul>
          </vsa-content>
        </vsa-item>
        <vsa-item v-if="getUser">
          <vsa-heading>
            getUser.signInUserSession.idToken.jwtToken
          </vsa-heading>
          <vsa-content>
            {{ getUser.signInUserSession.idToken.jwtToken }}
            <br /><br />
            expired:
            {{ isTokenExpired }}
          </vsa-content>
        </vsa-item>
        <vsa-item v-if="getUser">
          <vsa-heading>
            getUser.signInUserSession.idToken.payload
          </vsa-heading>
          <vsa-content>
            {{ getUser.signInUserSession.idToken.payload }}
          </vsa-content>
        </vsa-item>
        <vsa-item v-if="getUser">
          <vsa-heading>
            getUser.signInUserSession.refreshToken.token
          </vsa-heading>
          <vsa-content>
            {{ getUser.signInUserSession.refreshToken.token }}
          </vsa-content>
        </vsa-item>
        <vsa-item v-if="getUser">
          <vsa-heading>
            getUser.signInUserSession.accessToken.jwtToken
          </vsa-heading>
          <vsa-content>
            {{ getUser.signInUserSession.accessToken.jwtToken }}
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>
  </div>
</template>

<script>
import authMixin from './auth-mixin';
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';
import SignOut from './SignOut.vue';
import ChangePassword from './ChangePassword.vue';
import ConfirmPasswordReset from './ConfirmPasswordReset.vue';
import ConfirmSignup from './ConfirmSignUp.vue';
import PasswordReset from './PasswordReset.vue';
import Amplify from './Amplify.vue';

export default {
  name: 'Auth',
  props: {
    msg: String,
  },
  mixins: [authMixin],
  components: {
    SignIn,
    SignUp,
    SignOut,
    ChangePassword,
    PasswordReset,
    ConfirmPasswordReset,
    ConfirmSignup,
    Amplify,
  },
  data() {
    return {
      forceRecompute: 0,
    };
  },
  computed: {
    /* eslint-disable vue/no-side-effects-in-computed-properties */
    isAdmin() {
      this.forceRecompute += 1;
      // console.log('isAdmin', this.$store.getters['_auth/isAuthorized']('security', 'admin'));
      return this.$store
        .getters['_auth/isAuthorized']('security', 'admin');
    },
  },
  methods: {
  },
};
</script>

<style scoped>
  .loadingBtn {
    font-size: 16px;
    margin-right: 14px;
  }
</style>
