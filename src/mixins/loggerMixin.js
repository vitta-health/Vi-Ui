/* eslint-disable no-console */

/**
 * @mixin
 */
export default {
  mounted() {
    this.hello();
  },
  methods: {
    hello() {
      console.log('hello from mixin!');
    },
  },
};
