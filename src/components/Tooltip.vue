<template>
  <div
    class="ViTooltip"
    :class="[{
      'ViTooltip--hideArrow': hideArrow,
      'ViTooltip--mini': mini,
      'ViTooltip--small': small,
      'ViTooltip--large': large }]"
      @click="justHide()">
    <slot />
  </div>
</template>

<script>
import Tooltip from 'tooltip.js';
import { scaleMixin, widthMixin } from '../mixins/sizes';

export default {
  name: 'ViTooltip',
  mixins: [scaleMixin, widthMixin],
  data() {
    return {
      tooltip: {},
    }
  },
  props: {
    /**
     * Define a posição da tooltip como em cima
     */
    top: {
      type: Boolean,
      default: false,
    },
    /**
     * Define a posição da tooltip como direita
     */
    right: {
      type: Boolean,
      default: false,
    },
    /**
     * Define a posição da tooltip como embaixo
     */
    bottom: {
      type: Boolean,
      default: false,
    },
    /**
     * Define a posição da tooltip como esquerda
     */
    left: {
      type: Boolean,
      default: false,
    },
    /**
     * Esconde o trinagulo do balão da tooltip
     */
    hideArrow: {
      type: Boolean,
      default: false,
    },
    /**
     * Define o trigger como hover
     */
    hover: {
      type: Boolean,
      default: false,
    },
    /**
     * Define o trigger como click
     */
    click: {
      type: Boolean,
      default: false,
    },
    /**
     * Define o conteúdo da tooltip
     */
    content: {
      type: String,
      default: null,
    },
    /**
     * Controla se a tooltip está sendo ou não exibida
     */
    show: {
      type: Boolean,
      default: false,
    },
    /**
     * Intervalo, em milissegundos, para fechar a tooltip
     */
    delayToClose: {
      type: [String, Number],
      default: 10,
    },
    /**
     * Permite fechar ao clicar na tooltip
     */
    closeOnClick: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    position() {
      let toolltipPosition = 'top';

      if (this.right) toolltipPosition = 'right';
      else if (this.bottom) toolltipPosition = 'bottom';
      else if (this.left) toolltipPosition = 'left';

      return toolltipPosition;
    },
    trigger() {
      let tooltipTrigger = 'hover';

      if (this.click) tooltipTrigger = 'click'

      return tooltipTrigger;
;
    },
  },
  watch: {
    show(status) {
      this.showHide(status);
    },
    'tooltip._isOpen'(status) {
      this.tooltip._isOpening = status;
    },
  },
  methods: {
    initTooltip() {
      const element = this.$el.children[0];
      if (element) {
        this.tooltip = new Tooltip(element, {
          placement: this.position,
          title: this.content,
          trigger: this.trigger,
          delay: { show: 0, hide: this.delayToClose },
        });
      }
    },
    showHide(status, allowCloseClick = false) {
      if (status) this.tooltip.show();
      else this.tooltip.hide();
    },
    justHide() {
      if (this.closeOnClick) this.tooltip.hide();
    },
  },
  mounted() {
    this.initTooltip();
    this.showHide(this.show);
  },
}
</script>

<style lang="stylus">
@import '../themes/main'

.ViTooltip
  display inline-block

  &--hideArrow
    .tooltip-arrow
      visibility hidden

  &--mini
    .tooltip
      font-size 0.8em
      padding 0.3em 0.5em

  &--small
    .tooltip
      font-size 0.8em
      padding 0.5em 0.8em

  &--large
    .tooltip
      font-size 1.2em

  .tooltip
    background $light
    border-radius 3px
    box-shadow 0 0 2px rgba(0,0,0,0.5)
    color $dark
    padding 10px
    text-align center
    z-index 1

  .tooltip-arrow
    border-color $border-color-main
    border-style solid
    height 0
    margin 5px
    position absolute
    width 0

  .tooltip[x-placement^="top"]
    top -10px !important

    .tooltip-arrow
      border-bottom-color transparent
      border-left-color transparent
      border-right-color transparent
      border-width 6px 6px 0 6px
      bottom -6px
      left calc(50% - 6px)
      margin-bottom 0
      margin-top 0

  .tooltip[x-placement^="left"]
    left -10px !important

    .tooltip-arrow
      border-bottom-color transparent
      border-right-color transparent
      border-top-color transparent
      border-width 6px 0 6px 6px
      right -6px
      top calc(50% - 6px)
      margin-left 0
      margin-right 0

  .tooltip[x-placement^="right"]
    left 10px !important

    .tooltip-arrow
      border-bottom-color transparent
      border-left-color transparent
      border-top-color transparent
      border-width 6px 6px 6px 0
      left -6px
      margin-left 0
      margin-right 0
      top calc(50% - 6px)

  .tooltip[x-placement^="bottom"]
    top 10px !important

    .tooltip-arrow
      border-left-color transparent
      border-right-color transparent
      border-top-color transparent
      border-width 0 6px 6px 6px
      left calc(50% - 6px)
      margin-bottom 0
      margin-top 0
      top -6px
</style>

<docs>
Tooltip com botão:

```jsx
<vi-tooltip top click close-on-click content="Aqui vem a dica!">
  <vi-button primary>Clique aqui</vi-button>
</vi-tooltip>
```

Tooltip com span:

```jsx
<vi-wrapper proportinal class="ViComponent" justify-content="space-around">
  <vi-tooltip top hover mini content="Esta dica tem tamanho pequeno!">
    <span>Passe o mouse</span>
  </vi-tooltip>
  <vi-tooltip top hover large content="Já essa outra é maior!">
    <span>Passe o mouse</span>
  </vi-tooltip>
  <vi-tooltip top hover content="Este demora 1 segundo pra fechar!" delay-to-close="1000">
    <span>Passe o mouse</span>
  </vi-tooltip>
</vi-wrapper>
```
</docs>
