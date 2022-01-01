import Auth from '@aws-amplify/auth';
// import aws from '@aws-sdk/client-cognito-identity';
// import ISP from 'amazon-cognito-identity-js';
// import Amplify from '@aws-amplify/core';

// const { Logger } = Amplify.Logger;
// Logger.LOG_LEVEL = 'DEBUG'; // to show detailed logs from Amplify library
// const logger = new Logger('store:auth');

export default {
  namespaced: true,
  // initial state
  state: {
    page: 'signIn',
    user: null,
    isAuthenticated: false,
    authMessage: null,
    authenticationStatus: null,
    userSession: null,
    userAttributes: [],
    tokenExpiredOffset: 0,
  },
  getters: {
    getPage: (state) => state.page,
    getUserAttributes: (state) => state.userAttributes,
    getUserSession: (state) => state.userSession,
    getTokenExpiredOffset: (state) => state.tokenExpiredOffset,
    getUser: (state) => {
      if (state.user) {
        return state.user;
      }
      return '';
    },
    getUsername: (state) => {
      if (state.user?.username) {
        return state.user.username;
      }
      return '';
    },
    getSession: (state) => {
      if (state.user?.signInUserSession) {
        return state.user.signInUserSession;
      }
      return null;
    },
    getIdToken: (state) => {
      if (state.user?.signInUserSession?.idToken?.jwtToken) {
        return state.user.signInUserSession.idToken.jwtToken;
      }
      return null;
    },
    isAuthorized: (state) => (prop, perm) => {
      // profile perms have format: propertyName:perm1|perm2 with || as the property delimiter
      // e.g. security:admin|superuser||otherprop:this|that||
      if (state.user?.signInUserSession?.idToken?.payload) {
        const { profile } = state.user.signInUserSession.idToken.payload;
        if (profile) {
          const ndxProp = profile.indexOf(`${prop}:`);
          if (ndxProp >= 0) {
            const ndxPerm = ndxProp + prop.length + 1;
            let ndxPermEnd = profile.indexOf('||', ndxPerm);
            if (ndxPermEnd < 0) {
              ndxPermEnd = profile.length;
            }
            const perms = profile.substring(ndxPerm, ndxPermEnd).split('|');
            // console.log('perms: ', ndxPerm, ndxPermEnd, perms, perms.includes(perm));
            return perms.includes(perm);
          }
        }
      }
      return false;
    },
    isTokenExpired(state, getters) {
      // const idToken = localStorage.getItem('idToken');
      const idToken = getters.getIdToken;
      if (!idToken) {
        return true;
      }

      const dtSecs = Math.trunc(new Date().getTime() / 1000);
      const splitToken = idToken.split('.');
      const decodeToken = atob(splitToken[1]);
      const tokenObj = JSON.parse(decodeToken);
      const tokenExpires = (tokenObj.exp - getters.getTokenExpiredOffset);
      console.log(dtSecs, tokenExpires, '\n',
        new Date(dtSecs * 1000), '\n',
        new Date(tokenExpires * 1000), '\n',
        'expires in: ', ((tokenExpires - dtSecs) / 60).toFixed(1),
        ', expired: ', (dtSecs > tokenExpires));
      if (dtSecs > tokenExpires) {
        return true;
        // this.tokenRefresh();
        // console.log('token updated');
      }
      return false;
    },
    getAuthHeader: (state) => `Bearer ${state.user.signInUserSession.idToken.jwtToken}`,
    authenticatedUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    authenticationStatus: (state) => (state.authenticationStatus
      ? state.authenticationStatus
      : { variant: 'secondary' }),
    getAuthMessage: (state) => state.authMessage,
    hasAuthenticationSuccess: (state) => !!state.authMessage,
    hasAuthenticationStatus: (state) => !!state.authenticationStatus,
    hasAuthenticationMessage: (state) => !!state.authenticationStatus
      && !!state.authenticationStatus.message
      && state.authenticationStatus.message.length > 0,
  },
  mutations: {
    setAuthenticationError(state, err) {
      // logger.debug('auth error: {}', err);
      state.authenticationStatus = {
        state: 'failed',
        message: err.message,
        variant: 'danger',
      };
    },
    setPage: (state, page) => {
      state.page = page;
    },
    setUserAttributes: (state, attrs) => {
      state.userAttributes = attrs;
    },
    setUserSession: (state, session) => {
      state.userSession = session;
    },
    setAuthMessage: (state, msg) => {
      state.authMessage = msg;
    },
    setTokenExpiredOffset: (state, offset) => {
      state.tokenExpiredOffset = offset;
    },
    clearAuthenticationStatus: (state) => {
      state.authenticationStatus = null;
      state.authMessage = null;
    },
    setUserAuthenticated(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    clearAuthentication(state) {
      state.user = null;
      state.userId = null;
      state.isAuthenticated = false;
    },
    setIdToken: (state, token) => {
      state.user.signInUserSession.idToken.jwtToken = token;
    },
    setAccessToken: (state, token) => {
      state.user.signInUserSession.accessToken.jwtToken = token;
    },
    setPayload: (state, payload) => {
      state.user.signInUserSession.idToken.payload = payload;
    },
  },
  actions: {
    clearAuthenticationStatus: (context) => {
      context.commit('clearAuthenticationStatus', null);
    },
    setAuthenticationError: (context, err) => {
      context.commit('setAuthenticationError', err);
    },
    setPage: (context, page) => {
      context.commit('setPage', page);
    },
    signIn: async (context, params) => {
      // logger.debug('signIn for {}', params.username);
      context.commit('clearAuthenticationStatus', null);
      try {
        const user = await Auth.signIn(params.username, params.password);
        context.commit('setUserAuthenticated', user);
      } catch (err) {
        context.commit('setAuthenticationError', err);
      }
    },
    signOut: async (context) => {
      try {
        await Auth.signOut();
        context.commit('setAuthMessage', 'You have been signed out.');
      } catch (err) {
        // logger.error('error during sign out: {}', err);
      }
      context.commit('clearAuthentication', null);
      context.commit('setFavorites', {}, { root: true });
    },
    signUp: async (context, params) => {
      context.commit('clearAuthenticationStatus', null);
      try {
        await Auth.signUp(params);
        context.commit('clearAuthentication', null);
      } catch (err) {
        context.commit('setAuthenticationError', err);
      }
    },
    confirmSignUp: async (context, params) => {
      // logger.debug('confirm signup for {}', params.username);
      context.commit('clearAuthenticationStatus', null);
      try {
        await Auth.confirmSignUp(params.username, params.code);
      } catch (err) {
        context.commit('setAuthenticationError', err);
      }
    },
    confirmResend: async (context, params) => {
      context.commit('clearAuthenticationStatus', null);
      try {
        await Auth.resendSignUp(params.username);
        context.commit('setAuthMessage', 'Resend request has been submitted. '
          + 'Check your email for the new verification code.');
      } catch (err) {
        context.commit('setAuthenticationError', err);
      }
    },
    passwordReset: async (context, params) => {
      context.commit('clearAuthenticationStatus', null);
      try {
        await Auth.forgotPassword(params.username);
        context.commit('setAuthMessage', 'Reset password request has been sent. '
          + 'Check your email for the new verification code.');
      } catch (err) {
        context.commit('setAuthenticationError', err);
      }
    },
    confirmPasswordReset: async (context, params) => {
      context.commit('clearAuthenticationStatus', null);
      try {
        await Auth.forgotPasswordSubmit(
          params.username,
          params.code,
          params.password,
        );
        context.commit('setAuthMessage', 'Password has been changed. You may log in with the new password.');
      } catch (err) {
        context.commit('setAuthenticationError', err);
      }
    },
    passwordResetResend: async (context, params) => {
      context.commit('clearAuthenticationStatus', null);
      try {
        await Auth.passwordResetResend(params.username);
      } catch (err) {
        context.commit('setAuthenticationError', err);
      }
    },
    passwordChange: async (context, params) => {
      // logger.debug('password change for {}', context.state.user.username);
      context.commit('clearAuthenticationStatus', null);
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(
          user,
          params.currentPassword,
          params.newPassword,
        );
        context.commit('setAuthMessage', 'Password has been changed. You may log in with the new password.');
      } catch (err) {
        context.commit('setAuthenticationError', err);
      }
    },
    userAttributes: async (context) => {
      // context.commit('clearAuthenticationStatus', null);
      try {
        const user = await Auth.currentAuthenticatedUser();
        const attrs = await Auth.userAttributes(user);
        context.commit('setUserAttributes', attrs);
      } catch (err) {
        context.commit('setAuthenticationError', err);
      }
    },
    refreshUserSession: async (context) => {
      try {
        console.log('refreshUserSession1: ', new Date().getTime());
        const session = await Auth.currentSession();
        console.log('refreshUserSession2: ', new Date().getTime());
        // console.log('userSession', session);
        context.commit('setUserSession', session);
        context.commit('setIdToken', session.idToken.jwtToken);
        context.commit('setAccessToken', session.accessToken.jwtToken);
        // context.commit('setPayload', session.accessToken.payload); // does not contain profile?
      } catch (err) {
        context.commit('setAuthenticationError', err);
      }
    },
    /* updateUserAttributes: async (context, perms) => {
      var params = {
        UserAttributes: [ /!* required *!/
          {
            Name: 'STRING_VALUE', /!* required *!/
            Value: 'STRING_VALUE'
          },
          /!* more items *!/
        ],
        UserPoolId: 'STRING_VALUE', /!* required *!/
        Username: 'STRING_VALUE', /!* required *!/
        ClientMetadata: {
          '<StringType>': 'search-filter',
          /!* '<StringType>': ... *!/
        }
      };
      try {
        const aISP = new aws.CognitoIdentityClient()
        await aISP. ISP.adminUpdateUserAttributes(params);
      } catch (err) {
        console.log('updateUserAttributes', err);
      }
    }, */
  },
};
