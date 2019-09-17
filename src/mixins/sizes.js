/**
 * @mixin
 */
export const scaleMixin = {
  props: {
    /**
     * _Tamanho:_ Define o menor tamanho para o componente.
     */
    mini: {
      type: Boolean,
      default: false
    },
    /**
     * _Tamanho:_ Define o tamanho pequeno para o componente.
     */
    small: {
      type: Boolean,
      default: false
    },
    /**
     * _Tamanho:_ Define o maior tamanho para o componente.
     */
    large: {
      type: Boolean,
      default: false
    }
  }
};

/**
 * @mixin
 */
export const widthMixin = {
  props: {
    /**
     * width do componente
     */
    width: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    componentWidth() {
      if (this.width === null) return false;
      if (Number.isNaN(this.width - 0)) return this.width;
      return `${this.width}px`;
    }
  }
};
