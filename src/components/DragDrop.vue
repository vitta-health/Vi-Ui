<template>
  <draggable v-bind="$props">
    <slot/>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable';
import ViWrapper from './Wrapper.vue';
import ViCard from './Card.vue';
import { widthMixin } from '../mixins/sizes';
import colorsMixin from '../mixins/colors';

export default {
  name: 'ViDragDrop',
  mixins: [widthMixin, colorsMixin, draggable],
  components: {
    ViWrapper,
    ViCard,
    draggable,
  },
};
</script>
<style lang="stylus">
@import '../themes/main'

.ViComponent.ViCard
  border-radius 0.3em
  box-shadow 0 5px 9px 0 rgba(0,0,0,0.08)
  width 100%

  ../../.flexWrapper--grid
    .ViCard
      height 100%
</style>

```

<docs>

### Drag 'n Drop
```vue
<template>
  <div>
  <h1>Lista Pessoas</h1>
    <vi-drag-drop :list="pessoas" :options="{group:'people'}">
      <div
        v-for="(pessoa, index) in pessoas"
        :key="index"
      light>
        <div>{{pessoa.nome}}</div>
      </div>
    </vi-drag-drop>
    <h1>Lista Mortos</h1>
    <vi-drag-drop :list="mortos" :options="{group:'people'}">
      <div
      v-for="(pessoa, index) in mortos"
      :key="index"
      light>
        <div>{{pessoa.nome}}</div>
      </div>
    </vi-drag-drop>
  <div>
    {{pessoas}}
    {{mortos}}
  </div>
  </div>
</template>
<script>
const draggable = require('vuedraggable');
export default {
  components: {
    draggable,
  },
  data() {
    return {
      pessoas: [
        {
          nome: 'Foo',
        },
        {
          nome: 'Bar',
        },
        {
          nome: 'Jon',
        },
        {
          nome: 'Doe',
        },
      ],
      mortos: [
        {
          nome: 'Teste',
        },
      ]
    }
  }
}
</script>

```

</docs>
