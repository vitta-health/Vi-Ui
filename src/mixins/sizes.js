/* eslint-disable no-console */

/**
 * @mixin
 */
export default {
  props: {
    /**
     * _Tamanho:_ Define o menor tamanho para o componente.
     */
    mini: {
      type: Boolean,
      default: false,
    },
    /**
     * _Tamanho:_ Define pequeno tamanho para o componente.
     */
    small: {
      type: Boolean,
      default: false,
    },
    /**
     * _Tamanho:_ Define o tamanho maior para o componente.
     */
    large: {
      type: Boolean,
      default: false,
    },
  },
};
