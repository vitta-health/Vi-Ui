<template>
  <table
    class="ViComponent ViTable"
    :class="[{
      'ViTable--HorizontalBordered': horizontalBordered,
      'ViTable--VerticalBordered': verticalBordered,
      'ViTable--StripedRows': striped }]">
    <thead>
      <tr class="ViTable__Row">
        <th
          v-if="checkbox"
          class="ViTable--NoSortable ViTable__Checkbox">
          <input
            ref="checkboxAllSelected"
            type="checkbox"
            @click="onSelectAll">
        </th>
        <th
          v-for="(column, index) in columns"
          :key="index"
          @click="column.sortable ? onSort(column.id) : null"
          :class="[{'ViTable--NoSortable': !column.sortable}]">
          <div class="ViTable__Collumns">
            {{ column.label }}
            <div class="ViTable__Arrows">
              <div
                ref="arrowUp"
                v-if="column.sortable"
                class="ViTable__ArrowUp"
                :class="{ 'ViTable__Arrows--Active':
                verifySort(column.id, 'asc')}"/>
              <div
                ref="arrowDown"
                v-if="column.sortable"
                class="ViTable__ArrowDown"
                :class="{ 'ViTable__Arrows--Active':
                verifySort(column.id, 'desc')}"/>
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tfoot v-if="tFoot">
      <tr>
        <td v-if="checkbox"/>
        <slot name="tfoot"/>
      </tr>
    </tfoot>
    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="index"
        class="ViTable__Row ViTable--Hover"
        :class="[{'ViTable__Row--Selected': item.selected}]">
        <td
          v-if="checkbox">
          <input
            ref="selectedCheckbox"
            @click="onSelect(index, item)"
            type="checkbox"
            :checked="item.selected">
        </td>
        <slot :item="item"/>
      </tr>
    </tbody>
  </table>
</template>

<script>
const availableOrders = {
  desc: 'desc',
  asc: 'asc',
};

export default {
  name: 'ViTable',
  props: {
    /**
     * Array de objetos contendo os dados do cabeçalho da tabela.
     * id:string será enviado ao evento @on-sort para ordenação
     * label:string texto apresentado na coluna
     * sortable:boolean define se a coluna poderá ser ordenada
     */
    columns: {
      type: Array,
      default: () => [],
    },
    /**
     * Array de objetos contendo os dados das linhas na tabela, caso esteja com checkbox
     * habilitado, usar o atributo selected `boolean` para definir seu estado.
     */
    items: {
      type: Array,
      default: () => [],
    },
    /**
     * Indica o ID da coluna pela qual os dados estão ordenados.
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
     * Habilita bordas verticais
     */
    verticalBordered: {
      type: Boolean,
      default: false,
    },
    /**
     * Habilita bordas horizontais
     */
    horizontalBordered: {
      type: Boolean,
      default: false,
    },
    /**
     * Habilita os checkbox para seleção de linhas
     */
    checkbox: {
      type: Boolean,
      default: false,
    },
    /**
     * Habilita o tfoot
     */
    tFoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * Evento disparado ao clicar em um cabeçalho da tabela para ordenação.
     * @event onSort
     * @type {string}
     * @returns {object} retorna um objeto com os dados de ordenação
     */
    onSort(value) {
      const orderBy = {
        sortedColumn: value,
        sortedDirection: 'asc',
      };
      orderBy.sortedDirection = this.sortedColumn === value && this.sortedDirection === 'asc' ? 'desc' : 'asc';
      this.$emit('on-sort', orderBy);
    },
    /**
     * Evento disparado ao selecionar todos os registros da tabela.
     * @event onSelectAll
     * @type {object}
     * @returns {object} objeto contendo todos os registros selecionados
     */
    onSelectAll(input) {
      const iterated = {
        lines: null,
        selected: false,
      };
      iterated.lines = this.items;
      iterated.selected = input.currentTarget.checked;
      this.$emit('on-select-all', iterated);
    },
    /**
     * Evento disparado ao selecionar um registro.
     *
     * @event onSelect
     * @type {object}
     * @returns {object} retorna um objeto contendo os dados do registro selecionado
     */
    onSelect(field, data) {
      const iterated = {
        lines: null,
        selected: false,
      };
      iterated.selected = this.$refs.selectedCheckbox[field].checked;
      iterated.lines = data;
      this.$emit('on-select', iterated);
    },
    verifySort(key, order) {
      return this.sortedColumn === key && this.sortedDirection === order;
    },
    updateSelectAllCheckbox() {
      if (this.checkbox) {
        const selectedItems = this.items.filter(item => item.selected).length;
        if (selectedItems !== this.items.length && selectedItems !== 0) {
          this.$refs.checkboxAllSelected.indeterminate = selectedItems < this.items.length;
          return null;
        } else if (selectedItems === this.items.length) {
          this.$refs.checkboxAllSelected.checked = true;
          this.$refs.checkboxAllSelected.indeterminate = false;
          return null;
        }
        this.$refs.checkboxAllSelected.checked = false;
        this.$refs.checkboxAllSelected.indeterminate = false;
        return null;
      }
      return null;
    },
  },
  mounted() {
    this.updateSelectAllCheckbox();
  },
  watch: {
    items() {
      this.updateSelectAllCheckbox();
    },
  },
};
</script>

<style lang="stylus">
@import '../themes/main';

.ViComponent .ViTable
.ViTable
  border-spacing 0
  width 100%
  border-collapse collapse
  text-align left

  &--VerticalBordered
    border-bottom 1px solid #ddd
    border-top 1px solid #ddd

  &--HorizontalBordered
    td
    th
      border-bottom 1px solid #ddd
      border-top 1px solid #ddd

  &--VerticalBordered
    td
    th
      border-left 1px solid #ddd
      border-right 1px solid #ddd

  &--StripedRows
    tr:nth-child(even)
      td
        background-color rgba(0, 0, 0, 0.03)

  thead
    th
      height 38px
      background-color rgba(0, 0, 0, 0.1)

      &:hover
        cursor pointer
        background-color rgba(0, 0, 0, 0.05)

  &--NoSortable
    background-color rgba(0, 0, 0, 0.1) !important
    &:hover
      cursor default !important

  td
  th
    padding 1em
    text-align left
    &[center]
      text-align center
    &[right]
      text-align right

  .ViTable__Checkbox
    width 1%

  .ViTable__ArrowDown
  .ViTable__ArrowUp
    width 0
    height 0
    border-left 5px solid transparent
    border-right 5px solid transparent
    border-bottom 5px solid rgba(0, 0, 0, 0.2)
    margin 3px 2px 0px 5px

    &.ViTable__Arrows--Active
      border-bottom 5px solid black

  .ViTable__ArrowDown
    transform rotate(180deg)

  .ViTable__Arrows
    margin-left 5px
    float right

  .ViTable__Collumns
    display: flex

  .ViTable__Row
    height 38px

.ViTable__Row--Selected
  background-color rgba(#DDC880, 0.2) !important
.ViTable--Hover
  &:hover
    background-color rgba(#24AEE4,0.2) !important

</style>

<docs>
#### Basic Table:

> Para alinhar o conteúdo das colunas em uma direção, adicione [center|right] como uma
> propriedade na coluna.

```vue
<template>
  <vi-table
    :sortedColumn="orderColumn"
    :sortedDirection="order"
    striped
    checkbox
    horizontalBordered
    verticalBordered
    tFoot
    @on-sort="order => getOrder(order)"
    @on-select-all="data => getSelectedAll(data)"
    @on-select="data => getSelectedItem(data)"
    :columns="cols"
    :items="data">
    <template slot-scope="{ item }">
        <td center>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.company }}</td>
    </template>
    <template slot="tfoot">
        <td center>Sum</td>
        <td colspan="2">Sum2</td>
    </template>
  </vi-table>
</template>

<script>
export default {
  data() {
    return {
      cols: [
        { id:'codCompany', label:'ID', sortable: true },
        { id:'name', label:'Name', sortable: false },
        { id:'company', label:'Company', sortable: true },
      ],
      data: [
        { id: 1, name:'name1', company:'company1', selected: false},
        { id: 2, name:'name2', company:'company2', selected: true},
        { id: 3, name:'name3', company:'company3', selected: true},
        { id: 4, name:'name4', company:'company4', selected: true},
        { id: 5, name:'name5', company:'company5', selected: true},
      ],
      order: 'desc',
      orderColumn: 'company',
    };
  },
  methods: {
    getOrder(val) {
      this.data.reverse();
      this.order = val.sortedDirection;
      this.orderColumn = val.sortedColumn;
    },
    getSelectedAll(val) {
      const lines = this.data.map((row) => {
        row.selected = val.selected;
        return row;
      });
      this.data = lines;
    },
    getSelectedItem(val) {
      const line = this.data.map((row) => {
        if(row.id === val.lines.id) {
          row.selected = val.selected;
          return row;
        }
        return row;
      });
      this.data = line;
    },
  }
};

</script>
```
</docs>

