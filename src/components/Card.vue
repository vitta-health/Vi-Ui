<template>
  <div
    class="ViCard"
    :style="{'width': cardWidth}">
    <div class="card-header">
      <!-- @slot Use this slot header -->
      <slot name="Header"/>
    </div>
    <div class="card-body">
      <!-- @slot Use this slot body -->
      <slot name="Body"/>
    </div>
    <div class="card-footer">
      <!-- @slot Use this slot footer -->
      <slot name="Footer"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ViCard',
  props: {
    /**
     * Largura do card (Passe numero fazendo bind da prop)
     */
    width: {
      type: [String, Number],
      default: 'auto',
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
<style lang="stylus" scoped>
  .ViCard
    background-color #fff
    border-radius 0.3em
    box-shadow 0 5px 9px 0 rgba(0,0,0,0.04)
    padding 20px
</style>

<docs>
Card Básico
```vue
<template>
  <div class="greyBox">
    <vi-card v-for="(character, index) in characters" width="300" class="ViCard-Element">
      <h1 slot="Header" class="title-example textTitle">Desaparecido</h1>
      <div slot="Body">
        <img class="avatar" :src="character.avatar"/>
        <div class="descrition">
          <h4 class="name">{{character.name}} aka {{character.superHeroName}}</h4>
          <span class="birth-day">{{character.birthDate}} {{character.age}}</span>
          <span>{{character.gender}}</span>
        </div>
      </div>
      <div slot="Footer">
        <vi-button success large width="100%">Avançar!</vi-button>
      </div>
    </vi-card>
  </div>
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
  h1 {
    font-size: 1.4em;
  }
  .title-example {
    margin-top: 0;
    text-align: left;
  }
  .greyBox{
    background: #EAEAEA;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
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
  .ViCard {
    position: relative;
    padding: 38px 20px 63px;
    line-height: 1em;
    overflow: hidden;
  }
  .ViButton {
    border-radius: 0.2em;
    bottom: 0;
    position: absolute;
    left: 0;
  }
  .textTitle {
    background-color: #798F98;
    height: 40px;
    line-height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #fff;
    padding-left: 21px;
    font-weight: 400;
  }
</style>
```
</docs>
