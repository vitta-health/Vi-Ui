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
      width: buttonWidth,
      justifyContent,
    }"
    @click="onClick">
    <vi-wrapper
      :justify-content="justifyContent"
      spacing="10"><slot /></vi-wrapper>
  </component>
</template>

<script>
import ViWrapper from './Wrapper.vue';
import sizeMixin from '../mixins/sizes';
import colorsMixin from '../mixins/colors';
import extrasMixin from '../mixins/extras';

export default {
  name: 'ViButton',
  components: {
    ViWrapper,
  },
  mixins: [sizeMixin, colorsMixin, extrasMixin],
  props: {
    /**
     * Fundo transparente com apenas borda e texto colorido
     */
    outlined: {
      type: Boolean,
      default: false,
    },
    /**
     * Define se o botão esta selecionado
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * Define botão pilula
     */
    pill: {
      type: Boolean,
      default: false,
    },
    /**
     * Largura do botão (Passe numero fazendo bind da prop)
     */
    width: {
      type: [String, Number],
      default: 'auto',
    },
    /**
     * Caso o botão seja um link
     */
    href: {
      type: [String],
      default: null,
    },
    /**
     * Caso o elemento root não possar ser nem um botão nem num link
     */
    tag: {
      type: [String],
      default: null,
    },
  },
  computed: {
    buttonWidth() {
      if (Number.isNaN(this.width - 0)) return this.width;
      return `${this.width}px`;
    },
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
       * @event onClick
       * @type {object}
       */
      this.$emit('on-click');
    },
  },
};
</script>

<style lang="stylus">
  @import '../themes/main';
  @import '../themes/colors';

  .ViButton
    border-width 0.09em
    border-style solid
    border-radius 0.5em
    cursor pointer
    display inline-block
    font-size 0.95em
    text-align center
    padding 0.5em 0.8em
    text-decoration none
    outline none
    transition: all 0.09s
    > *
      margin-right 0.25em

    &[disabled]
      opacity 0.45
      cursor default

    .ViLoading
      margin -4px 0

  .ViButton--pill
    border-radius 100px

  .ViButton--mini
    font-size 0.8em
    padding 0.3em 0.5em

  .ViButton--small
    font-size 0.8em
    padding 0.5em 0.8em

  .ViButton--large
    font-size 1.2em
</style>

<docs>
Botão básico:

```jsx
<div>
  <vi-button default-variant large>Me aperte</vi-button>
  <vi-button primary>Me aperte</vi-button>
  <vi-button success small>Me aperte</vi-button>
  <vi-button danger mini>Me aperte</vi-button>
</div>
```
Botão com loading:

```jsx
<vi-button success width="200"><vi-loading light mini /></vi-button>
```
Botão com submit:

```jsx
<form action="/#!/ViButton">
  <vi-button type="submit" success>Form submit</vi-button>
</form>
```

Botão com link:

```jsx
<vi-button href="https://google.com/" primary small>Link</vi-button>
```

Outras props:

```jsx
<vi-button pill large success outlined
  justify-content="space-between"
  :width="220"
><span>▸</span> Me aperte</vi-button>
```

Exemplo de utilização:

```vue
<template>
    <div class="wrapper">
        <vi-button @click.native="pushButton">+1</vi-button>
        <hr />
        <p class="text-name">Contando: {{ numClicks }}</p>
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
