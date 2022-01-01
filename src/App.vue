<template>
  <div id="app">
    <div class="container">
      <header>
        <div>
          <Slide :closeOnNavigation="true">
            <router-link class="nav-link" to="/home" exact>
              Home
            </router-link>
            <router-link class="nav-link" to="/search" exact>
              Search
            </router-link>
            <router-link class="nav-link" to="/account" exact>
              Account
            </router-link>
          </Slide>
        </div>
        <div class="headerTitle">
          Search Engine Filter
        </div>
      </header>
      <main>
        <!--<Search />
        <Favorites />-->
        <router-view />
        <p></p>
        <footer class="site-footer">
            <nav class="footer-nav">
              <div>
                <ul>
                  <li>
                    <router-link class="nav-link" to="/home" exact>
                      Home
                    </router-link>
                  </li>
                  <li>
                    <router-link class="nav-link" to="/search" exact>
                      Search
                    </router-link>
                  </li>
                  <li>
                    <router-link class="nav-link" to="/account" exact>
                      Account
                    </router-link>
                  </li>
                </ul>
                <!--
                <a href="/favorites">Favorites</a>
                <a href="/account">Account</a>
                -->
              </div>
            </nav>
          <div>
            <div class="footer-legal">
              &copy; Strong Hit Enterprises
              <div class="footer-legal">
                <img src="./assets/strong-hit.jpg"/>
              </div>
              a subsidiary of<br>
              &copy; Perpetual Change Ventures<br>
              All Rights Reserved
            </div>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu';
// import Search from './pages/Search.vue';
// import Favorites from './pages/Favorites.vue';
// import RobotBuilder from './build/RobotBuilder.vue';
// import { mapState } from 'vuex';

export default {
  name: 'App',
  /*  components: {
    RobotBuilder,
  },  */
  components: {
    Slide, // hamburger menu style
    // Search,
    // Favorites,
  },
  computed: {
    cart() {
      // return this.$store.state.cart;
      return this.$store.state.robots.cart;
    },
  },
  methods: {
  },
};
</script>

<style>
/*  @import "~bootstrap/dist/css/bootstrap.css";
  @import "~bootstrap-vue/dist/bootstrap-vue.css"; */
/*  ul {
    margin: 0;
  }*/
  img {
    width: 220px;
    height: 140px;
  }
  body {
    background: linear-gradient(to top, #333, #ccc);
    background-attachment: fixed;
    /*margin: 0;*/
  }
/*  .home {
    !*margin-top: 35px;*!
  }*/
  .bm-burger-button {
    position: absolute;
    display: inline;
    width: 24px;
    height: 18px;
    left: 18px;
    top: 22px;
    cursor: pointer;
    /*background-color: red;*/
  }
  .line-style {  /* burger menu lines. height controls thickness */
    position: absolute;
    height: 10%;
    left: 0;
    right: 0;
  }
  .vsa-list div {  /* accordion styles */
    --vsa-default-icon-size: .4;
  }
  /* .vsa-item__trigger__icon--is-default:before { how to change accordion close to reverse caret?
    transform: rotate(-45deg) translate3d(-8px, 22px, 0) !important;
    right: 0;
    transform-origin: 0
  } */
  a {
    color: royalblue;
    font-weight: normal;
    font-family: arial;
    text-align: left;
    font-size: 18px;
    /*text-transform: capitalize;*/
    cursor: pointer;
    text-decoration: underline;
  }
  /*
  .error {
    color: red;
    font-weight: bold;
    font-family: courier;
    text-align: left;
    font-size: 14px;
    !*border: 2px solid red;*!
    padding: 4px;
    width: fit-content;
    border-radius: 4px;
    background-color: #fff;
  } */
  button {
    background-color: blue;
    border: none;
    color: white;
    margin: 10px;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }
  .button:hover {
    cursor: pointer;
  }
  .signinTxt {
    width: 300px;
    font-size: 16px;
    height: 20px;
    margin-bottom: 12px;
  }
  .tablabel {
    border: 1px solid black;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    padding: 2px 6px 2px 6px;
    background-color: #ece7e7;
  }
  .hdr {
    font-size: 22px;
    font-weight: bolder;
    text-align: center;
    padding: 10px;
  }
</style>

<style scoped>
/*  .content {
    color: red;
    border: 2px solid blue;
  }*/
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  main {
    /*margin: 0 auto;*/
    padding: 0 12px 12px 12px;
    background-color: white;
    /*width: 964px;*/
    min-height: 300px;
  }
  header {
    background-color: #93b8fa;
    font-size: 12px;
    height: 40px;
    /*margin: 0 auto;*/
  }
  .navbar {
    background-color: #cbc7c7;
    height: 30px;
    margin: 0 auto;
    text-align: center;
    /*
    width: 964px;

    */
  }
  ul {
    display: inline-grid;
    list-style-type: square;
    color: white;
  }
  li {
    padding-bottom: 2px;
    text-align: left;
  }
  .nav-item {
    display: inline-block;
    padding: 5px 10px;
    font-size: 18px;
    border-right: 1px solid #bbb;
  }
  .nav-item.cart {
    position: relative;
    margin-left: auto;
    border-right: none;
    font-size: 22px;
  }
  .headerTitle {
    padding: 8px;
    position: absolute;
    right: 15px;
    font-size: 22px;
  }
  .logo {
    vertical-align: middle;
    height: 30px;
  }
  .nav-link {
    text-decoration: none;
    color: inherit;
    font-size: 15px;
    font-weight: bolder;
    font-family: verdana, courier, sans serif;
  }
  .router-link-active {
    color: white;
  }
  .container {
    display: block;
    margin: 10px auto 0 auto;
    justify-content: center;
  }
  .site-footer {
    /*padding: 30px;*/
    background: #000;
    text-align: center;
  }
  .footer-nav {
    text-align: center;
    font-size: 18px;
  }
  .footer-nav a {
    padding: 5px;
    color: #fff;
  }
  .footer-nav a:hover {
    color: rgba(8, 115, 245, 0.99)
  }
  .footer-legal {
    margin-top: 10px;
    color: #ffffff;
    font-size: 1.125rem
  }
</style>
