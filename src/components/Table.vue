<template>
  <table
    class="ViComponent ViTable"
    :class="[
      {
        'ViTable--horizontal-bordered': horizontalBordered,
        'ViTable--vertical-bordered': verticalBordered,
        'ViTable--striped-rows': striped,
      },
    ]"
  >
    <thead>
      <tr class="ViTable__Row">
        <th v-if="checkbox" class="ViTable__Col ViTable__Checkbox">
          <div class="ViTable__CheckboxWrapper">
            <input ref="checkboxAllSelected" type="checkbox" class="ViTable__InputCheckbox" @click="selectAll" />
            <span class="ViTable__FakeCheckbox ViTable__FakeCheckbox--inverted" />
          </div>
        </th>
        <th
          v-for="(column, index) in columns"
          :key="index"
          @click="column.sortable ? onSort(column.id) : null"
          class="ViTable__Col"
          :class="[{ 'ViTable__Col--sortable': column.sortable }]"
        >
          <div class="ViTable__InnerHead">
            <div>{{ column.label }}</div>
            <div class="ViTable__Arrows">
              <div
                ref="arrowUp"
                v-if="column.sortable"
                class="ViTable__ArrowUp"
                :class="{ 'ViTable__Arrows--active': verifySort(column.id, 'asc') }"
              />
              <div
                ref="arrowDown"
                v-if="column.sortable"
                class="ViTable__ArrowDown"
                :class="{ 'ViTable__Arrows--active': verifySort(column.id, 'desc') }"
              />
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tfoot v-if="'tfoot' in this.$slots">
      <tr>
        <td v-if="checkbox" />
        <slot name="tfoot" />
      </tr>
    </tfoot>
    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="index"
        class="ViTable__Row ViTable--hover"
        :class="[{ 'ViTable__Row--selected': item.selected }]"
      >
        <td v-if="checkbox">
          <div class="ViTable__CheckboxWrapper">
            <input
              ref="selectedCheckbox"
              @click="select(index, item)"
              type="checkbox"
              class="ViTable__InputCheckbox"
              :checked="item.selected"
            />
            <span class="ViTable__FakeCheckbox" />
          </div>
        </td>
        <slot :item="item">
          <td v-for="(column, index) in columns" :key="index">
            <slot :name="`column-${column.id}`" v-bind:item="item">
              {{ item[column.id] }}
            </slot>
          </td>
        </slot>
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
     * id:string será enviado ao evento @sort para ordenação
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
  },
  methods: {
    /**
     * Evento disparado ao clicar em um cabeçalho da tabela para ordenação.
     * @event sort
     * @type {string}
     * @returns {object} retorna um objeto com os dados de ordenação
     */
    onSort(value) {
      const orderBy = {
        sortedColumn: value,
        sortedDirection: 'asc',
      };
      orderBy.sortedDirection = this.sortedColumn === value && this.sortedDirection === 'asc' ? 'desc' : 'asc';
      this.$emit('sort', orderBy);
    },
    /**
     * Evento disparado ao selecionar todos os registros da tabela.
     * @event selectAll
     * @type {object}
     * @returns {object} objeto contendo todos os registros selecionados
     */
    selectAll(input) {
      const iterated = {
        lines: this.items,
        selected: input.currentTarget.checked,
      };
      this.$emit('select-all', iterated);
    },
    /**
     * Evento disparado ao selecionar um registro.
     *
     * @event select
     * @type {object}
     * @returns {object} retorna um objeto contendo os dados do registro selecionado
     */
    select(field, data) {
      const iterated = {
        lines: data,
        selected: this.$refs.selectedCheckbox[field].checked,
      };
      this.$emit('select', iterated);
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
        }
        if (selectedItems === this.items.length) {
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
@import '../themes/main'

.ViComponent.ViTable
  border-collapse collapse
  border-spacing 0
  text-align left
  width 100%

  &--vertical-bordered
    border-bottom 1px solid $border-color-main
    border-top 1px solid $border-color-main

  &--horizontal-bordered
    td, th
      border-bottom 1px solid $border-color-main
      border-top 1px solid $border-color-main

  &--vertical-bordered
    td, th
      border-left 1px solid $border-color-main
      border-right 1px solid $border-color-main

  &--striped-rows
    tr:nth-child(even)
      td
        background-color rgba(0, 0, 0, 0.03)

  thead
    th
      background-color $dark
      border-color $dark
      color $light
      font-family $Montserrat
      font-weight 500
      height 38px
      letter-spacing -0.01em

      &.ViTable__Col--sortable
        cursor pointer

        &:hover
          background-color darken($dark, 10%)

  td, th
    padding 1em
    text-align left

    &[center]
      text-align center

    &[right]
      text-align right

  .ViTable__Checkbox
    width 1%

  .ViTable__ArrowDown, .ViTable__ArrowUp
    border-bottom 5px solid rgba($light, 0.2)
    border-left 5px solid transparent
    border-right 5px solid transparent
    height 0
    margin 3px 2px 0 5px
    width 0

    &.ViTable__Arrows--active
      border-bottom 5px solid $light

  .ViTable__ArrowDown
    transform rotate(180deg)
    will-change transform

  .ViTable__Arrows
    float right
    margin-left 5px

  .ViTable__InnerHead
    display flex
    justify-content space-between

  .ViTable__Row
    background-color rgba(255, 255, 255, 0.5)
    height 38px

  .ViTable__Row--selected
    font-weight 700

  .ViTable--hover
    &:hover
      background-color rgba($border-color-main, 0.4) !important

  .ViTable__CheckboxWrapper
    position relative
    z-index 0

  .ViTable__InputCheckbox
    cursor pointer
    margin-left 0.5em
    opacity 0
    outline none
    position relative
    transform scale(2)
    will-change transform
    z-index 1

    & + .ViTable__FakeCheckbox
      left 0
      position absolute
      top 0
      z-index 0

      &:after, &:before
        background $default
        border-radius 0.3em
        content ''
        height 1.5em
        left -0.1em
        position absolute
        top -0.2em
        transition all 0.04s ease-out
        width 1.5em

      &--inverted
        &:before
          background rgba($light, 0.1)

      &:after
        background transparent
        border 0.27em solid $primary
        border-bottom-width 0
        border-left 0
        border-radius 0
        border-right-width 0.5em
        border-top 0
        opacity 0
        transform rotate(90deg) scale(0.4, 0.3) translate(-0.5em)

      &--inverted
        &:after
          border-color $light

    &:focus
      & + .ViTable__FakeCheckbox
        &:before
          box-shadow 0 0 0 1px $border-color-main-focus
          will-change box-shadow

        &--inverted
          &:before
            box-shadow inset 0 0 0 1px $light
            will-change box-shadow

    &:checked
      &:focus
        & + .ViTable__FakeCheckbox
          &:before
            box-shadow 0 0 0 1px $border-color-main-focus
            will-change box-shadow

          &--inverted
            &:before
              box-shadow 0 0 0 1px $light
              will-change box-shadow

      & + .ViTable__FakeCheckbox
        &:before
          background $primary

        &--inverted
          &:before
            background $light

        &:after
          border-bottom-width 0.27em
          border-color $light
          opacity 1
          transform rotate(40deg) scale(0.3, 0.6) translate(-0.2em, -0.15em)
          transition all 0.04s ease-out, opacity 0.1s ease-out, transform 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28)
          will-change transform, opacity

        &--inverted
          &:after
            border-color $dark

    &:indeterminate
      & + .ViTable__FakeCheckbox
        &:after
          border-bottom-width 0
          opacity 1
          transition all 0.04s ease-out, opacity 0.1s ease-out, transform 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28)
          will-change transform, opacity
</style>

<docs>
### Tabela Básica

A forma mais simples de utilizar o ViTable é apenas definir as colunas e dados que devem ser exibidos:

> Dica: Para alinhar o conteúdo das células da coluna em uma direção,
> adicione [center|right] como uma propriedade na coluna.

```vue
<template>
  <vi-table :columns="columns" :items="data" />
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { id: 'id', label: 'ID' },
          { id: 'name', label: 'Name' },
          { id: 'email', label: 'E-mail' },
        ],
        data: [
          { id: 1, name: 'Amanda', email: 'amanda@vitta.com.br' },
          { id: 2, name: 'Beth', email: 'beth@vitta.com.br' },
          { id: 3, name: 'Cleusa', email: 'cleusa@vitta.com.br' },
          { id: 4, name: 'Darlene', email: 'darlene@vitta.com.br' },
          { id: 5, name: 'Eleonora', email: 'eleonora@vitta.com.br' },
        ],
      };
    },
  };
</script>
```

É possível personalizar a renderização de cada coluna utilizando um slot com o identificador da coluna.
Veja no exemplo abaixo como personalizar a renderização da coluna e-mail.

```vue
<template>
  <vi-table :columns="columns" :items="data">
    <template v-slot:column-email="{ item }" >
      <a :href="'mailto:' + item.email">{{ item.email }}</a>
    </template>
  </vi-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { id: 'id', label: 'ID' },
          { id: 'name', label: 'Name' },
          { id: 'email', label: 'E-mail' },
        ],
        data: [
          { id: 1, name: 'Amanda', email: 'amanda@vitta.com.br' },
          { id: 2, name: 'Beth', email: 'beth@vitta.com.br' },
          { id: 3, name: 'Cleusa', email: 'cleusa@vitta.com.br' },
          { id: 4, name: 'Darlene', email: 'darlene@vitta.com.br' },
          { id: 5, name: 'Eleonora', email: 'eleonora@vitta.com.br' },
        ],
      };
    },
  };
</script>
```

### Tabela Completa
Também é possível utilizar as demais funcionalidades do componente com um pouco mais de código, incluindo total controle da renderização de cada linha.

```vue
<template>
  <vi-table
    :sortedColumn="orderColumn"
    :sortedDirection="order"
    checkbox
    horizontalBordered
    @sort="order => getOrder(order)"
    @select-all="data => getSelectedAll(data)"
    @select="data => getSelectedItem(data)"
    :columns="cols"
    :items="data"
  >
    <template slot-scope="{ item }">
      <td center>{{ item.id }}</td>
      <td :style="{ color: 'green' }">{{ item.name }}</td>
      <td right>{{ item.company }}</td>
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
        { id: 'codCompany', label: 'ID', sortable: true },
        { id: 'name', label: 'Name', sortable: false },
        { id: 'company', label: 'Company', sortable: true },
      ],
      data: [
        { id: 1, name: 'name1', company: 'company1', selected: false },
        { id: 2, name: 'name2', company: 'company2', selected: true },
        { id: 3, name: 'name3', company: 'company3', selected: true },
        { id: 4, name: 'name4', company: 'company4', selected: true },
        { id: 5, name: 'name5', company: 'company5', selected: true },
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
      const lines = this.data.map(row => {
        row.selected = val.selected;
        return row;
      });
      this.data = lines;
    },
    getSelectedItem(val) {
      const line = this.data.map(row => {
        if (row.id === val.lines.id) {
          row.selected = val.selected;
          return row;
        }
        return row;
      });
      this.data = line;
    },
  },
};
</script>
```
</docs>
