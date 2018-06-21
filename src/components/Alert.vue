<template>
  <vi-card
    :class="[
      'ViAlert',
      {
        'ViAlert--open': isOpen,
        'ViAlert--closed': !isOpen,
        'ViAlert--dismissable': !notDismissable,
        'ViAlert--center': !inline && !left && !right,
        'ViAlert--right': !inline && right,
        'ViAlert--left': !inline && left,
        'ViAlert--top': !inline && !bottom,
        'ViAlert--bottom': !inline && bottom,
        'ViAlert--inline': inline,
        'ViAlert--pill': pill,
      }
    ]"
    v-bind="colorsOpt"
    @mouseover.native="stopTimer(true)"
    @mouseout.native="startTimer(false)"
    default-color="default"
    tag="span"
    small
  >
    <vi-wrapper
      tag="span"
      small-spacing
      justify-content="space-between"
      align-items="center"
    >
      <vi-wrapper
        tag="span"
        small-spacing
        child-wrapper
        justify-content="start"
        align-items="center"
      >
        <vi-icon
          v-if="icon"
          class= "ViAlert__ContentIcon"
          :name="icon"
        />
        <slot />
      </vi-wrapper>
      <vi-button
        small
        v-bind="colorsOpt"
        title="Fechar"
        class= "ViAlert__Close"
        :circle="pill"
        @click="startToggle"
        v-if="!notDismissable"
      >
        <vi-icon name="cross"/>
      </vi-button>
    </vi-wrapper>
  </vi-card>
</template>

<script>
import ViButton from './Button.vue';
import ViCard from './Card.vue';
import colorsMixin from '../mixins/colors';
import { widthMixin } from '../mixins/sizes';

let timer;

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
    bottom: {
      type: Boolean,
      default: false,
    },
    /**
     * Tempo para fechamento automático em segundos.
     * O valor `0` garante que ele não fecha automaticamente.
     */
    timeout: {
      type: [Number, String],
      default: 2,
    },
    /**
     * Impede que usuário feche alerta.
     */
    notDismissable: {
      type: Boolean,
      default: false,
    },
    /**
     * Controle estado do alerta
     * @model
     */
    value: {
      type: Boolean,
      default: true,
    },
    /**
     * Define um ícone de `vi-icons`
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * Alerta em formato pilula
     */
    pill: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    startToggle() {
      if (!this.notDismissable) {
        /**
         * evento de click
         *
         * @event click
         * @type {none}
         */
        this.$emit('click');
        this.toggle();
      }
    },
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.value !== this.isOpen) {
        /**
         * Alteração do estado do componente
         *
         * @event input
         * @type {boolean}
         */
        this.$emit('input', this.isOpen);
      }
    },
    closed() {
      /**
       * Alerta foi fechado.
       *
       * @event close
       * @type {none}
       */
      this.$emit('closed');
    },
    open() {
      /**
       * Alerta foi aberto.
       *
       * @event open
       * @type {none}
       */
      this.$emit('open');
    },
    handleValue(alertState) {
      this.isOpen = alertState;
      if (alertState) {
        this.open();
        if (timer) clearTimeout(timer);
        this.startTimer(false);
      } else {
        this.stopTimer(false);
        this.closed();
      }
    },
    stopTimer(mouseState) {
      this.isOver = mouseState;
      if (timer) clearTimeout(timer);
    },
    startTimer(mouseState) {
      this.isOver = mouseState;
      if (timer) clearTimeout(timer);
      if (this.timeoutMillisecs) {
        timer = setTimeout(() => {
          this.isOpen = false;
          this.$emit('input', false);
        }, this.timeoutMillisecs);
      }
    },
  },
  watch: {
    value(v) {
      this.handleValue(v);
    }
  },
  computed: {
    timeoutMillisecs() {
      return this.timeout ? this.timeout * 1000 : 0;
    },
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
  },
  data() {
    return {
      isOpen: false,
      isOver: false,
    };
  },
  mounted() {
    this.handleValue(this.value);
  },
};
</script>

<style lang="stylus">
@import '../themes/main'
@import '../themes/main'
.ViComponent.ViAlert
  transition all 0.2s ease-in-out

  &--pill
    &.ViCard
      border-radius 100px

  &--inline
    &.ViAlert--closed
      display none

  &--top
  &--bottom
    backface-visibility hidden
    position fixed
    z-index 300

  &--center
    left 50%
    transform-origin 10% center
    &.ViAlert--top
      top 1em
      transform translate(-50%, -200%) rotateX(180deg)
    &.ViAlert--bottom
      bottom 1em
      transform translate(-50%, 200%) rotateX(180deg)
    &.ViAlert--open
      transform translate(-50%, 0) rotateX(0)

  &--left
    left 1em
    transform-origin center 10%
    transform translate(-200%, 0) rotateY(180deg)
    &.ViAlert--top
      top 1em
    &.ViAlert--bottom
      bottom 1em
    &.ViAlert--open
      transform translate(0, 0) rotateY(0)

  &--right
    right 1em
    transform-origin center 10%
    transform translate(200%, 0) rotateY(180deg)
    &.ViAlert--top
      top 1em
    &.ViAlert--bottom
      bottom 1em
    &.ViAlert--open
      transform translate(0, 0) rotateY(0)

  &.ViCard
    width auto

    .contentWrapper
      align-items center

  .ViAlert__ContentIcon
  .ViAlert__ContentIcon
    opacity 0.5
</style>

<docs>
### Exemplo de alerta

```jsx
<vi-wrapper vertical>
  <vi-alert primary timeout="0" inline icon="rounded-plus">Primary</vi-alert>
  <vi-alert secondary timeout="0" inline icon="rounded-minus">Secondary</vi-alert>
  <vi-alert success timeout="0" inline icon="exclamation">Success</vi-alert>
  <vi-alert danger timeout="0" inline icon="heart-beats">Danger</vi-alert>
  <vi-alert warning timeout="0" inline icon="question">Warning</vi-alert>
</vi-wrapper>
```

### Utilizando alerta

```vue
<template>
  <div class="ViComponent">
    <vi-button primary @click="isOpen = !isOpen">Abrir alerta</vi-button>
    <vi-alert info pill timeout="0" v-model="isOpen" icon="exclamation"> Alerta Aberto</vi-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
```
</docs>
