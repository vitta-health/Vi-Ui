/* eslint-disable no-console */

/**
 * @mixin
 */
export default {
  props: {
    /**
     * Alinhamento do texto a esquerda
     */
    textLeft: {
      type: Boolean,
      default: false,
    },
    /**
     * Alinhamento do texto centralizado
     */
    textCenter: {
      type: Boolean,
      default: false,
    },
    /**
     * Alinhamento do texto a direita
     */
    textRight: {
      type: Boolean,
      default: false,
    },
  },
};
