<template>
  <div>
    <p v-show="getUsername">
      You are currently signed in as <b>{{ getUsername }}</b><br/><br/>
      Perms: <b>{{ getUserProps }}</b><br/><br/>
    </p>
    <VueLoadingButton
      aria-label="User Attributes"
      class="button loadingBtn"
      @click.native="userAttributes"
      :loading="isLoadingBtn"
      :styled="isStyledLoadingBtn"
    >User Attributes</VueLoadingButton>
    <div v-show="getUserAttributes">
      <b>Attributes</b><br /> {{ getUserAttributes }}
    </div>
  </div>
</template>

<script>
import authMixin from './auth-mixin';

export default {
  data() {
    return {
      attrs: null,
    };
  },
  mixins: [authMixin],
  methods: {
    async userAttributes() {
      this.isLoadingBtn = true;
      await this.$store.dispatch('_auth/userAttributes');
      this.isLoadingBtn = false;
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
