<template>
  <div
    :class="changeClass"
    :style="changeStyleProgress">
    <div
      class="vi-progress-content"
      :style="changeStyleBorder">
      <span v-if="percentValue" :style="styleTextPercent">{{ percentValue }}%</span>
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
  large: 300
}
export default {
  name: "vi-progress",
  props: {
    /**
     * Define o tamanho do progresso os tamanhos permitidos são [mini | small | medium | large].
     */
    size: {
      type: String,
      default: 'small',
      validator: (size) => {
        return size in availableSizes
      }
    },
    /**
     * [0 - 100] Define o percentual do carregamento (Sem valor definido o circulo apenas gira infinitamente).
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
      if(this.percentValue != null ){
        return parseInt(this.percentValue) >= 0 && parseInt(this.percentValue) <= 100? parseInt(this.percentValue) : 100;
      } else {
        return null;
      }
    }
  },
  computed: {
    borderSize() {
      return this.getSize() * 0.85; 
    },
    changeClass(){
      return this.percentValid() != null? 'vi-progress-dynamic': 'vi-progress-loop';
    },
    changeStyleProgress() {
      const size = `${this.getSize()}px`;
      return this.percentValid() != null? 
      `height: ${ size }; width: ${ size }; background: linear-gradient(to top, #3581BC ${ this.percentValid() }%, #f3f3f3 0%);`
      :
      `height: ${ size }; width: ${ size };`;
    },
    changeStyleBorder() {
      return `height: ${ this.borderSize }px; width: ${ this.borderSize }px;`;
    },
    styleTextPercent() {
      return `font-size:${(this.getSize() / 2.8)}px`;
    }
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
  background: linear-gradient(#3581BC 30%, #f3f3f3 40%);
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  -webkit-animation: spin 1s linear infinite; /* Safari */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

</style>

