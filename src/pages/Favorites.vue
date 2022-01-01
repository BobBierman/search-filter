<template>
  <div class="home">
    <div id="divSearchText" class="header">
      Favorites
    </div>
  </div>
</template>

<script>
/* eslint-disable no-alert, no-console, no-bitwise, dot-notation, max-len */
export default {
  name: 'Search',
  data() {
    return {
      selectedPartIndex: 0,
      sites: [],
      filterType: 'include',
      domainName: 'domainName',
      siteName: 'siteName',
      currentTopic: '',
    };
  },
  created() {
  },
  props: {
    msg: String,
  },
  computed: {
    getCategories() {
      return Object.keys(this.preloads.categories);
    },
  },
  methods: {
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
    },
    addSite() {
      const url = document.getElementById(this.domainName).value;
      if (url === '') {
        alert('Please enter a site domain name (e.g. mysite.com)');
        return;
      }
      const name = document.getElementById(this.siteName).value;
      this.addNewSite(name, url);
      document.getElementById(this.siteName).value = '';
      document.getElementById(this.domainName).value = '';
    },
    addNewSite(name, url) {
      if (!name) {
        name = url;
      }
      this.sites.push({
        id: this.getUniqueId(url),
        name,
        url,
        filter: true,
      });
    },
    displayName(name, url) {
      if (!name || name === url) {
        return url;
      }
      return `${name} - ${url}`;
    },
    removeAll() {
      this.sites = [];
      // this.$forceUpdate();
    },
    // preload a saved list
    preloadFavs(catg, topic) {
      this.removeAll();
      // console.log(Object.values(this.preloads.categories[catg][topic]));
      this.currentTopic = topic;

      const site = this.preloads.categories[catg][topic];
      for (let i = 0; i < site.length; i += 1) {
        /* eslint-disable prefer-destructuring */
        // const [name, url] = site[i];  // throws cannot destructure non-iterable error
        const name = site[i].name;
        const url = site[i].url;
        console.log('name', name, 'url', url);
        this.sites.push({
          id: this.getUniqueId(url),
          name,
          url,
          filter: true,
        });
      }
      /*
      document.getElementById('favError').innerHTML = '';
      const favs = JSON.parse(this.preloads);
      const catg = favs[favName];
      if (!catg) {
        document.getElementById('favError').innerHTML = 'Favorite not found';
      }

      // const incls = catg['includes'];
      const incls = catg.includes;
      if (incls.length > 0) {
        this.removeAll(this.ulIncludeNode);
        incls.forEach((site) => {
          this.addNewSite(this.ulIncludeNode, site.name, site.url);
        });
      }

      const excls = catg.excludes;
      if (excls.length > 0) {
        this.removeAll(this.ulExcludeNode);
        excls.forEach((site) => {
          this.addNewSite(this.ulExcludeNode, site.name, site.url);
        });
      }

      // window.location.hash = '#divSearchText';
      document.getElementById('divSearchText').scrollIntoView();
      */
    },
    doSearch() {
      const searchText = document.getElementById('searchText').value;
      if (searchText === '') {
        alert('Please enter your search text');
        return;
      }
      console.log('search: ', searchText);
      const s = `http://google.com/search?q=${searchText}${this.fGetFilter()}`;
      window.open(s);
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
<style scoped>
  h2 {
    text-align: left;
  }
  .header {
    /*background-color: #bbbbbb;*/
    padding: 3px;
    text-align: left;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    /*border: 1px solid #dddddd;*//*border: 1px solid #dddddd;*/
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    /*background-color: #dddddd;*/
  }
  tr.strikethru {
    text-decoration: line-through;
    background-color: #ff0000;
    color:#000;
  }
  a {
    text-decoration: underline;
    color:royalblue;
    cursor: pointer;
  }
  .home {
    margin-top: 25px;
    text-align: center;
  }
  label {
    text-align: left;
    font-weight: bold;
  }
  .searchTxt {
    width: 80%;
    font-size: 16px;
  }
  .siteTxt {
    width: 70%;
    font-size: 16px;
  }
  .filterType {
    text-align: left;
  }
  .selectedFilter {
    /*border: 1px solid red;*/
    background-color: lightgray;
    display:inline-block;
    padding: 0px 10px 0px 0px;
  }
  .ulOuter {
    color: black;
    font-weight: bold;
    text-align: left;
    text-decoration: none;
    font-size: 16px;
    text-transform: capitalize;
  }
  .ulInner {
    color: black;
    font-weight: normal;
    text-align: left;
    text-decoration: none;
    font-size: 14px;
    text-transform: capitalize;
    cursor: pointer;
    text-decoration: underline;
    color:royalblue;
  }
  .button {
    background-color: darkgray;
    border: none;
    color: white;
    margin: 10px;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
  }
  .button:hover {
    cursor: pointer;
  }
</style>
