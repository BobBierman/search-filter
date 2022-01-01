import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/pages/Home.vue';
import Account from '@/pages/Account.vue';
import Search from '@/pages/Search.vue';
import Favorites from '@/pages/Favorites.vue';
// import Dashboard from '@/pages/Dashboard.vue';
import SignIn from '@/pages/auth/SignIn.vue';
import SignUp from '@/pages/auth/SignUp.vue';
import SignOut from '@/pages/auth/SignOut.vue';
import ConfirmSignUp from '@/pages/auth/ConfirmSignUp.vue';
import PasswordReset from '@/pages/auth/PasswordReset.vue';
import ChangePassword from '@/pages/auth/ChangePassword.vue';
import ConfirmPasswordReset from '@/pages/auth/ConfirmPasswordReset.vue';

Vue.use(Router);

export default new Router({
  // mode turns on history routing and removes #, but requires configuring the
  // web server to always serve up index.html..   add a line
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeSearch',
      components: {
        default: Search,
      },
      meta: { title: 'HomeSearch', auth: false },
    },
    {
      path: '/home',
      name: 'Home',
      components: {
        default: Home,
      },
      meta: { title: 'Home', auth: false },
    },
    {
      path: '/account',
      name: 'Account',
      components: {
        default: Account,
      },
      meta: { title: 'Account', auth: false },
    },
    {
      path: '/search',
      name: 'Search',
      components: {
        default: Search,
      },
      meta: { title: 'Search', auth: false },
    },
    {
      path: '/favorites',
      name: 'Favorites',
      components: {
        default: Favorites,
      },
      meta: { title: 'Favorites', auth: false },
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn,
      meta: { title: 'Sign In', auth: false },
    },
    {
      path: '/signOut',
      name: 'signOut',
      component: SignOut,
      meta: { title: 'Sign Out', auth: true },
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp,
      meta: { title: 'Sign Up', auth: false },
    },
    {
      path: '/confirmSignUp',
      name: 'confirmSignUp',
      component: ConfirmSignUp,
      meta: { title: 'Confirm SignUp', auth: false },
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: ChangePassword,
      meta: { title: 'Change Password', auth: true },
    },
    {
      path: '/passwordReset',
      name: 'passwordReset',
      component: PasswordReset,
      meta: { title: 'Password Reset', auth: false },
    },
    {
      path: '/confirmPasswordReset',
      name: 'confirmPasswordReset',
      component: ConfirmPasswordReset,
      meta: { title: 'Confirm Password Reset', auth: false },
    },
  ],
});
