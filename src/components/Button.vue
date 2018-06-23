<template>
  <component
    :is="tagButton"
    ref="button"
    class="ViComponent ViButton"
    :class="[
      {
        'ViButton--mini': mini,
        'ViButton--small': small,
        'ViButton--large': large,
        'ViButton--pill': pill,
        'ViButton--circle': !pill && !width && circle,
        'ViButton--active': active,
      },
      colorClass({
        background: !outlined,
        border: outlined,
        hover: true && !active
      }),
    ]"
    :href="this.href"
    :style="{
      width: componentWidth,
    }"
    :title="title"
    @click="onClick"
  >
    <span
      class="sr-only"
      v-if="title"
    >{{ title }}</span>
    <vi-wrapper
      tag="span"
      :justify-content="justifyContent || 'center'"
      :align-items="alignItems || 'center'"
      :inverted="inverted"
      small-spacing
      child-wrapper
    >
      <vi-icon
        v-if="icon"
        class= "ViAlert__ContentIcon"
        :name="icon"
      />
      <slot />
    </vi-wrapper>
  </component>
</template>

<script>
import ViWrapper from './Wrapper.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import colorsMixin from '../mixins/colors';
import positioningMixin from '../mixins/positioning';

export default {
  name: 'ViButton',
  components: {
    ViWrapper,
  },
  mixins: [scaleMixin, widthMixin, colorsMixin, positioningMixin],
  props: {
    /**
     * Fundo transparente com apenas borda e texto colorido.
     */
    outlined: {
      type: Boolean,
      default: false,
    },
    /**
     * Define se o botão esta selecionado.
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * Define botão pilula.
     */
    pill: {
      type: Boolean,
      default: false,
    },
    /**
     * Define botão como um círculo perfeito. Não funciona caso a prop
     * `pill` esteja `true` ou algum valor definido na prop `width`.
     */
    circle: {
      type: Boolean,
      default: false,
    },
    /**
     * Caso o botão seja um link.
     */
    href: {
      type: String,
      default: null,
    },
    /**
     * Caso o elemento root não possar ser nem um botão nem num link.
     */
    tag: {
      type: String,
      default: null,
    },
    /**
     * Descritivo do botão.
     */
    title: {
      type: String,
      default: null,
    },
    /**
     * Define um ícone de `vi-icons`
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * Invert posição do ícone
     */
    inverted: {
      type: String,
      default: null,
    },
  },
  computed: {
    tagButton() {
      if (this.href) return 'a';
      return 'button';
    },
  },
  methods: {
    onClick() {
      /**
       * Evento de clique.
       *
       * @event click
       * @type {none}
       */
      this.$emit('click');
    },
  },
};
</script>

<style lang="stylus">
@import '../themes/main'
.ViComponent.ViButton
  border-width 0.09em
  border-style solid
  border-radius 0.2em
  cursor pointer
  display inline-flex
  font-size 16px
  height auto
  min-height 40px
  outline none
  padding 0 0.61em
  justify-content center
  text-decoration none
  transition: all 0.04s

  &[disabled]
    opacity 0.45
    cursor default

  .ViLoading
    margin -4px 0

  &--circle
    border-radius 100px
    height 40px
    padding 0
    width 40px

  &--pill
    border-radius 100px
    padding 0 1em

  &--mini
    font-size 10px
    font-weight 700
    letter-spacing 0.5px
    min-height 21px
    padding 0 0.59em
    &.ViButton--pill
      padding 0 1em
    &.ViButton--circle
      height 21px
      padding 0
      width 21px

  &--small
    min-height auto
    font-size 12px
    min-height 30px
    &.ViButton--circle
      height 30px
      width 30px

  &--large
    font-size 1.61em
    font-weight 400
    min-height 53px
    padding 0 0.59em
    &.ViButton--pill
      padding 0 1em
    &.ViButton--circle
      height 53px
      padding 0
      width 53px
</style>

<docs>
### Botão básico

```jsx
<vi-wrapper mini-spacing align-items="center">
  <vi-button success large>Me aperte</vi-button>
  <vi-button primary center title="Vitta" icon="vitta" />
  <vi-button danger>Me aperte</vi-button>
  <vi-button dark small>Me aperte</vi-button>
  <vi-button warning mini>Me aperte</vi-button>
</vi-wrapper>
```

### Botão com submit ou como link

```jsx
<form action="/#button">
  <vi-button type="submit" success>Form submit</vi-button>
  <vi-button href="https://google.com/" primary>Link</vi-button>
</form>
```

### Outros exemplos

```jsx
<vi-wrapper vertical>
  <vi-button success width="220"><vi-loading light mini /></vi-button>
  <vi-button pill large success outlined
    justify-content="space-between"
    width="220"
  ><span>▸</span> Me aperte</vi-button>
</vi-wrapper>
```

### Utilizando eventos

```vue
<template>
    <div class="ViComponent">
      <p><vi-button @click="pushButton">+1</vi-button></p>
      <hr />
      <p>Contando: {{ numClicks }}</p>
    </div>
</template>
<script>
export default {
  data() {
    return { numClicks: 0 };
  },
  methods: {
    pushButton() {
      this.numClicks += 1;
    },
  },
};
</script>
```
</docs>
