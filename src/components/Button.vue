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
      small
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
  display inline-block
  font-size 16px
  height auto
  min-height 40px
  outline none
  padding 0.61em
  text-align center
  text-decoration none
  transition: all 0.04s
  min-height
  > *
    margin-right 0.25em

  &[disabled]
    opacity 0.45
    cursor default

  .ViLoading
    margin -4px 0

  &--pill
    border-radius 100px

  &--mini
    font-size 10px
    font-weight 500
    min-height auto
    padding 0.37em 0.59em

  &--small
    min-height auto
    font-size 12px

  &--large
    font-size 1.61em
    font-weight 300
    padding 0.37em 0.59em
</style>

<docs>
### Botão básico

```jsx
<vi-wrapper mini align-items="center">
  <vi-button success large>Me aperte</vi-button>
  <vi-button primary title="Vitta" icon="vitta" />
  <vi-button secondary>Me aperte</vi-button>
  <vi-button danger small>Me aperte</vi-button>
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
    <div> class="ViComponent">
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
