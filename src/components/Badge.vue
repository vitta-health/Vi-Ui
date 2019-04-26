<template>
  <div class="ViComponent ViBadge">
    <div class="ViBadge__Badge" 
      :class="[
        {
          'ViBadge__Badge--square': square,
          'ViBadge__Badge--mini': mini,
          'ViBadge__Badge--small': small,
          'ViBadge__Badge--large': large,
          'ViBadge__Badge--left': left,
          'ViBadge__Badge--bottom': bottom,
          'ViBadge__Badge--over': over,
          'ViBadge__Badge--opened': value,
        },
        colorClass({
          bg: !outlined,
          border: !outlined && !over,
          'border-no-bg': outlined,
          text: outlined,
          default: 'primary',
        }),
      ]"
    >
      <slot name="badge"/>
    </div>
    <slot/>
  </div>
</template>

<script>
import colorsMixin from '../mixins/colors';
import { scaleMixin } from '../mixins/sizes';

export default {
  name: 'ViBadge',
  mixins: [scaleMixin, colorsMixin],
  props: {
    /**
     * Controle estado do badge.
     * @model
     */
    value: {
      type: Boolean,
      default: true,
    },
    /**
     * Define o formato do badge para quadrado.
     */
    square: {
      type: Boolean,
      default: false,
    },
    /**
     * Alinha o badge em cima de uma das pontas do conteúdo.
     */
    over: {
      type: Boolean,
      default: false,
    },
    /**
     * Fundo transparente com apenas borda e texto colorido.
     */
    outlined: {
      type: Boolean,
      default: false,
    },
    /**
     * Alinhar badge à esquerda.
     */
    left: {
      type: Boolean,
      default: false,
    },
    /**
     * Alinhar badge embaixo.
     */
    bottom: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus">
@import '../themes/main'

.ViBadge
  display inline-block
  position relative

  &__Badge
    align-items center
    border 1px solid
    border-radius 50%
    color #FFFFFF
    display flex
    flex-direction row
    flex-wrap wrap
    font-size 14px
    height 22px
    justify-content center
    opacity 0
    position absolute
    right -25px
    top -11px
    transition 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
    width 22px
    
    &--opened
      opacity 1

    &--square
      border-radius 0.2em

    &--mini
      font-size 10px
      height 20px
      width 20px

    &--small
      font-size 12px
      height 21px
      width 21px
    
    &--large
      font-size 16px
      height 24px
      width 24px
    
    &--left
      left -25px
    
    &--bottom
      bottom -10px
      top auto
    
    &--over
      border 2px solid #FFFFFF
      font-size 85%
      right -10px
      top -10px
      
      &.ViBadge__Badge--left
        left -10px
      
      &.ViBadge__Badge--bottom
        top auto
</style>

<docs>
### Badges:

```vue
<template>
  <vi-wrapper large-spacing align-items="center">
    <vi-badge success over>
      <div slot="badge">
        1
      </div>
      <vi-button primary title="Vitta" icon="vitta" />
    </vi-badge>
    <vi-badge danger>
      <div slot="badge">
        3
      </div>
      <vi-icon name="heart-beats" class="icon" />
    </vi-badge>
  </vi-wrapper>
</template>
<script>
export default {};
</script>
<style>
  .icon {
    font-size: 3em;
  }
</style>
```

### Controlando exibição:

```vue
<template>
  <vi-badge primary v-model="isOpen">
    <div slot="badge">
      1
    </div>
    <vi-button primary @click="isOpen = !isOpen">Clique aqui</vi-button>
  </vi-badge>
</template>
<script>
export default {
  data() {
    return {
      isOpen: true,
    };
  },
};
</script>
```
</docs>