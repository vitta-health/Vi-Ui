<template>
  <nav
    class="ViButtonGroup"
    :class="[
      {
        'ViButtonGroup--mini': mini,
        'ViButtonGroup--small': small,
        'ViButtonGroup--large': large,
        'ViButtonGroup--pill': pill,
        'ViButtonGroup--border': outlined,
      },
    ]"
    :style="{
      justifyContent,
    }"
  >
    <slot />
  </nav>
</template>

<script>
import ViWrapper from './Wrapper.vue';
import sizeMixin from '../mixins/sizes';
import extrasMixin from '../mixins/extras';

export default {
  name: 'ViButtonGroup',
  components: {
    ViWrapper,
  },
  mixins: [sizeMixin, extrasMixin],
  props: {
    /**
     * Fundo transparente com apenas borda e texto colorido
     */
    outlined: {
      type: Boolean,
      default: false,
    },
    /**
     * Define grupo de botões como pilula
     */
    pill: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scope>
  @import '../themes/main';

  .ViButtonGroup
    display flex

    .ViButton
      border-radius 0

      &:first-child
        border-top-left-radius 5px
        border-bottom-left-radius 5px

      &:last-child
        border-top-right-radius 5px
        border-bottom-right-radius 5px

    &--pill
      .ViButton
        &:first-child
          border-top-left-radius 50px
          border-bottom-left-radius 50px
          padding-left 1.5em

        &:last-child
          border-top-right-radius 50px
          border-bottom-right-radius 50px
          padding-right 1em

    &--border
      .ViButton
        border-left-width 0
        background transparent
        color: #333
        padding-left 1.09em
        margin-right -0.09em

        &:hover
        &:focus
          background #3581BC
          border-color #3581BC
          color #fff

        &[disabled]:hover
        &[disabled]:focus
          background transparent
          border-color #9AA2B4
          color #333

        &:first-child
          border-left-width 0.09em
</style>

<docs>
Botão Grupo basico:

```jsx
<vi-button-group>
  <vi-button>Thanos</vi-button>
  <vi-button>did</vi-button>
  <vi-button disabled>nothing</vi-button>
  <vi-button>wrong</vi-button>
</vi-button-group>
```
Botão Grupo dinamico:

```jsx
<vi-button-group pill outlined>
  <vi-button>◃</vi-button>
  <vi-button v-for="n in 10">{{ n }}</vi-button>
  <vi-button>▹</vi-button>
</vi-button-group>
```

```jsx
<vi-button-group outlined large>
  <vi-button>◃</vi-button>
  <vi-button v-for="n in 5">{{ n }}</vi-button>
  <vi-button>▹</vi-button>
</vi-button-group>
```
</docs>
