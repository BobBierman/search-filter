<template>
  <div class="home">
    <div>
      <div class="hdr">
        Search
      </div>
      <div>
        <v-dialog />
        <p v-show="getUsername">You are currently signed in as <b>{{ getUsername }}</b></p>
        <p v-show="!getUsername">
          You are not currently signed in.
          Click <a @click="login">here</a> to sign in.
        </p>
      </div>
      <div id="divSearchText" class="header">
        <input class="searchTxt" type="search" id="searchText"
               v-model="txtSearch"
               @keyup.enter="doSearch"
               placeholder="Search..."/>
        <button class="button" @click="doSearch">Search</button>
      </div>
      <div class="row">
        <div class="engineType">
          <div v-for="(engine, index) in engines" :key="index"
               :class="{selectedFilter: engineType === engine.name}">
            <label v-bind:for="engine.name">
              <input
                :id="engine.name"
                type="radio"
                :value="engine.name"
                v-model="engineType">
              <!--:checked="engine.checked"
              @input="engine.checked = $event.target.checked"
              v-on:input="engine.value = $event.target.value"-->
              {{engine.name}}
            </label>
          </div>
        </div>
        <div class="filterType">
          <div :class="{selectedFilter: filterType === 'include'}">
            <label for="include">
              <input type="radio" id="include" value="include"
                     v-model="filterType">
              Search includes only these sites
            </label>
          </div>
          <div :class="{selectedFilter: filterType === 'exclude'}">
            <label for="exclude">
              <input type="radio" id="exclude" value="exclude"
                     v-model="filterType">
              Search excludes these sites
            </label>
          </div>
        </div>
        <div>
          <h3>Add Site:</h3>
        </div>
        <div class="header">
          <input class="siteTxt" type="search" :id="domainName"
                 v-model="txtDomainName"
                 @keyup.enter="addSite"
                 placeholder="Domain Name (e.g. mysite.com)">
          <input class="siteTxt" type="search" :id="siteName"
                 v-model="txtSiteName"
                 @keyup.enter="addSite"
                 placeholder="Site Name (optional)">
          <br />
          <button @click="addSite">
            Add
          </button>
          <button @click="removeAll">
            New
          </button>
        </div>
      </div>
      <div class="row bgfav">
        <div v-show="sites.length > 0">
          <b>{{filterType}}</b>/
          <input class="favTxt" type="text" id="favText"
                 v-model="txtFavName"
                 @keyup.enter="saveFav"
                 placeholder="Enter a topic name to save">
          <span class="save" v-show="modified"> *</span>
          <button @click="saveFav">
            Save
          </button>
          <div class="save">{{saveMsg}}</div>
        </div>
        <div>
          <table v-show="sites.length > 0">
            <tr>
              <th>
                Site
              </th>
              <th>
                Action
              </th>
            </tr>
            <tr v-for="(sites, index) in sites" :key="index">
              <td :class="{ 'strikethru' : !sites.filter, '' : sites.filter }">
                {{displayName(sites.name,sites.url)}}
              </td>
              <td>
                <button @click="toggleFilter(sites.id)">
                  {{ sites.filter ? 'Disable' : 'Enable'}}
                </button>
                <button @click="removeFromList(index)">Remove</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="row">
        <div>
          <h2>Favorites:</h2>
        </div>
        <div id="favError" class="error">
        </div>
        <div v-show="loading">
          <loading-progress
            :progress=.5
            :indeterminate=true
            :counter-clockwise=false
            :hide-background=true
            size="56"
            rotate
            fillDuration="2"
            rotationDuration="1"
          />
        </div>
        <div v-show="!loading">
          <table v-show="getFavoriteTopics.length > 0">
            <tr>
              <th>
                Site
              </th>
              <th>
                Action
              </th>
            </tr>
            <tr v-for="(fav, index) in getFavoriteTopics" :key="index">
              <td>
                <a @click="loadFav(fav)">{{fav}}</a>
              </td>
              <td class="center">
                <button @click="loadFav(fav)">Load</button>
                <button @click="deleteFav(fav)">Delete</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import commonMixin from '@/shared/common-mixin';
import authMixin from './auth/auth-mixin';

/* eslint-disable no-console, no-bitwise, dot-notation, max-len */

export default {
  name: 'Search',
  data() {
    return {
      selectedPartIndex: 0,
      forceRecompute: 0,
      sites: [],
      engines: [
        {
          name: 'Google',
          url: 'http://google.com/search?q=',
          checked: true,
          value: {},
        },
        {
          name: 'Bing',
          url: 'http://bing.com/search?q=',
          checked: false,
          value: {},
        },
      ],
      engineType: 'Google',
      filterType: 'include',
      domainName: 'domainName',
      siteName: 'siteName',
      txtSearch: '',
      txtDomainName: '',
      txtSiteName: '',
      currentFavName: '',
      txtFavName: '',
      saveMsg: '',
      modified: false,
      loading: false,
    };
  },
  created() {
    // console.log('fav store', this.$store.getters['getFavorites']);
    // console.log('fav store !!', !this.$store.getters['getFavorites']);
    // if (!this.$store.getters['getFavorites']) {
    if (this.$store.getters['_auth/getUsername']) {
      this.loading = true;
      // await this.syncWait(5000);
      // console.log('search created fetching favorites');
      // console.log('favorites in store1', this.$store.getters['getFavorites']);
      // console.log('favorites in store2', Object.keys(this.$store.getters['getFavorites']));

      /* figure out why this isn't working - erases the localstorage favorites
        if (this.$store.getters['getFavorites']
          && Object.keys(this.$store.getters['getFavorites'])) {
        console.log('Search created() favorites in store', Object.keys(this.$store.getters['getFavorites']));
      } else { */
      console.log('Search created() favorites fetched from db');
      this.$store.dispatch('_favorites/fetchFavorites', null, { root: true });
      // }
      this.loading = false;
    }
    // console.log('Search - favorites in store', this.$store.getters.getFavorites);
    // }
    // this.fetchFavorites();
  },
  updated() {
    // console.log('updated', process.env.NODE_ENV, process.env.BASE_URL, process.env.VUE_APP_BARNEY, process.env.VUE_APP_BETTY);
    // console.log('config', process.env.VUE_APP_IDENTITY_POOL_ID, process.env.VUE_APP_AWS_REGION, process.env.VUE_APP_USER_POOL_ID, process.env.VUE_APP_USER_POOL_ID);
  },
  props: {
    msg: String,
  },
  mixins: [authMixin, commonMixin],
  computed: {
    ...mapGetters(['getFavorites']),
    ...mapGetters('_auth', ['getUsername']),
    getFavoriteTopics() {
      /* eslint-disable vue/no-side-effects-in-computed-properties */
      this.forceRecompute += 1;
      // return Object.keys(this.favorites);
      // return Object.keys(this.$store.state.favorites);
      // console.log('computed', this.getFavs());

      // return Object.keys(this.$store.state.favorites);
      return Object.keys(this.$store.getters['getFavorites']);
    },
    getSaveCatg() {
      return this.currentCatg ? this.currentCatg : this.filterType;
    },
  },
  methods: {
    // ...mapActions(['getFavs']),
    ...mapActions('_favorites', ['updateFavorites']),
    showAlert(txt, elmName) {
      this.$modal.show('dialog', {
        title: 'Notice',
        text: txt,
        buttons: [
          {
            title: 'Close',
            handler: () => {
              this.$modal.hide('dialog');
              if (elmName) {
                document.getElementById(elmName).focus();
              }
            },
          },
        ],
      });
    },
    login() {
      this.$router.push({ path: '/account', query: { page: 'signIn' } });
    },
    hashCode(str) {
      let hash = 0;
      let i;
      let chr;
      for (i = 0; i < str.length; i += 1) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash.toString().replace('-', '');
    },
    getUniqueId(str) {
      return `site_${new Date().getTime()}_${this.hashCode(str)}`;
    },
    toggleFilter(id) {
      const site = this.sites.find((item) => item.id === id);
      site.filter = !site.filter;
    },
    removeFromList(ndx) {
      this.sites.splice(ndx, 1);
      this.modified = true;
      this.saveMsg = '';
    },
    addSite() {
      const url = this.txtDomainName;
      if (url === '') {
        this.showAlert('Please enter a site domain name (e.g. mysite.com)', this.domainName);
        return;
      }
      const name = this.txtSiteName;
      this.addNewSite(name, url);
      this.txtDomainName = '';
      this.txtSiteName = '';
    },
    addNewSite(name, url) {
      if (!name) {
        name = url;
      }
      // console.log('addNew 1');
      this.sites.push({
        id: this.getUniqueId(url),
        name,
        url,
        filter: true,
      });
      this.modified = true;
      this.saveMsg = '';
      // console.log('addNew 2');
      // if a current fav is selected, add it to that array
      // ?? do we want to do this?
      // it throws "Error: [vuex] do not mutate vuex store state outside mutation handlers."
      // if saving an existing fav, need to replace the existing via a mutator splice
    },
    displayName(name, url) {
      if (!name || name === url) {
        return url;
      }
      return `${name} - ${url}`;
    },
    removeAll() {
      this.sites = [];
      this.txtFavName = '';
      this.currentFavName = '';
      // this.$forceUpdate();
    },
    // save a list
    saveFav() {
      if (this.txtFavName === '') {
        this.showAlert('Please enter a name for this Favorite', 'favText');
        return;
      }
      if (this.sites.length === 0) {
        this.showAlert('Please add at least one site for this Favorite');
        return;
      }
      const fav = {
        name: this.txtFavName,
        type: this.filterType.substring(0, 1).toUpperCase(),
        sites: this.sites,
        // sites: this.sites.map((item) => ({ name: item.name, url: item.url })),
      };
      // the favorite name has changed or is new
      if (this.txtFavName !== this.currentFavName) {
        // if (this.favorites[this.txtFavName]) {
        if (this.$store.state.favorites[this.txtFavName]) {
          let exists = '';
          if (this.currentFavName) {
            exists = `<br/>&#x2022; Restore the original favorite name of <b>${this.currentFavName}</b>`;
          }
          // alert(`An ${this.currentCatg} favorite named "${this.txtFavName}" already exists. \
          // Load that favorite and modify it as needed${exists} or enter a new unique favorite name.`);
          this.showAlert(`A favorite named <b>${this.txtFavName}</b> already exists. Options are: \
<br/>&#x2022; Load that favorite and modify it as needed${exists} \
<br/>&#x2022; Enter a new unique favorite name`);
          return;
        }
      }
      // console.log('save sites', this.sites, fav);
      this.$store.commit('updateFavs', fav);
      this.$store.dispatch('_favorites/updateFavorites', this.$store.state.favorites);
      // this.updateFavorites(this.$store.state.favorites);
      // console.log('saved');
      this.saveMsg = 'Saved'; // needs fixing does not work when saving a new name
      this.saved = true;
      this.modified = false;
    },
    // delete a saved list
    deleteFav(favName) {
      /*
    ,
      configureWebpack: {
        resolve: {
          alias: {
            'vue$': 'vue/dist/vue.js' // full version include compiler to compile templates on the client
          }
        }
      }
      */
      /*
      this.$modal.show(
        {
          template: `
      <div>
        <h1>This is created  inline</h1>
        <p>{{ text }}</p>
        <button class="btn" @click="cancel">Cancel</button>
        <button class="btn" @click="confirm">Confirm</button>
      </div>
    `,
          props: ['text'],
          methods: {
            cancel() {
              this.$modal.hide('text');
            },
            confirm() {
              console.log('confirmed');
            },
          },
        },
        { text: 'This text is passed as a property' },
        {
          height: 'auto',
          draggable: true,
          adaptive: true,
          width: '350px',
        },
        // { 'before-close': (event) => {}, }
      ); */

      this.$modal.show('dialog', {
        title: 'Confirm Delete',
        text: `Delete favorite <b>${favName}</b>?`,
        draggable: true,
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog');
            },
          },
          {
            title: 'Confirm',
            handler: () => {
              delete this.favorites[favName];
              // $forceUpdate won't work because it does not clear the computed cache. the hack following it works
              // this.$forceUpdate();
              this.forceRecompute += 1;
              this.$modal.hide('dialog');
            },
          },
        ],
      });

      // delete this.favorites[topic];
      // this.$forceUpdate();
    },
    // preload a saved list
    loadFav(favName) {
      this.removeAll();
      this.currentFavName = favName;
      this.txtFavName = favName;

      const fav = JSON.parse(JSON.stringify(this.$store.state.favorites[favName]));
      this.sites = fav.sites;
      this.filterType = fav.type.toLowerCase() === 'i' ? 'include' : 'exclude';
      this.modified = false;
      this.saveMsg = '';
      document.getElementById('divSearchText').scrollIntoView();
    },
    doSearch() {
      // const searchText = document.getElementById('searchText').value;
      const searchText = this.txtSearch;
      if (searchText === '') {
        this.showAlert('Please enter your search text', 'searchText');
        return;
      }
      // console.log(this.engines);
      // console.log('search: ', searchText);
      this.engines.forEach((engine) => {
        // if (engine.checked) {
        if (engine.name === this.engineType) {
          const s = `${engine.url}${searchText}${this.fGetFilter()}`;
          window.open(s, `${engine.name}_${new Date().getTime()}_${this.hashCode(engine.name)}`);
        }
      });
    },
    fGetFilter() {
      let str = '';
      this.sites.forEach((item) => {
        if (item.filter) {
          if (this.filterType === 'include') {
            str += `${(str.length > 0) ? '%20OR' : ''}%20site:${item.url}`;
          }
          if (this.filterType === 'exclude') {
            str += `%20-${item.url}`;
          }
        }
      });
      return str;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

<style scoped>
  .home {
    text-align: center;
  }
  .center {
    text-align: center;
    width: 40%;
  }
  h2 {
    text-align: left;
  }
  h3 {
    text-align: left;
    font-size: 18px;
    margin: 0;
  }
  hr {
    text-align: center;
    color: black;
    width: 60%;
  }
  .header {
    /*background-color: #bbbbbb;*/
    padding: 3px;
    text-align: left;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    border: thin black;
    width: 100%;
  }
  td, th {
    border: 1px solid #000; /*border: 1px solid #dddddd;*/
    /*border: thin black;*/
    text-align: left;
    padding-left: 4px;
  }
  .tdsite {
    font-family: verdana sans-serif;
    font-size: 20px;
    color: mediumaquamarine;
  }
  .bgfav {
    border: 1px solid #000;
    background-color: #c4edf1;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  th {
    background-color: lightgray;
    color: black;
    text-align: center;
  }
  tr:nth-child(even) {
    /*background-color: #dddddd;*/
  }
  .strikethru {
    text-decoration: line-through;
    background-color: #ff0000;
    color:#fff;
  }
  /* a {
    font-size: 16px;
    text-decoration: underline;
    color:royalblue;
    cursor: pointer;
  }*/
  label {
    text-align: left;
    font-weight: bold;
  }
  .save {
    color: red;
    font-weight: normal;
    font-family: verdana, serif;
    font-size: 16px;
  }
  .searchTxt {
    width: 90%;
    font-size: 16px;
  }
  .favTxt {
    width: 50%;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .siteTxt {
    width: 90%;
    font-size: 16px;
    margin-bottom: 4px;
  }
  .engineType {
    border: 1px solid black;
    border-radius: 5px;
    text-align: left;
    margin-top: 4px;
    margin-bottom: 15px;
    width: 200px;
  }
  .filterType {
    border: 1px solid black;
    border-radius: 5px;
    text-align: left;
    margin-bottom: 15px;
    width: 300px;
  }
  .padleft {
    padding-left: 20px;
    text-align: left;
  }
  .selectedFilter {
    /*border: 1px solid red;*/
    background-color: #ffff00;
    display:inline-block;
    padding: 0 10px 0 0;
  }
  /*
  .favs {
    color: black;
    font-weight: normal;
    font-family: verdana sans-serif;
    text-align: left;
    font-size: 18px;
    !*text-transform: capitalize;*!
    cursor: pointer;
    text-decoration: underline;
  } */
</style>
