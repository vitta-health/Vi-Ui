<template>
  <div
    class="ViComponent ViCard"
    :class="[
      {
        'ViCard--mini': mini,
        'ViCard--small': small,
        'ViCard--large': large,
      },
      colorClass({ background: true, default: 'light' }),
    ]"
    :style="{'width': cardWidth}">
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
  </div>
</template>
<script>
import sizeMixin from '../mixins/sizes';
import colorsMixin from '../mixins/colors';

export default {
  name: 'ViCard',
  mixins: [sizeMixin, colorsMixin],
  props: {
    /**
     * Largura do card
     */
    width: {
      type: [String, Number],
      default: '100%',
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
    cardWidth() {
      if (Number.isNaN(this.width - 0)) return this.width;
      return `${this.width}px`;
    },
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
  @import '../themes/colors';

  .ViCard
    background-color #fff
    border-radius 0.3em
    box-shadow 0 5px 9px 0 rgba(0,0,0,0.08)
    display flex
    flex-direction column
    justify-content space-between
    padding 40px
    width 100%

    &__Title
    &__Body
      margin-bottom 20px

    &--mini
      padding 10px

      &__Title
      &__Body
        margin-bottom 5px

    &--small
      padding 20px

      &__Title
      &__Body
        margin-bottom 10px

    &--large
      padding 60px

      &__Title
      &__Body
        margin-bottom 30px

    &__Title
      color #3e3e3e
      font-weight 300

    > :last-child
      margin-bottom 0
</style>

```

<docs>

Card Básico
```jsx
  <vi-card title="Este é um título do card tamanho 1" :sizeTitle="3">
    <p slot="body">Este é um parágrafo contido no slot do body</p>
    <p slot="footer"><vi-button>Botão do footer</vi-button></p>
  </vi-card>
```

Card Mais complexo
```vue
<template>
  <vi-wrapper
    proportinal
    noChildWrapper
    class="ViComponent greyBox"
    justify-content="space-between"
    :spacing="20"
  >
    <vi-card v-for="(character, index) in characters" small>
      <div slot="body">
        <vi-wrapper noChildWrapper :spacing="20">
          <img class="avatar" :src="character.avatar"/>
          <vi-wrapper vertical noChildWrapper class="descrition">
            <h4 class="name">{{character.name}} aka {{character.superHeroName}}</h4>
            <p class="birth-day">{{character.birhDate}} {{character.age}}</p>
            <vi-button success mini outlined pill>Avançar!</vi-button>>
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
