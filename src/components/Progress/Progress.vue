<template>
  <div class="container">
    <div
      ref="progress"
      :class="changeClass"
      :style="changeStyleProgress">
      <div
        ref="content"
        class="content"
        :style="changeStyleBorder">
        <span v-if="percentValueComputed" :style="styleTextPercent">{{ percentValueComputed }}%</span>
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
  props: {
    /**
     * Define o tamanho do progress
     */
    size: {
      type: [Number, String],
      default: 32,
    },
    /**
     * Define o tamanho da borda
     */
    borderSize: {
      type: Number,
      default: 4,
    },
    /**
     * Define o percentual do carregamento (Sem valor definido o circulo apenas gira infinitamente)
     */
    percentValue: {
      type: [Number, String],
      default: null,
    }
  },
  computed: {
    borderSizeComputed() {
      let espessuraBorda = parseInt(this.borderSize) >= parseInt(this.size) ? 1 : parseInt(this.size) - parseInt(this.borderSize);
      return espessuraBorda;
    },
    percentValueComputed() {
      return this.percentValue === null ? null : this.percentValue;
    },
    changeClass(){
      return this.percentValueComputed != null ? 'progress-dynamic': 'progress-loop';
    },
    changeStyleProgress() {
      const tamanho = `${parseInt(this.size)}px`;
      return this.percentValueComputed != null ? 
      `height: ${ tamanho }; width: ${ tamanho }; background: linear-gradient(to top, #3581BC ${ this.percentValueComputed }%, #f3f3f3 0%);`
      :
      `height: ${ tamanho }; width: ${ tamanho };`;
    },
    changeStyleBorder() {
      return `height: ${ this.borderSizeComputed }px; width: ${ this.borderSizeComputed }px;`;
    },
    styleTextPercent() {
      return `font-size:${(parseInt(this.size) / 2.8)}px`;
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

