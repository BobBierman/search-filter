<template>
  <div class="home">
    <div class="hdr">
      Welcome
    </div>
    <div>
      <!--<a href="">Start searching </a> your favorite sites.-->
      Search Engine Filter lets you define sites to include or
      exclude from search results. Reduce your search to one or more distinct
      sites that you prefer or not.
      <p/>
      <a>
        <router-link to="/search">Start searching</router-link>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
