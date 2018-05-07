<template>
  <div
    ref="progress"
    :class="[percentValueComputed ? 'progress-dynamic': 'progress-loop']"
    :style="[percentValueComputed? { height: size+'px', width: size+'px', background: 'linear-gradient(#3581BC ' + percentValueComputed + '%, #f3f3f3 0%)' }: { height: size+'px', width: size+'px'}]">
    <div
      ref="content"
      class="content"
      :style="{ height: borderSizeComputed+'px', width: borderSizeComputed+'px' }">
      <span v-if="percentValueComputed" :style="{ 'font-size': size / 2.8+'px' }">{{ percentValueComputed }}%</span>
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
      type: [Number, String],
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
  data () {
    return {
      loading: 0,
    }
  },
  computed: {
    borderSizeComputed() {
      return this.borderSize >= this.size ? 1 : (this.size - this.borderSize);
    },
    percentValueComputed() {
      return this.percentValue === null ? 0 : this.percentValue;
    }
  },
};
</script>

<style scoped>

.content {
  background-color: white;
  border-radius: 50%;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.progress-loop {
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(#3581BC 30%, #f3f3f3 40%);
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}

.progress-dynamic {
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 50%;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>

