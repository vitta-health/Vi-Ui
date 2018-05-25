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
      class="ViCard__Title--Text
      ViCard__Title"> {{ title }} </h1>
    <h2
      v-if="sizeTitle === 2"
      class="ViCard__Title--Text
      ViCard__Title"
      @style="{ backgroundColor }"> {{ title }} </h2>
    <h3
      v-if="sizeTitle === 3"
      class="ViCard__Title--Text
      ViCard__Title"
      @style="{ backgroundColor }"> {{ title }} </h3>
    <h4
      v-if="sizeTitle === 4"
      class="ViCard__Title--Text
      ViCard__Title"
      @style="{ backgroundColor }"> {{ title }} </h4>
    <h5
      v-if="sizeTitle === 5"
      class="ViCard__Title--Text
      ViCard__Title"
      @style="{ backgroundColor }"> {{ title }} </h5>
    <h6
      v-if="sizeTitle === 6"
      class="ViCard__Title--Text
      ViCard__Title"
      @style="{ backgroundColor }"> {{ title }} </h6>
    <div class="ViCard__Body">
      <!-- @slot Use este slot para definir o contéudo que estara presente dentro do corpo do card -->
      <slot name="body"/>
    </div>
    <div
      class="ViCard__Footer">
      <!-- @slot Use este slot para definir o contéudo que estara presente dentro do rodapé -->
      <slot name="footer"/>
    </div>
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
      default: 'auto',
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
      default: 1,
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

  .ViCard__Title
    color #3e3e3e
    margin-left 30px

  .ViCard__Title--Text
    font-weight 300

  .ViCard__Body
    padding 20px
</style>

```

<docs>

Card Básico
```vue
<template>
  <vi-card width="300" title="Este é um título do card tamanho 1" :sizeTitle="1">
    <p slot="body">Este é um parágrafo contido no slot do body</p>
    <p slot="footer">Este é o rodapé</p>
  </vi-card>
</template>
<script>
export default {

}
</script>
<style>

</style>
```

Card Mais complexo
```vue
<template>
  <vi-wrapper justify-content="space-between" class="greyBox">
    <vi-card v-for="(character, index) in characters" width="300">
      <div slot="body">
        <img class="avatar" :src="character.avatar"/>
        <div class="descrition">
          <h4 class="name">{{character.name}} aka {{character.superHeroName}}</h4>
          <span class="birth-day">{{character.birthDate}} {{character.age}}</span>
          <span>{{character.gender}}</span>
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
          gender: 'Masculino'
        },
        {
          name: 'James Howlett logan',
          superHeroName: 'Wolverine',
          birthDate: '??/??/1880',
          age: '(128a)',
          avatar: 'https://i.imgur.com/g6nGMDv.jpg',
          gender: 'Masculino',
        },
        {
          name: 'Steven "Steve" Rogers',
          superHeroName: 'Capitão América',
          birthDate: '??/??/1941',
          age: '(128a)',
          avatar: 'https://i.imgur.com/S6Jfkqa.jpg',
          gender: 'Masculino',
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
    width:70px;
    height: 70px;
    margin-right: 20px;
    float: left;
  }
  .name {
    margin-bottom: 6px;
  }
  .birth-day {
    white-space: nowrap;
  }
</style>
```
</docs>
