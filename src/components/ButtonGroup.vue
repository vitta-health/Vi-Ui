<template>
  <nav
    class="ViComponent ViButtonGroup"
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

<style lang="stylus" >
  @import '../themes/main'

  .ViButtonGroup
    display flex
    flex-flow row wrap

    .ViButton
      border-radius 0

      &:first-child
        border-bottom-left-radius 5px
        border-top-left-radius 5px

      &:last-child
        border-bottom-right-radius 5px
        border-top-right-radius 5px

    &--pill
      .ViButton
        &:first-child
          border-bottom-left-radius 50px
          border-top-left-radius 50px
          padding-left 1em

        &:last-child
          border-bottom-right-radius 50px
          border-top-right-radius 50px
          padding-right 1em

    &--border
      .ViButton
        min-width 3.4em
        &:not(.ViButton--active)
          border-color #9AA2B4
          border-left-width 0
          background transparent
          color: #333
          margin-right -0.09em
          padding-left 1.09em
          box-shadow: none

          &[disabled]:hover
          &[disabled]:focus
            border-color #9AA2B4
            background inherit
            color: inherit
            box-shadow: inherit

          &:first-child
            border-left-width 0.09em
</style>

<docs>
Botão grupo básico:

```jsx
<vi-button-group>
  <vi-button>Thanos</vi-button>
  <vi-button>did</vi-button>
  <vi-button>nothing</vi-button>
  <vi-button>wrong</vi-button>
</vi-button-group>
```
Botão grupo dinâmico:

```jsx
<vi-button-group pill outlined>
  <vi-button sucess>◂</vi-button>
  <vi-button v-for="n in 10">{{ n }}</vi-button>
  <vi-button>▸</vi-button>
</vi-button-group>
```

```jsx
<vi-button-group>
  <vi-button primary>Primary</vi-button>
  <vi-button secondary>Secondary</vi-button>
  <vi-button success>Success</vi-button>
  <vi-button warning>Warning</vi-button>
  <vi-button danger>Danger</vi-button>
  <vi-button disabled>Disabled</vi-button>
</vi-button-group>
```

```jsx
<vi-button-group outlined large>
  <vi-button>◂</vi-button>
  <vi-button v-for="n in 5">{{ n }}</vi-button>
  <vi-button>▸</vi-button>
</vi-button-group>
```
</docs>
