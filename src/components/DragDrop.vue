<template>
  <vi-wrapper
    vertical>
    <draggable
      :list="list">
      <slot name="elements"/>
    </draggable>
  </vi-wrapper>
</template>
<script>
import draggable from 'vuedraggable';
import ViWrapper from './Wrapper.vue';
import ViCard from './Card.vue';
import { widthMixin } from '../mixins/sizes';
import colorsMixin from '../mixins/colors';

export default {
  name: 'ViDragDrop',
  mixins: [widthMixin, colorsMixin],
  components: {
    ViWrapper,
    ViCard,
    draggable,
  },
  props: {
    /*
    * Lista dos elementos
    */
    dragList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.list = this.dragList;
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
  <vi-drag-drop :dragList.sync="pessoas">
    <vi-card slot="elements" v-for="pessoa in pessoas" @keys="pessoa.nome" light>
      <div slot="body">{{pessoa.nome}}</div>
    </vi-card>
  </vi-drag-drop>
</template>
<script>
export default {
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
