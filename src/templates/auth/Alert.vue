<template>
  <div>
    <p class="alert"
      v-show="hasAuthenticationStatus">
      {{ authenticationStatus.message }}
    </p>
    <p class="success"
      v-show="hasAuthenticationSuccess">
      {{ getAuthMessage }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {
    // clear existing status message
    this.$store.dispatch('_auth/clearAuthenticationStatus');
  },
  computed: {
    ...mapGetters('_auth', [
      'getAuthMessage',
      'authenticationStatus',
      'hasAuthenticationStatus',
      'hasAuthenticationSuccess',
    ]),
  },
};
</script>

<style scoped>
  .alert {
    color: red;
    font-weight: bold;
    font-family: courier, sans-serif;
    text-align: left;
    font-size: 14px;
    border: 2px solid red;
    padding: 8px;
    margin-top: 2px;
    margin-bottom: 8px;
    width: fit-content;
    border-radius: 6px;
    background-color: #ece7e7;
  }
  .success {
    color: green;
    font-weight: bold;
    font-family: courier, sans-serif;
    text-align: left;
    font-size: 14px;
    border: 2px solid green;
    padding: 8px;
    margin-top: 2px;
    margin-bottom: 8px;
    width: fit-content;
    border-radius: 6px;
    background-color: #ece7e7;
  }
</style>
