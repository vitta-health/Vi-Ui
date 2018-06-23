<template>
  <vi-wrapper
    class="ViComponent ViCard"
    vertical
    :tag="tag"
    :class="[
      {
        'ViCard--mini': miniSpacing,
        'ViCard--small': smallSpacing,
        'ViCard--large': largeSpacing,
        'ViCard--no-spacing': noSpacing,
      },
      colorClass({ background: true, default: defaultColor }),
    ]"
    :style="{ width: componentWidth }"
    v-bind="{
      miniSpacing,
      smallSpacing,
      largeSpacing,
      noSpacing
    }"
  >
    <component
      v-if="title"
      :is="titleTag"
      class="ViCard__Title">{{ title }}</component>
      <div class="ViCard__Body">
        <!-- @slot Use slot body para definir o conteúdo no corpo do card -->
        <slot name="body"/>
        <slot/>
      </div>
    <!-- @slot Use este slot para definir o conteúdo no rodapé -->
    <slot
      class="ViCard__Footer"
      name="footer"
    />
  </vi-wrapper>
</template>
<script>
import ViWrapper from './Wrapper.vue';
import { widthMixin } from '../mixins/sizes';
import colorsMixin from '../mixins/colors';

export default {
  name: 'ViCard',
  mixins: [widthMixin, colorsMixin],
  components: {
    ViWrapper,
  },
  props: {
    /**
     * _Tamanho:_ Define o menor espaçamento do card.
     */
    miniSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Tamanho:_ Define o tamanho pequeno do card.
     */
    smallSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Tamanho:_ Define o maior tamanho do card.
     */
    largeSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Tamanho:_ Remove paddings do card.
     */
    noSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * Tag do card.
     */
    tag: {
      type: String,
      default: 'section',
    },
    /**
    * Texto exibido no título.
    */
    title: {
      type: String,
      default: null,
    },
    /**
    * Tamanho do título de 1 a 6.
    */
    titleSize: {
      type: [Number, String],
      default: null,
      validator: size => size >= 1 && size <= 6,
    },
    /**
    * @ignore Essa prop é apenas um helper para outros componentes que dependem do card. Deixar ela
    * exposta vai causar mais confusão que instruir como dever ser utilizado as props de cores.
    * O usuário final precisa apenas usar o nome das cores como prop.
    */
    defaultColor: {
      type: String,
      default: 'light',
    },
  },
  computed: {
    titleTag() {
      if (!this.titleSize) {
        return 'p';
      }

      return `h${this.titleSize}`;
    },
  },
};
</script>
<style lang="stylus">
@import '../themes/main'

$background-card = $isDark ? $colors.dark : $colors.light

.ViComponent.ViCard
  background-color $background-card
  border-radius 0.3em
  box-shadow 0 5px 9px 0 rgba(0,0,0,0.08)
  display flex
  flex-direction column
  justify-content space-between
  padding 20px
  width 100%

  ../../.flexWrapper--grid
    .ViCard
      height 100%

  &--mini
    padding 5px

  &--small
    padding 10px

  &--large
    padding 40px

  &--no-spacing
    padding 0
</style>

```

<docs>

### Card Básico
```jsx
  <vi-card
    title="Este é um título do card"
    title-size="1"
  >
    <div slot="body">Este é um parágrafo contido no slot do body</div>
    <div slot="footer"><vi-button primary>Botão no footer</vi-button></div>
  </vi-card>
```

### Card Colorido

```jsx
  <vi-card success>
    <div slot="body">Card com fundo colorido</div>
    <div slot="footer"><vi-button light>Botão no footer</vi-button></div>
  </vi-card>
```

### Exemplo elaborado de Card

Pra trabalhar com um conjunto de cards use o [ViWrapper](#Wrapper).

```vue
<template>
  <vi-wrapper
    class="ViComponent greyBox"
    grid
  >
    <vi-card
      col="4"
      colSmall="12"
      v-for="character in characters"
      :key="character.idHero"
    >
      <div slot="body">
        <vi-wrapper>
          <img class="avatar" :src="character.avatar"/>
          <vi-wrapper vertical child-wrapper no-spacing>
            <h4 class="name">{{character.name}} aka <small>{{character.superHeroName}}</small></h4>
            <p class="birth-day">{{character.birthDate}} {{character.age}}</p>
            <vi-button success small outlined pill>Avançar!</vi-button>
          </vi-wrapper>
        </vi-wrapper>
      </div>
    </vi-card>
  </vi-wrapper>
</template>
<script>
export default {
  data() {
    return {
      characters: [
        {
          idHero: 0,
          name: 'Peter Parker',
          superHeroName: 'Spider-Man',
          birthDate: '08/01/1989',
          age: '(29a e 7m)',
          avatar: '/assets/img/spider.png'
        },
        {
          idHero: 1,
          name: 'James Howlett logan',
          superHeroName: 'Wolverine',
          birthDate: '??/??/1880',
          age: '(128a)',
          avatar: '/assets/img/wolverine.jpg',
        },
      ],
    }
  }
}
</script>
<style>
  .greyBox{
    background: #EAEAEA;
    padding: 30px;
  }
  .avatar {
    border-radius: 100px;
    height: 100px;
    width: 100px;
  }
  .name {
    font-size: 1em;
    font-weight: 700;
    margin: 0 0 6px;
  }
  .birth-day {
    font-size: 0.9;
    color: rgba(0, 0, 0, 0.6);
  }
</style>
```
</docs>
