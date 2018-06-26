<template>
  <div
    class="ViComponent ViModal"
    :class="[{
      'ViModal--open': isOpen,
      'ViModal--closed': !isOpen,
      'ViModal--mini': miniSpacing,
      'ViModal--small': smallSpacing,
      'ViModal--large': largeSpacing,
      'ViModal--no-spacing': noSpacing,
      'ViModal--not-dismissable': notDismissable,
    }]"
    @click.self="toggleModal(false)"
  >
    <vi-wrapper
      vertical
      class="ViModal__Wrapper"
      justify-content="stretch"
    ><vi-card
      vertical
      v-bind="colorsOpt()"
      :mini-spacing="miniSpacing"
      :small-spacing="smallSpacing"
      :large-spacing="largeSpacing"
      :no-spacing="noSpacing"
      class="ViModal__Card"
      :style="{ width: componentWidth }"
      :title="title"
      :title-size="titleSize"
    >
      <template
        slot="side"
      >
        <!-- @slot  Use slot o `side` que conteúdo ao lado título e antes do botão de fechar -->
        <slot name="side"/>
      </template>
      <template
        slot="close"
      >
        <!-- @slot  Use slot o `close` que conteúdo ao lado título. O botão de fechar original substituído quando esse slot é utilizado. -->
        <slot name="close">
          <vi-button
            class="ViModal__CloseButton"
            title="Fechar"
            icon="cross"
            light
            small
            v-bind="colorsOpt()"
            @click="toggleModal(false)"
          />
        </slot>
      </template>
      <template
        slot="body"
      >
        <!-- @slot Use slot o `body` para definir o conteúdo no corpo do card. -->
        <slot name="body" />
        <slot/>
      </template>

      <!-- @slot Use slot o `footer` para definir o conteúdo no rodapé. -->
      <template slot="footer">
        <slot name="footer" />
      </template>
    </vi-card></vi-wrapper>
  </div>
</template>
<script>
import ViWrapper from './Wrapper.vue';
import ViCard from './Card.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import colorsMixin from '../mixins/colors';

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
    * Texto exibido no título.
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
     * Url da modal.
     */
    baseURL: {
      type: String,
      default: null,
    },
    /**
     * Impede que usuário feche a modal.
     */
    notDismissable: {
      type: Boolean,
      default: false,
    },
    /**
    * Desativa tecla ESC fecha modal. Sempre `true` se `notDismissable` igual `true`.
    */
    disableCloseOnESC: {
      type: Boolean,
      default: false,
    },
    /**
    * Se `true` ao clicar no background. Sempre `true` se `notDismissable` igual `true`.
    */
    disableBackgroundClose: {
      type: Boolean,
      default: false,
    },
    /**
    * Esconde botão de fechar modal. Sempre `true` se `notDismissable` igual `true`.
    */
    hideCloseButton: {
      type: Boolean,
      default: false,
    },
    /**
    * Estado da modal
    * @model
    */
    value: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    toggleModal(value = false) {
      this.isOpen = value;
      if (this.value !== value) {
        /**
         * Alteração do estado do componente.
         *
         * @event input
         * @type {boolean}
         */
        this.$emit('input', value);
      }
    },
    closed() {
      /**
       * Modal foi fechada.
       *
       * @event close
       * @type {none}
       */
      this.$emit('closed');
    },
    open() {
      /**
       * Modal foi aberta.
       *
       * @event open
       * @type {none}
       */
      this.$emit('open');
    },
    escEvent(e) {
      if (e.keyCode === 27) {
        this.toggleModal();
      }
    },
    changeUrl(isOpen) {
      if (isOpen) this.lastPage = window.location.href.replace(this.baseURL, '');
      setTimeout(() => {
        const newLocation = isOpen ? `${ this.lastPage }${ this.baseURL }` : this.lastPage;
        history.pushState(null, null, newLocation);
      }, 200);
    },
    startOpen() {
      if (!this.baseURL) {
        if (this.value) this.toggleModal(this.value)
      } else {
        if (new RegExp(this.baseURL).test(window.location.href)) this.$emit('input', true);
      }
    },
    modalStateHandler(stateModal) {
      this.toggleModal(stateModal);
      if (this.baseURL) this.changeUrl(stateModal);

      if (stateModal) {
        this.open();
      } else {
        this.closed();
      }

      if (stateModal & !this.notDismissable & !this.disableCloseOnESC) {
        this.isEventRegistered = true;
        document.body.addEventListener('keyup', this.escEvent);
      } else if (!stateModal && this.isEventRegistered) {
        this.isEventRegistered = false;
        document.body.removeEventListener('keyup', this.escEvent);
      }
    }
  },
  watch: {
    value(stateModal) {
      this.modalStateHandler(stateModal);
    },
  },
  data() {
    return {
      isOpen: false,
      isEventRegistered: false,
      lastPage: '',
    };
  },
  mounted() {
    this.startOpen();
  }
};
</script>
<style lang="stylus">
@import '../themes/main'

.ViComponent.ViModal
  align-items center
  background rgba(black, 0.4)
  display flex
  height 0
  justify-content center
  left 0
  opacity 0
  overflow hidden
  padding 10px
  position fixed
  transition opacity 0.3s ease-in-out 0.4s, height 0s linear 0.7s
  top 0
  width 100vw
  z-index 200

  &.ViModal
    &--mini
      padding 2px
    &--small
      padding 5px
    &--large
      padding 20px

  .ViModal__Wrapper
    backface-visibility hidden
    transform translate3d(0,0,0)
    flex-grow 0
    opacity 0
    max-height 100%
    max-width 100%
    transform translate(0, -50px)
    transition transform 0.4s ease-in-out 0.2s, opacity 0.3s linear 0.1s
    .ViModal__Card  .ViCard__Section
      opacity 0
      transform translate(0, -15px)
      transition transform 0.3s ease-in-out 0.3s, opacity 0.2s linear 0.3s

  &--open
    backface-visibility hidden
    height 100vh
    opacity 1
    transition opacity 0.4s ease-in-out
    transform translate3d(0,0,0)
    will-change opacity

    .ViModal__Wrapper
      backface-visibility hidden
      opacity 1
      transform translate(0, 0) translate3d(0,0,0)
      will-change transform, opacity
      .ViModal__Card .ViCard__Section
        backface-visibility hidden
        opacity 1
        transform translate(0, 0) translate3d(0,0,0)
        will-change transform, opacity
        .ViModal__CloseButton
          opacity 1
          will-change opacity

  &--not-dismissable
    cursor default
    .ViModal__CloseButton
      display none

  .ViCard.ViModal__Card
    transition transform 0.2s ease-in-out 0.1s
    max-width 100%
    max-height 100%

    .ViModal__CloseButton
      transition opacity 0.1s linear 0.6s
      border 0
      box-shadow 0
      opacity 0
      padding 10px
      position absolute
      right 0
      top 0

    .ViCard__Body
      overflow-x hidden
      overflow-y auto
      -webkit-overflow-scrolling touch  /* para chrome e safari mobile */
</style>

<docs>

### Exemplo de modal

```jsx
<vi-modal primary large-spacing title="Exemplo de modal" title-size="2">
Essa modal inicia aberta.
</vi-modal>
```

### Exemplo completo modal

Obs: Evite sobrepor modais sempre que possível.

```vue
<template>
  <div>
    <vi-button primary @click="firstModalIsOpen = !firstModalIsOpen">Abrir alerta</vi-button>
    <vi-modal
      lock-scroll-background
      title="Título da Modal"
      title-size="2"
      large-spacing
      v-model="firstModalIsOpen"
      :baseURL="baseURLFirst"
    >
      <div slot="body">
        Exemplo de modal em uso
      </div>
      <div slot="footer">
        <vi-wrapper justify-content="flex-end">
          <vi-button
            outlined
            dark
            @click="firstModalIsOpen = false"
          >Fecha</vi-button>
          <vi-button
            success
            @click="secondModalIsOpen = true"
          >Exemplo 2</vi-button>
          <vi-button
            primary
            @click="firstModalIsOpen = false; thirdModalIsOpen = true"
          >Exemplo 3</vi-button>
        </vi-wrapper>
      </div>
    </vi-modal>

    <vi-modal
      success
      title="Sucesso!"
      width="300px"
      v-model="secondModalIsOpen"
      title-size="2"
    >
      Evite sobrepor modais sempre que possível.
    </vi-modal>

    <vi-modal
      title="Modal com scroll"
      width="500px"
      v-model="thirdModalIsOpen"
      :baseURL="baseURLThird"
      title-size="2"
    >
      <div slot="body">
        <p>Modais com scroll mantem o footer e o header visíveis para facilitar navegação.</p>
        <p>Exemplo:</p>
        <hr/>
        <h3>Chapter One </h3>
        <hr/>
        <h4>page 1</h4>
        <blockquote>IT BEGINS, AS MOST THINGS BEGIN, WITH A SONG.</blockquote>
        <p>In the beginning, after all, were the words, and they came with a tune. That was how the world was made, how the void was divided, how the lands and the stars and the dreams and the little gods and the animals, how all of them came into the world.</p>

        <p>They were sung.</p>

        <p>The great beasts were sung into existence, after the Singer had done with the planets and the hills and the trees and the oceans and the lesser beasts. The cliffs that bound existence were sung, and the hunting grounds, and the dark. Songs remain. They last. The right song can turn an emperor into a laughingstock, can bring down dynasties. A song can last long after the events and the people in it are dust and dreams and gone. That’s the power of songs. There are other things you can do with songs. They do not only make worlds or recreate existence. Fat Charlie Nancy’s father, for example, was simply using them to have what he hoped and expected would be a marvelous night out.</p>

        <p>Before Fat Charlie’s father had come into the bar, the barman had been of the opinion that the whole karaoke evening was going to be an utter bust; but then the little old man had sashayed into the room, walked past the table of several blonde women with the fresh sunburns and smiles of tourists, who were sitting by the little makeshift stage in the corner. He had tipped his hat to them, for he wore a hat, a spotless green fedora, and lemon-yellow gloves, and then he walked over to their table. They giggled.</p>

        <hr/>
        <h4>page 2</h4>

        <p>“Are you enjoyin’ yourselves, ladies?” he asked.</p>

        <p>They continued to giggle and told him they were having a good time, thank you, and that they were here on vacation. He said to them, it gets better,just you wait. He was older than they were, much, much older, but he was charm itself, like something from a bygone age when fine manners and courtly gestures were worth something. The barman relaxed. With someone like this in the bar, it was going to be a good evening.</p>

        <p>There was karaoke. There was dancing. The old man got up to sing, on the makeshift stage, not once, that evening, but twice. He had a fine voice, and an excellent smile, and feet that twinkled when he danced. The first time he got up to sing, he sang “What’s New Pussycat?” The second time he got up to sing, he ruined Fat Charlie’s life.</p>
      </div>
      <div slot="footer">
        <vi-wrapper justify-content="flex-end">
          <vi-button
            outlined
            dark
            @click="thirdModalIsOpen = false"
          >Fecha</vi-button>
          <vi-button
            primary
            @click="firstModalIsOpen = true; thirdModalIsOpen = false"
          >Exemplo 1</vi-button>
        </vi-wrapper>
      </div>
    </vi-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      firstModalIsOpen: false,
      secondModalIsOpen: false,
      thirdModalIsOpen: false,
      baseURLFirst: '&modal=exemploModal',
      baseURLThird: '&modal=scrollModal',
    };
  },
};
</script>
```
</docs>
