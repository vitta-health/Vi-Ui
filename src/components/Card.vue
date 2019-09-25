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
      colorClass({ bg: true, default: defaultColor }),
    ]"
    :style="{ width: componentWidth }"
  >
    <vi-wrapper justify-content="space-between" class="ViCard__Header ViCard__Section">
      <component v-if="title" :is="titleTag" class="ViCard__Title">{{ title }}</component>
      <!-- @slot  Use o slot `side` que conteúdo ao lado título. -->
      <slot name="side" />
      <slot name="close" />
    </vi-wrapper>
    <div class="ViCard__Body ViCard__Section" ref="body">
      <!-- @slot Use o slot `body` para definir o conteúdo no corpo do card. -->
      <slot name="body" />
      <slot />
    </div>
    <div v-if="$slots.footer" class="ViCard__Footer ViCard__Section">
      <!-- @slot Use o slot `footer` para definir o conteúdo no rodapé do card. -->
      <slot name="footer" />
    </div>
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
     * _Espaçamento:_ Define o menor espaçamento do card.
     */
    miniSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Espaçamento:_ Define o espaçamento pequeno do card.
     */
    smallSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Espaçamento:_ Define o maior espaçamento do card.
     */
    largeSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Espaçamento:_ Remove paddings do card.
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
      if (!this.titleSize) return 'p';
      return `h${this.titleSize}`;
    },
  },
};
</script>
<style lang="stylus">
@import '../themes/main'

.ViComponent.ViCard
  border-radius 0.3em
  box-shadow 0 5px 9px 0 rgba(0, 0, 0, 0.08)
  width 100%

  ../../.flexWrapper--grid
    .ViCard
      height 100%

  & > .contentWrapper.ViCard__Header
    flex-shrink 0

  & > .contentWrapper.ViCard__Section
    margin 0
    padding 10px 20px

    &:first-child
      padding-top 20px

    &:last-child
      padding-bottom 20px

  &--mini
    & > .contentWrapper.ViCard__Section
      padding 2.5px 5px

      &:first-child
        padding-top 5px

      &:last-child
        padding-bottom 5px

  &--small
    & > .contentWrapper.ViCard__Section
      padding 5px 10px

      &:first-child
        padding-top 10px

      &:last-child
        padding-bottom 10px

  &--large
    & > .contentWrapper.ViCard__Section
      padding 10px 35px

      &:first-child
        padding-top 35px

      &:last-child
        padding-bottom 35px

  &--no-spacing
    & > .contentWrapper.ViCard__Section
      &, &:first-child, &:last-child
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
  <vi-wrapper grid class="ViComponent greyBox">
    <vi-card v-for="character in characters" :key="character.idHero">
      <div slot="body">
        <vi-wrapper>
          <img class="avatar" :src="character.avatar" />
          <vi-wrapper vertical child-wrapper>
            <h4 class="name">
              {{ character.name }}<br />
              <small>aka {{ character.superHeroName }}</small>
            </h4>
            <p class="birth-day">{{ character.birthDate }} {{ character.age }}</p>
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
          avatar: './img/spider.png',
        },
        {
          idHero: 1,
          name: 'James Howlett logan',
          superHeroName: 'Wolverine',
          birthDate: '??/??/1880',
          age: '(128a)',
          avatar: './img/wolverine.jpg',
        },
      ],
    };
  },
};
</script>

<style>
.greyBox {
  background: #eaeaea;
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
