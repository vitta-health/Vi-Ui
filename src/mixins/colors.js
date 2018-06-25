import colors from '../themes/colorsList';

/**
 * @mixin
 */
export default {
  props: {
    /**
     * _Cor:_ Define a cor primaria
     */
    primary: {
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
     * _Cor:_ Define cor a variante da cor padrão
     */
    info: {
      type: Boolean,
      default: false,
    },
    /**
     * _Cor:_ Define um cinza escuro
     */
    dark: {
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
    /**
    * @ignore Essa prop é apenas um helper para componentes que dependem de outros componentes. Deixar ela
    * exposta vai causar mais confusão que instruir como dever ser utilizado as props de cores.
    * O usuário final precisa apenas usar o nome das cores como prop.
    */
    defaultColor: {
      type: String,
      default: 'default',
    },
  },
  methods: {
    colorClass(args = {}) {
      let colorName = args.default || 'default';
      Object.keys(colors).some((color) => {
        if (this[color]) colorName = color;
        return this[color];
      });

      const variations = Object.keys(args)
        .filter(arg => args[arg] && arg !== 'default')
        .map(arg => `ViColor-${colorName}--${arg}`);

      return variations.join(' ');
    },
    colorsOpt() {
      const newPros = {};
      Object.keys(colors)
        .forEach((color) => {
          if (this[color]) newPros[color] = this.$props[color];
        });
      return newPros;
    },
  },
};
