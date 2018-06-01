<template>
  <vi-wrapper
    vertical
    :tag="tag"
    class="ViComponent ViCard"
    :class="[
      {
        'ViCard--mini': mini,
        'ViCard--small': small,
        'ViCard--large': large,
      },
      colorClass({ background: true, default: 'light' }),
    ]"
    :style="{ width: componentWidth }"
  >
    <component
      v-if="title"
      :is="titleTag"
      class="ViCard__Title">{{ title }}</component>
    <div class="ViCard__Body">
      <!-- @slot Use este slot para definir o contéudo que estará presente
      dentro do corpo do card -->
      <slot name="body"/>
    </div>

    <!-- @slot Use este slot para definir o contéudo que estará presente dentro do rodapé -->
    <slot
      class="ViCard__Footer"
      name="footer"
    />
  </vi-wrapper>
</template>
<script>
import ViWrapper from './Wrapper.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import colorsMixin from '../mixins/colors';

export default {
  name: 'ViCard',
  mixins: [scaleMixin, widthMixin, colorsMixin],
  components: {
    ViWrapper,
  },
  props: {
    /**
     * Tag do card
     */
    tag: {
      type: String,
      default: 'div',
    },
    /**
    * Texto que será exibido no título
    */
    title: {
      type: String,
      default: null,
    },
    /**
    * Tamanho do texto do título, de 1 a 6
    */
    sizeTitle: {
      type: Number,
      default: null,
      validator: size => size >= 1 && size <= 6,
    },
  },
  computed: {
    titleTag() {
      if (!this.sizeTitle) {
        return 'p';
      }

      return `h${this.sizeTitle}`;
    },
  },
};
</script>
<style lang="stylus">
@import '../themes/main';

$background-card = $isDark ? $colors.dark : $colors.light

.ViComponent .ViCard
.ViComponent.ViCard
  background-color $background-card
  border-radius 0.3em
  box-shadow 0 5px 9px 0 rgba(0,0,0,0.08)
  display flex
  flex-direction column
  justify-content space-between
  padding 40px
  width 100%

  &--mini
    padding 10px

  &--small
    padding 20px

  &--large
    padding 60px

  &__Title
    margin-bottom 0
</style>

```

<docs>

Card Básico
```jsx
  <vi-card title="Este é um título do card tamanho 1" :sizeTitle="2">
    <div slot="body">Este é um parágrafo contido no slot do body</div>
    <div slot="footer"><vi-button primary>Botão no footer</vi-button></div>
  </vi-card>
```

Card Colorido
```jsx
  <vi-card success>
    <div slot="body">Card com fundo colorido</div>
    <div slot="footer"><vi-button light>Botão no footer</vi-button></div>
  </vi-card>
```

Exemplo Complexo de Card
```vue
<template>
  <vi-wrapper
    proportinal
    class="ViComponent greyBox"
    justify-content="space-between"
  >
    <vi-card v-for="(character, index) in characters" small>
      <div slot="body">
        <vi-wrapper>
          <img class="avatar" :src="character.avatar"/>
          <vi-wrapper vertical child-wrapper no-margin class="descrition">
            <h4 class="name">{{character.name}} aka {{character.superHeroName}}</h4>
            <p class="birth-day">{{character.birthDate}} {{character.age}}</p>
            <vi-button success mini outlined pill>Avançar!</vi-button>
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
          name: 'Peter Parker',
          superHeroName: 'Spider-Man',
          birthDate: '08/01/1989',
          age: '(29a e 7m)',
          avatar: '/assets/img/spider.png'
        },
        {
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
