<template>
  <button
    class="ViButton"
    :class="[
      {
        'ViButton--mini': mini,
        'ViButton--small': small,
        'ViButton--large': large,
        'ViButton--pill': pill,
      },
      colorClass({ background: !outlined, border: outlined, hover: true }),
    ]"
    :style="{
      width: buttonWidth,
      justifyContent,
    }"
    @click.prevent="onClick">
    <vi-wrapper
      :justify-content="justifyContent"
      spacing="10"><slot /></vi-wrapper>
  </button>
</template>

<script>
import ViWrapper from './Wrapper.vue';
import sizeMixin from '../mixins/sizes';
import colosMixin from '../mixins/colors';
import extrasMixin from '../mixins/extras';

export default {
  name: 'ViButton',
  components: {
    ViWrapper,
  },
  mixins: [sizeMixin, colosMixin, extrasMixin],
  props: {
    /**
     * Fundo transparente com apenas borda e texto colorido
     */
    outlined: {
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
  },
  computed: {
    buttonWidth() {
      if (Number.isNaN(Number.isNaN(this.spacing - 0))) return this.width;
      return `${this.width}px`;
    },
  },
  methods: {
    onClick() {
      /**
       * Evento de clique.
       *
       * @event ONCLICK
       * @type {object}
       */
      this.$emit('ONCLICK');
    },
  },
};
</script>

<style lang="stylus" scope>
  @import '../themes/main';
  @import '../themes/colors';

  .ViButton
    font-size 0.95em
    border-width 0.09em
    border-style solid
    border-radius 0.5em
    cursor pointer
    text-align center
    display flex
    justify-content center
    padding 0.5em 0.8em
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
Botão basico:

```jsx
<vi-button>Me aperte</vi-button>
```
Botão com loading:

```jsx
<vi-button success :width="200"><vi-loading light mini /></vi-button>
```

Outras props:

```jsx
<vi-button pill large success outlined
  justify-content="space-between"
  :width="200"
><span>▸</span> Me aperte</vi-button>
```


```jsx
<vi-button disabled small danger
><span>▸</span> Me aperte</vi-button>
```

Exemplo de utilização:

```vue
<template>
    <div class="wrapper">
        <vi-button @click.native="pushButton">Nomeie um cachorro</vi-button>
        <hr />
        <p class="text-name">Next Dog Name: {{ dogName }}</p>
    </div>
</template>
<script>
const dogNames = require('dog-names').all;

// You can also use 'exports.default = {}' style module exports.
export default {
  data() {
    return { numClicks: 0, dogName: dogNames[0] };
  },
  methods: {
    pushButton() {
      this.numClicks += 1;
      this.dogName = dogNames[this.numClicks];
    },
  },
};
</script>
<style scoped>
    .wrapper {
      padding: 10px;
    }
    .text-name {
      color: red;
    }
</style>
```
</docs>
