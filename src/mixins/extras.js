/* eslint-disable no-console */

/**
 * @mixin
 */
export default {
  props: {
    /**
     * Define justify-content nos filhos do componente<br/>
     * [flex-start|flex-end|center|space-between|space-around|initial|inherit]
     */
    justifyContent: {
      type: String,
      default: 'center',
    },

  },
};
