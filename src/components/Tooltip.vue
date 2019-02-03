<template>
  <div
    class='ViTooltip'
    :class="[
      classPosition,
      classSize, {
        'ViTooltip--dark': dark,
        'ViTooltip--hover': hover && !click,
        'ViTooltip--show': visible,
        'ViTooltip--hideArrow': hideArrow,
    }]"
    @click='showHide'>
    <slot />
    <div
      class='Box__Tooltip'>
      <div
        class='Tooltip'
        v-html='content' />
    </div>
  </div>
</template>

<script>
import { scaleMixin, widthMixin } from '../mixins/sizes';

export default {
  name: 'ViTooltip',
  mixins: [scaleMixin, widthMixin],
  data() {
    return {
      visible: false,
      classPosition: 'ViTooltip--top',
      classSize: 'ViTooltip--small',
      tooltip: null,
    };
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
      default: true,
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
      required: true,
      default: null,
    },
    /**
     * Define o conteúdo da tooltip
     */
    show: {
      type: Boolean,
      default: false,
    },
    /**
     * Define uma cor escura para a tooltip
     */
    dark: {
      type: Boolean,
      default: false,
    },
    /**
     * [Obsoleto] Intervalo, em milissegundos, para fechar a tooltip
     */
    delayToClose: {
      type: [String, Number],
      default: 10,
    },
    /**
     * [Obsoleto] Permite fechar ao clicar na tooltip
     */
    closeOnClick: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    size() {
      let toolltipSize = 'small';

      if (this.mini) toolltipSize = 'mini';
      else if (this.large) toolltipSize = 'large';

      return toolltipSize;
    },
  },
  methods: {
    getPosition() {
      let toolltipPosition = 'top';

      if (this.right) toolltipPosition = 'right';
      else if (this.bottom) toolltipPosition = 'bottom';
      else if (this.left) toolltipPosition = 'left';

      return this.verifyEdgeLimit(toolltipPosition);
    },
    reposition() {
      this.classPosition = `ViTooltip--${this.getPosition()}`;
    },
    showHide() {
      this.verifyEdgeLimit();
      this.visible = !this.visible && this.click;
    },
    topToggle() {
      const offsetTop = this.$el.offsetTop - this.tooltip.clientHeight - 15;
      return offsetTop > window.scrollY ? 'top' : 'bottom';
    },
    rightToggle() {
      const offsetRight = this.$el.offsetLeft + this.$el.clientWidth + this.tooltip.clientWidth + 20;
      return offsetRight < window.scrollX + window.innerWidth ? 'right' : 'left';
    },
    bottomToggle() {
      const offsetBottom = this.$el.offsetTop + this.$el.clientHeight + this.tooltip.clientHeight + 25;
      return offsetBottom < window.scrollY + window.innerHeight ? 'bottom' : 'top';
    },
    leftToggle() {
      const offsetLeft = this.$el.offsetLeft - this.tooltip.clientWidth;
      return offsetLeft > window.scrollX ? 'left' : 'right';
    },
    verifyEdgeLimit(positionSelected = 'top') {
      return this[`${positionSelected}Toggle`]();
    },
    initTooltip() {
      this.classPosition = `ViTooltip--${this.getPosition()}`;
      this.classSize = `ViTooltip--${this.size}`;
    },
  },
  created() {
    window.addEventListener('scroll', this.reposition);
    window.addEventListener('resize', this.reposition);

    if (this.delayToClose) {
      console.warn('[deprecated] A "delayToClose" prop will no longer be used');
    }

    if (this.closeOnClick) {
      console.warn('[deprecated] A "closeOnClick" prop will no longer be used');
    }
  },
  mounted() {
    this.tooltip = this.$el.querySelector('.Tooltip');
    setTimeout(() => this.initTooltip(), 50);
  },
};
</script>

<style lang="stylus">
@import '../themes/main'

animationDuration = .2s

.ViTooltip
  display inline-block
  position relative

  .Box__Tooltip
    height 0
    opacity 0
    position absolute
    visibility hidden
    transition visibility 0s animationDuration, opacity animationDuration linear, margin animationDuration linear
    width 350px
    z-index 50

  .Tooltip
    background $light
    border-radius 3px
    box-shadow 0 0 0 1px #e7e8ef
    color $dark
    display table
    padding 10px
    position absolute
    text-align center
    z-index 1

    &::before,
    &::after
      content ''
      background transparent
      border 10px solid transparent
      height 0
      width 0
      position absolute
      z-index 5

    &::before
      z-index 6

  &--hover:hover,
  &--show.ViTooltip
    .Box__Tooltip
      margin 0
      visibility visible
      opacity 1
      transition opacity animationDuration linear, margin animationDuration linear;

  &--top,
  &--bottom
    .Box__Tooltip
      left 50%
      transform translateX(-50%)

      .Tooltip
        left 50%
        transform translateX(-50%)

        &::before,
        &::after
          left calc(50% \- 10px)

  &--top
    .Box__Tooltip
      bottom 100%
      margin-bottom -5px

      .Tooltip
        bottom calc(100% \+ 12px)

        &::before
          border-top-color $light
          top calc(100% \- 2px)

        &::after
          border-top-color #e7e8ef
          top 100%

  &--bottom
    .Box__Tooltip
      top 100%
      margin-top -5px

      .Tooltip
        top calc(100% \+ 12px)

        &::before
          border-bottom-color $light
          bottom calc(100% \- 2px)

        &::after
          border-bottom-color #e7e8ef
          bottom 100%

  &--left,
  &--right
    .Box__Tooltip
      top 50%
      transform translateY(-50%)

      .Tooltip
        top 50%
        transform translateY(-50%)

        &::before,
        &::after
          top calc(50% \- 10px)

  &--left
    .Box__Tooltip
      right 100%
      margin-right -5px

      .Tooltip
        right 15px

        &::before
          border-left-color $light
          left calc(100% \- 2px)

        &::after
          border-left-color #e7e8ef
          left 100%

  &--right
    .Box__Tooltip
      left 100%
      margin-left -5px

      .Tooltip
        left 15px

        &::before
          border-right-color $light
          right calc(100% \- 2px)

        &::after
          border-right-color #e7e8ef
          right 100%

  &--mini
    .Tooltip
      font-size 0.8em
      padding 0.3em 0.7em

  &--small
    .Tooltip
      font-size 1em
      padding 0.5em 0.8em

  &--large
    .Tooltip
      font-size 1.2em
      padding 0.6em 1em

  &--dark
    .Tooltip
      background $dark
      box-shadow 0 0 0 1px $dark
      color $light

      &::before,
      &::after
        border-top-color $dark

  &--hideArrow
    .Tooltip
      &::before,
      &::after
        visibility hidden

</style>

<docs>
Tooltip com botão:

```jsx
<vi-tooltip top click content="<strong>Conteúdo:</strong>Aqui vem a dica!Aqui vem a dica!Aqui vem a dica!Aqui vem a dica!Aqui vem a dica!">
  <vi-button primary>Clique aqui</vi-button>
</vi-tooltip>
```

Tooltip com span:

```jsx
<vi-wrapper grid class="ViComponent" justify-content="space-around">
  <vi-tooltip dark mini hideArrow content="Esta dica tem tamanho pequeno!">
    <span>Passe o mouse</span>
  </vi-tooltip>
  <vi-tooltip right hover large content="Já essa outra é maior!">
    <span>Passe o mouse</span>
  </vi-tooltip>
  <vi-tooltip left hover content="Esse demora 1 segundo pra fechar!" delay-to-close="1000">
    <span>Passe o mouse</span>
  </vi-tooltip>
  <vi-tooltip bottom hover content="Esse possui um texto bem grande para que seja possível ver como
    fica a renderização em casos onde a dica possui um texto bem grande.">
    <span>Passe o mouse</span>
  </vi-tooltip>
</vi-wrapper>
```
</docs>
