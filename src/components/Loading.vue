<template>
  <div
    class="ViComponent ViLoading"
    ref="loading"
    :class="[
      {
        'ViLoading--loop': !hasPercent,
        'ViLoading--mini': mini,
        'ViLoading--small': small,
        'ViLoading--large': large,
      },
      colorClass({ border: true })
    ]"
    :style="{
      height: `${getSize}px`,
      width: `${getSize}px`,
    }"
  >
    <canvas
      class="ViLoading__Canvas"
      ref="canvas"
      :height="`${getSize}px`"
      :width="`${getSize}px`"
    />
    <span
      class="ViLoading__Value"
      ref="text"
      :style="{
        borderWidth: `${borderSize}px`,
        fontSize: `${(getSize / 3.4)}px`,
      }"
    >
      {{ percentValueStr }}
    </span>
  </div>
</template>

<script>
import { scaleMixin } from '../mixins/sizes';
import colosMixin from '../mixins/colors';

/**
 * Barra de loading circular.
 */
const availableSizes = {
  mini: 24,
  small: 50,
  medium: 80,
  large: 100,
};
const radiusEnd = 2;
const offSetRadius = 1.5;
const defaultPercent = 40;

export default {
  name: 'ViLoading',
  mixins: [scaleMixin, colosMixin],
  props: {
    /**
     * [0 - 100] Define o percentual do carregamento
     * (Sem valor definido o circulo apenas gira infinitamente).
     */
    percentValue: {
      type: [Number, String],
      default: null,
    },
  },
  computed: {
    getSize() {
      if (this.mini) return availableSizes.mini;
      else if (this.small) return availableSizes.small;
      else if (this.large) return availableSizes.large;

      return availableSizes.medium;
    },
    borderSize() {
      return this.getSize * 0.10;
    },
    hasPercent() {
      return this.percentValue !== null;
    },
    percentValueStr() {
      return this.hasPercent ? `${this.percentValue}%` : '';
    },
  },
  watch: {
    percentValue(perc) {
      this.paintCanvas(perc || 0);
    },
  },
  methods: {
    paintCanvas(perc) {
      const context = this.$refs.canvas.getContext('2d');
      const nperc = this.hasPercent ? perc : defaultPercent;
      const radius = ((nperc * radiusEnd) / 100) + offSetRadius;
      const sizeBorderLess = (this.getSize / 2) - (this.borderSize / 2);
      const size = this.getSize / 2;

      context.beginPath();
      context.arc(size, size, sizeBorderLess, offSetRadius * Math.PI, radius * Math.PI);
      context.lineWidth = this.borderSize;

      context.strokeStyle = getComputedStyle(this.$refs.loading).color;
      context.stroke();
    },
  },
  mounted() {
    this.paintCanvas(this.percentValue);
  },
};
</script>

<style lang="stylus">
@import '../themes/main'

.ViComponent.ViLoading
  position relative
  z-index 100

  &--loop
    .ViLoading__Canvas
      animation spin 1s linear infinite
      animation-fill-mode forwards

  .ViLoading__Canvas
    height 100%
    left 0
    position absolute
    top 0
    width 100%
    z-index 1

  .ViLoading__Value
    align-items center
    border 1px solid rgba(0, 0, 0, 0.05)
    border-radius 50%
    display flex
    height 100%
    justify-content center
    padding-top 0.1em
    position relative
    width 100%
    z-index 0


@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<docs>
Progress circular em loop:

```jsx
<vi-loading small />
```

Progress circular dinamico:

```jsx
<vi-loading danger percent-value="29" />
```
</docs>
