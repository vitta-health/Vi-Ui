<template>
  <span aria-hidden="true" :class="icon" />
</template>

<script>
/**
 * @deprecated since 0.0.22
 */
export default {
  name: 'ViIcon',
  props: {
    /**
     * Nome do ícone escolhido.
     */
    name: {
      type: String,
      default: null,
    },
  },
  computed: {
    icon() {
      return `vi-icon vi-icon-${this.name}`;
    },
  },
};
</script>

<docs>

Obs: Nas próximas versões existem o risco de breaking changes.
Todos os desenhos irão mudar e provavelmente boa parte deles será renomeada.

### Como utilizar

```jsx
<vi-icon name="heart-beats" />
```

### Lista de icones

```vue noeditor
<template>
  <vi-wrapper no-spacing class="ViIconWrapperDemo">
    <span class="ViIconDemo"><vi-icon name="arrow" /> arrow</span>
    <span class="ViIconDemo"><vi-icon name="arrow-left" /> arrow-left</span>
    <span class="ViIconDemo"><vi-icon name="birthday-cake" /> birthday-cake</span>
    <span class="ViIconDemo"><vi-icon name="box" /> box</span>
    <span class="ViIconDemo"><vi-icon name="calendar" /> calendar</span>
    <span class="ViIconDemo"><vi-icon name="calendar-thin" /> calendar-thin</span>
    <span class="ViIconDemo"><vi-icon name="chat" /> chat</span>
    <span class="ViIconDemo"><vi-icon name="chat-active" /> chat-active</span>
    <span class="ViIconDemo"><vi-icon name="check" /> check</span>
    <span class="ViIconDemo"><vi-icon name="checklist" /> checklist</span>
    <span class="ViIconDemo"><vi-icon name="chevron-down" /> chevron-down</span>
    <span class="ViIconDemo"><vi-icon name="chevron-next" /> chevron-next</span>
    <span class="ViIconDemo"><vi-icon name="chevron-prev" /> chevron-prev</span>
    <span class="ViIconDemo"><vi-icon name="chevron-small-down" /> chevron-small-down</span>
    <span class="ViIconDemo"><vi-icon name="clock" /> clock</span>
    <span class="ViIconDemo"><vi-icon name="cross" /> cross</span>
    <span class="ViIconDemo"><vi-icon name="danger-symbol" /> danger-symbol</span>
    <span class="ViIconDemo"><vi-icon name="download" /> download</span>
    <span class="ViIconDemo"><vi-icon name="excel" /> excel</span>
    <span class="ViIconDemo"><vi-icon name="exit" /> exit</span>
    <span class="ViIconDemo"><vi-icon name="double-chevron-left" /> double-chevron-left</span>
    <span class="ViIconDemo"><vi-icon name="double-chevron-right" /> double-chevron-right</span>
    <span class="ViIconDemo"><vi-icon name="flag" /> flag</span>
    <span class="ViIconDemo"><vi-icon name="heart-beats" /> heart-beats</span>
    <span class="ViIconDemo"><vi-icon name="interface" /> interface</span>
    <span class="ViIconDemo"><vi-icon name="line-chart" /> line-chart</span>
    <span class="ViIconDemo"><vi-icon name="list" /> list</span>
    <span class="ViIconDemo"><vi-icon name="mail" /> mail</span>
    <span class="ViIconDemo"><vi-icon name="magnifying-glass" /> magnifying-glass</span>
    <span class="ViIconDemo"><vi-icon name="manager-panel" /> manager-panel</span>
    <span class="ViIconDemo"><vi-icon name="money" /> money</span>
    <span class="ViIconDemo"><vi-icon name="message" /> message</span>
    <span class="ViIconDemo"><vi-icon name="others" /> others</span>
    <span class="ViIconDemo"><vi-icon name="padlock" /> padlock</span>
    <span class="ViIconDemo"><vi-icon name="paper" /> paper</span>
    <span class="ViIconDemo"><vi-icon name="passage-time" /> time</span>
    <span class="ViIconDemo"><vi-icon name="people" /> people</span>
    <span class="ViIconDemo"><vi-icon name="person" /> person</span>
    <span class="ViIconDemo"><vi-icon name="card" /> card</span>
    <span class="ViIconDemo"><vi-icon name="exclamation" /> exclamation</span>
    <span class="ViIconDemo"><vi-icon name="print" /> print</span>
    <span class="ViIconDemo"><vi-icon name="pen" /> pen</span>
    <span class="ViIconDemo"><vi-icon name="plus" /> plus</span>
    <span class="ViIconDemo"><vi-icon name="question" /> question</span>
    <span class="ViIconDemo"><vi-icon name="question-circle" /> question-circle</span>
    <span class="ViIconDemo"><vi-icon name="refresh" /> refresh</span>
    <span class="ViIconDemo"><vi-icon name="document" /> document</span>
    <span class="ViIconDemo"><vi-icon name="rounded-minus" /> rounded-minus</span>
    <span class="ViIconDemo"><vi-icon name="rounded-x" /> round-x</span>
    <span class="ViIconDemo"><vi-icon name="rounded-plus" /> rounded-plus</span>
    <span class="ViIconDemo"><vi-icon name="rounded-money" /> rounded-money</span>
    <span class="ViIconDemo"><vi-icon name="search-file" /> search-file</span>
    <span class="ViIconDemo"><vi-icon name="settings" /> settings</span>
    <span class="ViIconDemo"><vi-icon name="shopping-basket" /> shopping-basket</span>
    <span class="ViIconDemo"><vi-icon name="stethoscope" /> stethoscope</span>
    <span class="ViIconDemo"><vi-icon name="trash" /> trash</span>
    <span class="ViIconDemo"><vi-icon name="upload" /> upload</span>
    <span class="ViIconDemo"><vi-icon name="user-add" /> user-add</span>
    <span class="ViIconDemo"><vi-icon name="write-document" /> write-document</span>
    <span class="ViIconDemo"><vi-icon name="vitta" /> vitta</span>
  </vi-wrapper>
</template>

<script>
export default {};
</script>

<style>
.ViIconWrapperDemo {
  flex-flow: row wrap;
}

.ViIconDemo {
  width: 90px;
  height: 90px;
  display: block;
  text-align: center;
  margin: 0 0 20px;
}

.vi-icon {
  color: '#5AC2A0';
  margin: 0 auto 10px;
  display: block;
}
</style>
```

</docs>
