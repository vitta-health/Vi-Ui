<template>
  <div>
    <table
      class="ViTable"
      :class="[{
        'ViTable--BorderHorizontal': borderHorizontal,
        'ViTable--BorderVertical': borderVertical,
        'ViTable__Rows--Striped': striped }]">
      <thead>
        <tr class="ViTable__Rows">
          <th
            v-if="enabledCheckbox"
            class="ViTable__Checkbox">
            <input
              ref="selectedAllCheckbox"
              type="checkbox"
              @click="onSelectAll(items)">
          </th>
          <th
            v-for="(column, index) in columns"
            :key="index"
            @click="column.sortable ? onSort(column.id) : null">
            {{ column.label }}
            <div class="ViTable__Arrows">
              <div
                v-if="column.sortable"
                class="ViTable__ArrowsUp"
                :class="{ 'ViTable__Arrows--Active':
                verifySort(sortedColumn, column.id, sortedDirection, 'asc')}"/>
              <div
                v-if="column.sortable"
                class="ViTable__ArrowsDown"
                :class="{ 'ViTable__Arrows--Active':
                verifySort(sortedColumn, column.id, sortedDirection, 'desc')}"/>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
          class="ViTable__Rows"
          :class="[{ 'ViTable--Center': textCenter,
                     'ViTable--Left': textLeft,
                     'ViTable--Right': textRight }]">
          <td v-if="enabledCheckbox">
            <input
              ref="selectedCheckbox"
              @click="onSelect(index, item)"
              type="checkbox">
          </td>
          <slot :item="item"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import textAlignMixin from '../mixins/textAlign';

const availableOrders = {
  desc: 'desc',
  asc: 'asc',
};

const iterated = {
  lines: [],
  select: false,
};

export default {
  name: 'ViTable',
  mixins: [textAlignMixin],
  props: {
    /**
     * Array de objetos contendo os dados do cabeçalho da tabela.<br>
     * id:string será enviado ao evento @onSort para ordenação<br>
     * label:string texto apresentado na coluna<br>
     * sortable:boolean define se a coluna podera ser ordenada<br>
     */
    columns: {
      type: Array,
      default: () => [],
    },
    /**
     * Array de objetos contendo os dados das linhas na tabela
     */
    items: {
      type: Array,
      default: () => [],
    },
    /**
     * Indica qual coluna esta ordenada atualmente, normalmente este campo é o id da columns
     */
    sortedColumn: {
      type: String,
      default: null,
    },
    /**
     * Indica a direção da ordenação ['asc' | 'desc']
     */
    sortedDirection: {
      type: String,
      default: 'asc',
      validator: value => value in availableOrders,
    },
    /**
     * Mostra linhas em cores alternadas
     */
    striped: {
      type: Boolean,
      default: false,
    },
    /**
     * Habilita bordas vertical na tabela
     */
    borderVertical: {
      type: Boolean,
      default: false,
    },
    /**
     * Habilita bordas horizontais na tabela
     */
    borderHorizontal: {
      type: Boolean,
      default: false,
    },
    /**
     * Habilita os checkbox para seleção de linhas
     */
    enabledCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
    * Evento disparado ao clicar em um cabeçalho da tabela para ordenação.
    * @event onSort
    * @type {string}
    * @returns {string} retorna uma string da coluna de ordenação e o tipo
    */
    onSort(value) {
      this.$emit('onSort', this.sortedDirection === availableOrders.desc ? `-${value}` : value);
    },
    /**
    * Evento disparado ao selecionar todos os registros no checkbox.
    * @event onSelectAll
    * @type {object}
    * @returns {object} objeto contendo todos os registros selecionados
    */
    onSelectAll(values) {
      iterated.lines = [];
      this.$refs.selectedCheckbox.map((row, index) => {
        if (this.$refs.selectedAllCheckbox.checked) {
          iterated.lines.push(values);
          iterated.select = true;
          this.$refs.selectedCheckbox[index].checked = true;
          return null;
        }
        iterated.lines.push(values);
        iterated.select = false;
        this.$refs.selectedCheckbox[index].checked = false;
        return null;
      });
      this.$emit('onSelectAll', iterated);
    },
    /**
    * Evento disparado ao selecionar <b>um</b> registro da linha.
    *
    * @event onSelect
    * @type {object}
    * @returns {object} retorna um objeto contendo os dados da linha selecionada
    */
    onSelect(field, data) {
      iterated.lines = [];
      iterated.select = this.$refs.selectedCheckbox[field].checked;
      iterated.lines.push(data);
      this.$emit('onSelect', iterated);
    },
    verifySort(sortedColumn, id, sortedDirection, orderType) {
      return sortedColumn === id && sortedDirection === orderType;
    },
  },
};
</script>

<style lang="stylus">
  @import '../themes/main'
  @import '../themes/colors'

  .ViTable
    border-spacing 0
    width 100%
    border-collapse collapse
    &.ViTable td
    &.ViTable th
      padding 1em
    &.ViTable--BorderVertical
    &.ViTable--BorderHorizontal td
    &.ViTable--BorderHorizontal th
      border-bottom 1px solid #ddd
      border-top 1px solid #ddd
    &.ViTable--BorderVertical td
    &.ViTable--BorderVertical th
      border-left 1px solid #ddd
      border-right 1px solid #ddd
    &.ViTable__Rows--Striped tr:nth-child(even) td
      background-color rgba(0, 0, 0, 0.03)

  .ViTable thead th
    padding 0 24px 0 0
    height 38px
    background-color rgba(0, 0, 0, 0.1)

    &:hover
      cursor pointer
      background-color rgba(0, 0, 0, 0.05)

  .ViTable__Checkbox
    width: 1%

  .ViTable__ArrowsUp
    width 0
    height 0
    border-left 5px solid transparent
    border-right 5px solid transparent
    border-bottom 5px solid rgba(0,0,0,0.2)
    margin 3px 2px 0px 5px
    &.ViTable__Arrows--Active
      border-bottom 5px solid black

  .ViTable__ArrowsDown
    @extend .ViTable__ArrowsUp
    transform rotate(180deg)

  .ViTable__Arrows
    margin-left 5px
    float right

  .ViTable__Rows
    height 38px

  .ViTable thead th:first-child
    padding 0 24px

  .ViTable thead tr
    text-align left

  .ViTable tbody td:first-child
    @extend .ViTable thead th:first-child

  .ViTable--Center
    text-align center

  .ViTable--Left
    text-align left

  .ViTable--Right
    text-align right

</style>

<docs>
Basic Table

```vue
<template>
  <vi-table
    :sortedColumn="orderColumn"
    :sortedDirection="order"
    striped
    enabledCheckbox
    @onSort="order => getOrder(order)"
    @onSelectAll="data => getSelectedAll(data)"
    @onSelect="data => getSelectedItem(data)"
    :columns="cols"
    :items="data">
    <template slot-scope="{ item }">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.company }}</td>
    </template>
  </vi-table>
</template>

<script>

export default {
  data() {
    return {
      cols: [
        { id:'codCompany', label:'ID', sortable: true },
        { id:'name', label:'Name', sortable: true },
        { id:'company', label:'Company', sortable: true },
      ],
      data: [
        { id: 1, name:'data1', company:'Vitta'},
        { id: 2, name:'data2', company:'Katu'},
        { id: 3, name:'data3', company:'HCOR'},
        { id: 4, name:'data4', company:'Einsten'},
        { id: 5, name:'data5', company:'Instituto'},
      ],
      order: 'desc',
      orderColumn: 'company',
    };
  },
  methods: {
    getOrder(val) {
      this.orderColumn = val.split('-').pop();
      this.order = this.order === 'desc' ? 'asc': 'desc';
    },
    getSelectedAll(val) {
    },
    getSelectedItem(val) {
    }
  }
};
</script>
```
</docs>

