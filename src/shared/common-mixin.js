export default {
  created() {
    /// console.log('mixin created');
  },
  data() {
    return {
      // page: 'signIn',
    };
  },
  components: {
  },
  computed: {
  },
  methods: {
    async syncWait(ms) {
      const start = Date.now();
      let now = start;
      while (now - start < ms) {
        now = Date.now();
      }
    },
  },
};
