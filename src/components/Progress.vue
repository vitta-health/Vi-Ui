<template>
  <div
    :class="changeClass"
    :style="changeStyleProgress">
    <div
      class="vi-progress-content"
      :style="changeStyleBorder">
      <span
        v-if="percentValue"
        :style="styleTextPercent">
        {{ percentValue }}%
      </span>
    </div>
  </div>
</template>

<script>
/**
 * Barra de progresso circular.
 */
const availableSizes = {
  mini: 20,
  small: 50,
  medium: 100,
  large: 300,
};

export default {
  name: 'ViProgress',
  props: {
    /**
     * Define o tamanho do progresso os tamanhos permitidos são [mini | small | medium | large].
     */
    size: {
      type: String,
      default: 'small',
      validator: size => size in availableSizes,
    },
    /**
     * [0 - 100] Define o percentual do carregamento
     * (Sem valor definido o circulo apenas gira infinitamente).
     */
    percentValue: {
      type: [Number, String],
      default: null,
    },
  },
  methods: {
    getSize() {
      return availableSizes[this.size];
    },
    percentValid() {
      if (this.percentValue === null) {
        return null;
      }
      const p = this.percentValue - 0;
      return p >= 0 && p <= 100 ? p : 100;
    },
  },
  computed: {
    borderSize() {
      return this.getSize() * 0.85;
    },
    changeClass() {
      return this.percentValid() != null
        ? 'vi-progress-dynamic'
        : 'vi-progress-loop';
    },
    changeStyleProgress() {
      const size = `${this.getSize()}px`;
      let css = `height: ${size}; width: ${size};`;

      css +=
        this.percentValid() != null
          ? ` background: linear-gradient(to top, #3581BC ${this.percentValid()}%, #f3f3f3 0%);`
          : `height: ${size}; width: ${size};`;

      return css;
    },
    changeStyleBorder() {
      return `height: ${this.borderSize}px; width: ${this.borderSize}px;`;
    },
    styleTextPercent() {
      return `font-size:${this.getSize() / 2.8}px`;
    },
  },
};
</script>

<style>
.vi-progress-content {
  align-items: center;
  background-color: white;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
}

.vi-progress-dynamic {
  align-items: center;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.vi-progress-loop {
  align-items: center;
  animation: spin 1s linear infinite;
  background: linear-gradient(#3581bc 30%, #f3f3f3 40%);
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  -webkit-animation: spin 1s linear infinite; /* Safari */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>

<docs>
Progress circular em loop:

```jsx
<vi-progress size="small" />
```

Progress circular dinamico:

```jsx
<vi-progress percentValue="25" />
```

Veja como é facil utilizar

```vue
<template>
    <div>
        <vi-progress size="medium" percentValue="85"/>
    </div>
</template>
<script>

export default {

}
</script>
```
</docs>
