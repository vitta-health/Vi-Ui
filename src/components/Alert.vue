<template>
  <vi-card
    class="ViAlert"
    @click="onClick"
    v-bind="colorsOpt"
    default-color="default"
    mini
  >
    <slot />
  </vi-card>
</template>

<script>
import ViButton from './Button.vue';
import ViCard from './Card.vue';
import colorsMixin from '../mixins/colors';
import { widthMixin } from '../mixins/sizes';

export default {
  name: 'ViAlert',
  components: {
    ViCard,
    ViButton,
  },
  mixins: [colorsMixin, widthMixin],
  props: {
    /**
     * Exibe alerta no local onde foi definido.
     * Por padrão o alerta é exibido usando `position: fixed`, essa prop mudar .
     */
    inline: {
      type: Boolean,
      default: false,
    },
    /**
     * Alinhar alerta à esquerda. Nao funciona se `inline` igual `true`.
     */
    left: {
      type: Boolean,
      default: false,
    },
    /**
     * Alinhar alerta à direita. Nao funciona se `inline` igual `true`.
     */
    right: {
      type: Boolean,
      default: false,
    },
    /**
     * Alinhar alerta ao funda tela. Nao funciona se `inline` igual `true`.
     */
    botom: {
      type: Boolean,
      default: false,
    },
    /**
     * Permite esconder alerta
     */
    dismiss: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      /**
       * Evento de clique.
       *
       * @event click
       * @type {object}
       */
      this.$emit('click');
    },
  },
  computed: {
    colorsOpt() {
      const colors = Object.keys(colorsMixin.props);
      const newPros = {};
      Object.keys(this.$props)
        .filter(prop => colors.includes(prop))
        .forEach((prop) => {
          newPros[prop] = this.$props[prop];
        });
      return newPros;
    },
    noColor() {
      const colors = Object.keys(colorsMixin.props);
      const newPros = {};
      Object.keys(this.$props)
        .filter(prop => colors.includes(prop))
        .forEach((prop) => {
          newPros[prop] = this.$props[prop];
        });
      return newPros;
    },
  },
};
</script>

<style lang="stylus">
@import '../themes/main'
.ViComponent.ViAlert
  position fixed
  top 1em
  left 50%
  width auto
  transform translate(-50%, 0)
  z-index 300
</style>

<docs>
Botão básico:

```jsx
<vi-alert>Exemplo</vi-alert>
```
</docs>
