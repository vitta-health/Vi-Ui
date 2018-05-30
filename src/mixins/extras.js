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
    /**
     * Alinha filhos veticalmente. [Opções de alinhamento](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items#Syntax).
     */
    alignItems: {
      type: String,
      default: null,
    },
  },
};
