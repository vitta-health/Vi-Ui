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
<vi-card :width="300" class="ViCard-Element">
  <h1 slot="Header" class="title-example">Desaparecido</h1>
  <div slot="Body">
    <img class="avatar" src="https://i.imgur.com/LuyN22o.jpg?1"/>
    <div class="descrition">
      <h4 class="name">Peter Parker aka Spiderman</h4>
      <span class="birth-day">08/01/1989 (29a e 7m)</span>
      <span>Masculino</span>
    </div>
  </div>
  <div slot="Footer">
    <vi-button :large="true" :width="'116%'" class="button">Avançar!</vi-button>
  </div>
</vi-card>
<vi-card :width="300">
  <h1 slot="Header" class="title-example">Desaparecido</h1>
  <div slot="Body">
    <img class="avatar" src="https://i.imgur.com/g6nGMDv.jpg"/>
    <div class="descrition">
      <h4 class="name">James Howlett logan aka Wolverine</h4>
      <span class="birth-day">??/??/1880 (127a)</span>
      <span>Masculino</span>
    </div>
  </div>
  <div slot="Footer">
    <vi-button :large="true" :width="'116%'" class="button">Avançar!</vi-button>
  </div>
</vi-card>

<vi-card :width="300">
  <h1 slot="Header" class="title-example">Desaparecido</h1>
  <div slot="Body">
    <img class="avatar" src="https://i.imgur.com/g6nGMDv.jpg"/>
    <div class="descrition">
      <h4 class="name">James Howlett logan aka Wolverine</h4>
      <span class="birth-day">??/??/1880 (127a)</span>
      <span>Masculino</span>
    </div>
  </div>
  <div slot="Footer">
    <vi-button :large="true" :width="'116%'" class="button">Avançar!</vi-button>
  </div>
</vi-card>

<vi-card :width="300">
  <h1 slot="Header" class="title-example">Desaparecido</h1>
  <div slot="Body">
    <img class="avatar" src="https://i.imgur.com/g6nGMDv.jpg"/>
    <div class="descrition">
      <h4 class="name">James Howlett logan aka Wolverine</h4>
      <span class="birth-day">??/??/1880 (127a)</span>
      <span>Masculino</span>
    </div>
  </div>
  <div slot="Footer">
    <vi-button large :width="'116%'" class="button">Avançar!</vi-button>
  </div>
</vi-card>

</div>
</template>
<script>
export default {}
</script>
<style>
  .title-example {
    margin-top: 0;
    text-align: center;
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
  .button {
    top: 21px;
    position: relative;
    right: 20px;
  }

  .ViCard-Element {
    margin-bottom: 20px;
  }
</style>
```
</docs>
