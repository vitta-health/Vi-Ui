<template>
  <div
    class="ViComponent ViModal"
    :class="[{
      'ViModal--open': value,
    }]"
  >
    <vi-card
      vertical
      large-spacing
      :class="[
      'ViModal__Card',
      {
        'ViModal__Card--center': !leftToRight && !rightToLeft,
        'ViModal__Card--right-to-left': rightToLeft,
        'ViModal__Card--left-to-right': leftToRight,
        'ViModal__Card--top-to-bottom': !bottomToTop,
        'ViModal__Card--bottom-to-top': bottomToTop,
      }]"
      :style="{ width: componentWidth }"
      :title="title"
      :title-size="titleSize"
    >
      <template
        name="body"
      >
        <!-- @slot Use slot body para definir o conteúdo no corpo da modal -->
        <slot name="body" />
        <slot/>
      </template>

      <!-- @slot Use este slot para definir o conteúdo no rodapé -->
      <template slot="footer">
        <slot name="footer" />
      </template>
    </vi-card>
  </div>
</template>
<script>
import ViWrapper from './Wrapper.vue';
import ViCard from './Card.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import colorsMixin from '../mixins/colors';

/**
 * Infelizmente necessário para manipular a tag html.
 * Isso é usado pra travar o lock do scroll atrás da modal.
 */
const root = document.documentElement;

export default {
  name: 'ViModal',
  mixins: [scaleMixin, widthMixin, colorsMixin],
  components: {
    ViWrapper,
    ViCard,
  },
  props: {
    /**
     * _Tamanho:_ Define o menor espaçamento da modal.
     */
    miniSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Tamanho:_ Define o tamanho pequeno do modal.
     */
    smallSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Tamanho:_ Define o maior tamanho do modal.
     */
    largeSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Tamanho:_ Remove paddings do modal.
     */
    noSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * Modal abre e fecha da esquerda para direita.
     */
    leftToRight: {
      type: Boolean,
      default: false,
    },
    /**
     * Modal abre e fecha da direita para esquerda.
     */
    rightToLeft: {
      type: Boolean,
      default: false,
    },
    /**
     * Modal abre e fecha de baixo para cima.
     */
    bottomToTop: {
      type: Boolean,
      default: false,
    },
    /**
    * Texto exibido no título
    */
    title: {
      type: String,
      default: null,
    },
    /**
    * Tamanho do título de 1 a 6
    */
    titleSize: {
      type: [Number, String],
      default: null,
      validator: size => size >= 1 && size <= 6,
    },
    /**
    * Trava rolagem da tela
    */
    lockScroll: {
      type: Boolean,
      default: true,
    },
    /**
    * Estado da modal
    * @model
    */
    value: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(v) {
      if(v && this.lockScroll) {
        root.classList.add('ViRoot--locked');
      } else if(root.classList.contains('ViRoot--locked')) {
        root.remove('ViRoot--locked');
      }
    }
  }
};
</script>
<style lang="stylus">
@import '../themes/main'

.ViScroll--locked
.ViScroll--locked body
  overflow hidden

.ViComponent.ViModal
  align-items center
  background rgba(black, 0.3)
  display flex
  height 0
  justify-content center
  left 0
  opacity 0
  overflow-y scroll
  padding 0
  position fixed
  transition opacity 0.2s ease-in-out, height 0 linear 0.2s
  top 0
  width 100vw
  z-index 0

  .ViModal--open
    transition opacity 0.2s ease-in-out, height 0
    height 100vh
    padding 20px
    opacity 1

  .ViCard.ViModal__Card
    transition transform 0.2s ease-in-out 0.1s,
    overflow auto
    height auto
    width auto
    flex-grow 0
    max-width 100%
    max-height 100%

</style>

```

<docs>

### Exemplo de modal

```vue
<template>
  <div>
    <vi-button primary @click="isOpen = true">Abrir alerta</vi-button>
    <vi-modal
      title="Este é um título da Modal"
      title-size="1"
      v-model="isOpen"
    >
      <div slot="body">
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>

      </div>
      <div slot="footer">
        <vi-wrapper justify-content="flex-end">
          <vi-button outlined primary>Buttão 1</vi-button>
          <vi-button success>Buttão 2</vi-button>
        </vi-wrapper>
      </div>
    </vi-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
```
</docs>
