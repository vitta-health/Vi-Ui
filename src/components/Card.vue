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
    <h1
      v-if="sizeTitle === 1"
      class="ViCard__Title
      ViCard__Title"> {{ title }} </h1>
    <h2
      v-else-if="sizeTitle === 2"
      class="ViCard__Title
      ViCard__Title"
      @style="{ backgroundColor }"> {{ title }} </h2>
    <h3
      v-else-if="sizeTitle === 3"
      class="ViCard__Title
      ViCard__Title"
      @style="{ backgroundColor }"> {{ title }} </h3>
    <h4
      v-else-if="sizeTitle === 4"
      class="ViCard__Title
      ViCard__Title"
      @style="{ backgroundColor }"> {{ title }} </h4>
    <h5
      v-else-if="sizeTitle === 5"
      class="ViCard__Title
      ViCard__Title"
      @style="{ backgroundColor }"> {{ title }} </h5>
    <h6
      v-else-if="sizeTitle === 6"
      class="ViCard__Title
      ViCard__Title"
      @style="{ backgroundColor }"> {{ title }} </h6>
    <p
      v-else-if="title"
      class="ViCard__Title
      ViCard__Title"
      @style="{ backgroundColor }"> {{ title }} </p>
    <div class="ViCard__Body">
      <!-- @slot Use este slot para definir o contéudo que estara presente dentro do corpo do card -->
      <slot name="body"/>
    </div>

    <!-- @slot Use este slot para definir o contéudo que estara presente dentro do rodapé -->
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
      default: '',
    },
    /**
    * Tamanho do texto do título, de 1 a 6
    */
    sizeTitle: {
      type: Number,
      default: null,
    },
  },
  computed: {
    cardWidth() {
      if (Number.isNaN(this.width - 0)) return this.width;
      return `${this.width}px`;
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
  <vi-wrapper justify-content="space-between" :spacing="10" class="ViComponent greyBox">
    <vi-card v-for="(character, index) in characters" mini>
      <div slot="body">
        <img class="avatar" :src="character.avatar"/>
        <div class="descrition">
          <h4 class="name">{{character.name}} aka {{character.superHeroName}}</h4>
          <span class="birth-day">{{character.birthDate}} {{character.age}}</span>
        </div>
      </div>
      <div slot="footer">
        <vi-button success large width="100%">Avançar!</vi-button>
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
          avatar: 'https://i.imgur.com/LuyN22o.jpg?1',
        },
        {
          name: 'James Howlett logan',
          superHeroName: 'Wolverine',
          birthDate: '??/??/1880',
          age: '(128a)',
          avatar: 'https://i.imgur.com/g6nGMDv.jpg',
        },
        {
          name: 'Steven "Steve" Rogers',
          superHeroName: 'Capitão América',
          birthDate: '??/??/1941',
          age: '(128a)',
          avatar: 'https://i.imgur.com/S6Jfkqa.jpg',
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
    border-radius: 70px;
    float: left;
    height: 70px;
    margin-right: 20px;
    width:70px;
  }
  .name {
    margin: 0 0 6px;
  }
</style>
```
</docs>
