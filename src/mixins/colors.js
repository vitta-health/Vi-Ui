const colours = [
  'defaultVariant',
  'primary',
  'primaryVariant',
  'secondary',
  'secondary',
  'success',
  'warning',
  'danger',
  'light',
];

/**
 * @mixin
 */
export default {
  props: {
    /**
     * _Cor:_ Define cor a variante da cor padrão
     */
    defaultVariant: {
      type: Boolean,
      default: false,
    },
    /**
     * _Cor:_ Define a cor primaria
     */
    primary: {
      type: Boolean,
      default: false,
    },
    /**
     * _Cor:_ Define a variante da cor primaria
     */
    primaryVariant: {
      type: Boolean,
      default: false,
    },
    /**
    * _Cor:_ Define a cor secundaria
    */
    secondary: {
      type: Boolean,
      default: false,
    },
    /**
     * _Cor:_ Define a cor de successo
     */
    success: {
      type: Boolean,
      default: false,
    },
    /**
     * _Cor:_ Define a cor de alerta
     */
    warning: {
      type: Boolean,
      default: false,
    },
    /**
     * _Cor:_ Define a cor de erro
     */
    danger: {
      type: Boolean,
      default: false,
    },
    /**
     * _Cor:_ Define a cor branco
     */
    light: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * Adiciona cor a elementos.Use as propriedades: [background, border, hover]
     *
     * @param {Object}
     * @public
     */
    colorClass(args = {}) {
      let colorName = args.default || 'default';
      colours.some((color) => {
        if (this[color]) colorName = color;
        return this[color];
      });

      const variations = [];
      Object.keys(args).map((arg) => {
        variations.push(args[arg] ? `color-${colorName}--${arg}` : '');

        return false;
      });

      return variations.join(' ');
    },
  },
};
