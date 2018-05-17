/* eslint-disable no-console */

/**
 * @mixin
 */
export default {
  props: {
    /**
     * _Tamanho:_ Define o menor tamanho para o botão.
     */
    mini: {
      type: Boolean,
      default: false,
    },
    /**
     * _Tamanho:_ Define pequeno tamanho para o botão.
     */
    small: {
      type: Boolean,
      default: false,
    },
    /**
     * _Tamanho:_ Define o tamanho maior para o botão.
     */
    large: {
      type: Boolean,
      default: false,
    },
  },
};
