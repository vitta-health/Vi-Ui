<template>
  <div class="container">
    <div
      :class="changeClass"
      :style="changeStyleProgress">
      <div
        class="content"
        :style="changeStyleBorder">
        <span v-if="percentValue" :style="styleTextPercent">{{ percentValue }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import loggerMixin from "../../mixins/loggerMixin";

/**
 * Barra de progresso circular.
 */
export default {
  name: "Progress",
  mixins: [loggerMixin],
  data () {
    return {
      borderSize: 4,
    }
  },
  props: {
    /**
     * 
     * Define o tamanho do progress os tamanhos permitidos são [mini | small | medium | large]
     */
    size: {
      type: String,
      default: 'small',
    },
    /**
     * Define o percentual do carregamento (Sem valor definido o circulo apenas gira infinitamente)
     */
    percentValue: {
      type: [Number, String],
      default: null,
    },
  },
  methods: {
    getSize () {
      let tamanhoCalculado;
      switch(this.size) {
        case 'mini':
          tamanhoCalculado = 20;
        break;
        case 'small':
          tamanhoCalculado = 50;        
        break;
        case 'medium':
          tamanhoCalculado = 100;        
        break;
        case 'large':
          tamanhoCalculado = 300;
        break;
      }
      this.borderSize = (tamanhoCalculado * 0.1);
      return tamanhoCalculado;
    }
  },
  computed: {
    borderSizeComputed() {
      const espessuraBorda = parseInt(this.borderSize) >= this.getSize() ? 1 : this.getSize() - this.borderSize;
      return espessuraBorda;
    },
    changeClass(){
      return this.percentValue != null ? 'progress-dynamic': 'progress-loop';
    },
    changeStyleProgress() {
      const tamanho = `${this.getSize()}px`;
      return this.percentValue != null ? 
      `height: ${ tamanho }; width: ${ tamanho }; background: linear-gradient(to top, #3581BC ${ this.percentValue }%, #f3f3f3 0%);`
      :
      `height: ${ tamanho }; width: ${ tamanho };`;
    },
    changeStyleBorder() {
      return `height: ${ this.borderSizeComputed }px; width: ${ this.borderSizeComputed }px;`;
    },
    styleTextPercent() {
      return `font-size:${(this.getSize() / 2.8)}px`;
    }
  },
};
</script>

<style scoped>
.content {
  align-items: center;
  background-color: white;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.progress-dynamic {
  align-items: center;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.progress-loop {
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

