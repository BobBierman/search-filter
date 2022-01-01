<template>
  <div>
    <div class="">
      <p>You are signed in as {{ user.username }}.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  }
};
</script>
