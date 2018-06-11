<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <vi-wrapper
    mini
    vertical
    justify-content="flex-start"
    tag="div"
    class="ViComponent ViInput"
    :style="{ width: componentWidth }"
    :value="false"
  >
    <vi-input-label v-bind="{ for: id, label, instruction }"/>
    <multiselect
      class="ViInput__Multiselect"
      :class="{
        'ViInput__Multiselect--multiple': multiple,
        'ViInput__Multiselect--hideOptionsOnFocus': !pill,
        'ViInput__Multiselect--checkbox': checkbox,
      }"
      @open="openEvent"
      @tag="tagEvent"
      @close="closeEvent"
      @input="inputEvent"
      @select="selectEvent"
      @remove="removeEvent"
      @search-change="searchEvent"
      v-bind="newProps"
      v-model="localValue"
    >
      <template slot="clear" slot-scope="{ search }">
        <slot name="clear" :search="search">
          <template v-if="checkbox">
            <div class="ViInput__CheckAll">
              <span
                class="multiselect__checkoption"
                :class=" {
                  'multiselect__checkoption--selected': isAllChecked,
                  'multiselect__checkoption--inderteminate': isSomeChecked,
                }"
                @keydown.enter.prevent="selectAll"
                @mousedown.prevent="selectAll"
              >
                <span
                  tabindex="1"
                  class="ViInput__MultiselectCheckbox"
                >{{ checkAllLabelComp }}</span>
                <span class="ViInput__Total">({{ totalValueLabel }})</span>
              </span>
            </div>
          </template>
        </slot>
      </template>
      <template slot="caret" slot-scope="{ toggle }">
        <slot name="caret" :toggle="toggle">
          <div @mousedown.prevent.stop="toggle" class="multiselect__select" />
        </slot>
      </template>
      <template slot="option" slot-scope="{ option }">
        <slot name="option" v-bind="{ option }">
          <template v-if="checkbox">
            <span class="ViInput__MultiselectCheckbox">{{ option }}</span>
          </template>
          <template v-else>
            {{ option }}
          </template>
        </slot>
      </template>

      <template slot="tag" slot-scope="{ option, search, remove }">
        <slot name="tag" v-bind="{ option, search, remove }">
          <template v-if="pill">
            <span class="multiselect__tag">
              <span>{{ getOptionLabel(option) }}</span>
              <i
                aria-hidden="true"
                tabindex="1"
                @keydown.enter.prevent="removeElement(option)"
                @mousedown.prevent="removeElement(option)"
                class="multiselect__tag-icon"
              />
            </span>
          </template>
          <template
            @close="closeEvent"
            v-else-if="getOptionLabel(value[0]) === getOptionLabel(option)
            && (!isOpen && searchable || !searchable)"
          >
            {{ totalValueLabel }}
          </template>
        </slot>
      </template>

      <template slot="singleLabel" slot-scope="scope">
        <slot name="singleLabel" slot-scope="scope">
          {{ scope.option }}
        </slot>
      </template>
      <template slot="beforeList">
        <slot name="beforeList" />
      </template>
      <template slot="afterList">
        <slot name="afterList" />
      </template>
      <template slot="limit" v-if="internalValue && internalValue.length > limit">
        <slot name="limit">
          <strong class="multiselect__strong" v-text="limitText(internalValue.length - limit)"/>
        </slot>
      </template>
      <template slot="noResult">
        <slot name="noResult">Nenhum resultado disponivel</slot>
      </template>
      <template slot="maxElements" v-if="multiple && max === internalValue.length">
        <slot name="maxElements">
          Maximo de {{ max }} opções selecionadas.
          Remova uma opção selecionada para escolher outra opção.
        </slot>
      </template>
      <template slot="placeholder">
        <slot name="placeholder">
          {{ placeholder }}
        </slot>
      </template>
    </multiselect>

  </vi-wrapper>
</template>


<script>
import Multiselect from 'vue-multiselect';
import ViWrapper from './Wrapper.vue';
import ViInputLabel from '../helperComponents/InputLabel.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import inputMixin from '../mixins/input';
/**
 * ###### Além das props descritas aqui, usamos a props e eventos do **Vue-Multiselect**.
 * <a target="_blank" href="https://vue-multiselect.js.org/#sub-props" class="ViComponent ViButton ViColor-success--background ViColor-success--hover">Documentação completa do Vue-Multiselect</a><br><br>
 */

export default {
  extends: Multiselect,
  name: 'ViSelect',
  components: {
    Multiselect,
    ViWrapper,
    ViInputLabel,
  },
  mixins: [scaleMixin, widthMixin, inputMixin],
  props: {
    /**
     * Subistitui label do Vue-Multisect
     */
    optionLabel: {
      type: String,
      default: null,
    },
    /**
     * Label do campo do Vi-Ui
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * Comportamento original do Vue-Multiselect. Que exibe os multiselect
     * como uma lista de botões pra remover selecionados.
     */
    pill: {
      type: Boolean,
      default: false,
    },
    /**
     * Exibe um checkbox ao lado do campo e força o valor de `multiple` para true
     */
    checkbox: {
      type: Boolean,
      default: false,
    },
    /**
     * Label da opção "Marcar tudo" quando `checkbox` igual true
     */
    checkAllLabel: {
      type: String,
      default: 'Marcar tudo',
    },
    /**
     * Label da opção "Marcar todas as opções da busca" quando `checkbox` igual true
     */
    checkSelectionLabel: {
      type: String,
      default: 'Marcar todas as opções da busca',
    },
    /**
     * Label da opção "Desmarcar tudo" quando `checkbox` igual true
     */
    uncheckAllLabel: {
      type: String,
      default: 'Desmarcar tudo',
    },
    /**
     * Label da opção "Desmarcar todas as opções da busca" quando `checkbox` igual true
     */
    uncheckSelectionLabel: {
      type: String,
      default: 'Desmarcar todas as opções da busca',
    },
    /**
     * Label dentro so select quando fechado, existem opçõe selecionadas e `pill` igual "false".
     * ##NUMBER## é subistituido pelo total de opções selecionadas.
     */
    selectClosedLabel: {
      type: String,
      default: '##NUMBER## opções selecionadas',
    },
    /**
     * String to show next to selected option
     */
    selectLabel: {
      type: String,
      default: '',
    },
    /**
     * String to show when pointing to an already selected option
     */
    deselectLabel: {
      type: String,
      default: 'Selecionado',
    },
    /**
     * String to show next to selected option
     */
    selectedLabel: {
      type: String,
      default: 'Selecionado',
    },
    /**
     * Placeholder do campo
     */
    placeholder: {
      type: String,
      default: 'Selecione uma opção',
    },
  },
  data() {
    return {
      localValue: null,
      searchValue: '',
      isOpen: false,
    };
  },
  watch: {
    value() {
      this.localValue = this.value;
    }
  },
  computed: {
    totalValueLabel() {
      return this.selectClosedLabel.replace('##NUMBER##', this.totalValue);
    },
    newProps() {
      const props = Object.assign({}, this.$props);
      delete props.label;
      if (this.optionLabel !== null) props.label = this.optionLabel;
      if (this.placeholder === null) delete props.placeholder;
      if (this.checkbox) {
        props.selectedLabel = '';
        props.deselectLabel = '';
        props.clearOnSelect = false;
        props.multiple = true;
      }
      return props;
    },
    isAllChecked() {
      if (!this.localValue) return false;
      return this.filteredOptions
        .every(option => this.localValue.indexOf(option) > -1);
    },
    isSomeChecked() {
      if (!this.localValue) return false;
      if (this.isAllChecked) return false;
      return this.filteredOptions
        .some(option => this.localValue.indexOf(option) > -1);
    },
    checkAllLabelComp() {
      if (this.searchValue) {
        return this.isAllChecked
          ? this.uncheckSelectionLabel
          : this.checkSelectionLabel;
      }
      return this.isAllChecked
        ? this.uncheckAllLabel
        : this.checkAllLabel;
    },
    totalValue() {
      if (!this.localValue) return 0;
      return this.localValue.length;
    },
    filteredOptions() {
      if (!this.searchValue) return this.options;
      const pattern = new RegExp(this.searchValue);
      return this.options
        .filter(option => pattern.test(this.customLabel(option, this.optionLabel)));
    },
  },
  methods: {
    selectAll() {
      const value = this.localValue || [];
      if (this.isAllChecked) {
        this.localValue = value
          .filter(option => !(this.filteredOptions.indexOf(option) > -1));
        this.$emit('input', this.localValue);
      } else {
        const mergedValues = [...value, ...this.filteredOptions];
        this.localValue = mergedValues
          .filter((option, index) => mergedValues.indexOf(option) === index);
        this.$emit('input', this.localValue);
      }
    },
    getOptionLabel(option) {
      if (!option) return '';
      if (option.isTag) return option.label;
      if (option.$isLabel) return option.$groupLabel;

      const label = this.customLabel(option, this.optionLabel);
      if (!label) return '';
      return label;
    },
    inputEvent(value, id) {
      this.localValue = value;
      this.$emit('input', value, id);
    },
    selectEvent(value, id) {
      this.localValue = value;
      this.$emit('select', value, id);
    },
    removeEvent(value, id) {
      this.$emit('remove', value, id);
    },
    tagEvent(value, id) {
      this.$emit('tag', value, id);
    },
    searchEvent(value, id) {
      this.searchValue = value;
      this.$emit('serch-change', value, id);
    },
    closeEvent(value, id) {
      this.isOpen = false;
      this.$emit('close', value, id);
    },
    openEvent(id) {
      this.isOpen = true;
      this.$emit('open', id);
    },
  },
};
</script>

<style lang="stylus">
/* eslint-disable vue/max-attributes-per-line */
@import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
@import '../themes/main'
@import '../themes/input'

.ViComponent.ViInput
  .ViInput__Multiselect

    &.multiselect--active
      &:not(.multiselect--above)
        .multiselect__tags
          border-bottom-left-radius 0
          border-bottom-right-radius 0
          border-bottom-color rgba($border-color-main, 0.5)
      &.multiselect--above
        .multiselect__tags
          border-top-left-radius 0
          border-top-right-radius 0
          border-top-color rgba($border-color-main, 0.5)

    &--multiple
      .multiselect__tags
        &-wrap
          float:left

        .multiselect__tag
          background $primary
          border-radius 30px

          &-icon
            border-radius 30px
            &:after
              color rgba($text-color-main, 0.5)

            &:focus
            &:hover
              background darken($primary, 30%)

              &:after
                color: $light

    .multiselect__input
      padding-left 0

    .multiselect__tags
      border 1px solid $border-color-main
      border-radius $border-radius
      min-height 40px
      padding 0.7em 1em 0
      outline none

      .multiselect__single
        font-size unset

    .multiselect__select
      z-index 3

    .multiselect__content-wrapper
      border-color $border-color-main
      box-sizing content-box
      width calc(100% - 2px)
      overflow hidden
      z-index 1

      .multiselect__content
        box-sizing border-box
        display block!important
        max-height inherit
        height 100%
        overflow auto

    .multiselect__checkoption
      display block
      padding 12px
      min-height 40px
      line-height 16px
      text-decoration none
      text-transform none
      vertical-align middle
      position relative
      cursor pointer
      white-space nowrap

    .multiselect__checkoption
    .multiselect__option
      border-bottom 1px solid rgba($border-color-main, 0.5)

      &:after
        font-weight 700
        color rgba($text-color-main, 0.4)

      .ViInput__MultiselectCheckbox
        position relative
        padding 0 0 0 2.2em
        z-index 0

        &:after
        &:before
          background lighten($default, 50%)
          border-radius 0.3em
          content ''
          height 1.5em
          left 0
          position absolute
          top -2px
          width 1.5em
          transition all 0.06s ease-out
          transition transform 0.1s ease-out

        &:after
          background transparent
          border 0.27em solid $primary
          border-right-width 0.5em
          border-left 0
          border-top 0
          border-radius 0
          opacity 0
          transform rotate(90deg) scale(0.4, 0.3) translate(-0.5em)

      &--selected
        background none
        .ViInput__MultiselectCheckbox
          &:before
            background $primary
          &:after
            border-color $light
            opacity 1
            transform rotate(40deg) scale(0.3, 0.6) translate(-0.2em, -0.15em)

      &--inderteminate
        .ViInput__MultiselectCheckbox
          &:after
            border-bottom-width 0
            opacity 1
            transform rotate(90deg) scale(0.4, 0.3) translate(-0.5em)

      &--highlight
      &:focus:not(.multiselect__checkoption)
      &:hover:not(.multiselect__checkoption)
        color $border-color-main-focus
        background transparent
        box-shadow inset 0 1px 0 $border-color-main-focus
        border-color $border-color-main-focus
        color $border-color-main-focus

        &:after
          background inherit
          color rgba($text-color-main, 0.4)

        &.multiselect__option--selected
          box-shadow inset 0 1px 0 $success
          border-color $success
          color $success

    .ViInput__CheckAll
      position relative
      z-index 2

      .multiselect__checkoption
        border 1px solid $border-color-main
        border-bottom-color rgba($border-color-main, 0.5)
        border-top none
        display flex
        font-weight 300
        height 0
        justify-content space-between
        left 0
        position absolute
        top 40px
        width 100%
        opacity 0
        overflow hidden
        transition all 0.06s ease-out
        background $light

      .ViInput__Total
        font-size 80%

    &.multiselect--active
      .ViInput__CheckAll
        .multiselect__checkoption
          height 40px
          opacity 1

    &.multiselect--above
      .ViInput__CheckAll
        .multiselect__checkoption
          top -39px

    &--checkbox
      .multiselect__single
        display none

      .multiselect__content-wrapper
        padding 40px 0 0

      &.multiselect--above
        .multiselect__content-wrapper
          padding 0 0 40px
</style>


<docs>
Input básico:
```vue
<template>
  <div class="ViComponent">
    <vi-select
      checkbox
      label="Relationship Status"
      v-model="value"
      :options="relationshipStatusOptions"
      :close-on-select="false"
    >
    </vi-select>
    <pre><code>{{ dataForm }}</code></pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: null,
    };
  },
  computed: {
    relationshipStatusOptions() {
      return [
        'single',
        'in a relationship',
        'engaged',
        'married',
        'its complicated',
        'in an open relationship',
        'widowed',
        'separated',
        'divorced',
      ];
    },
    dataForm() {
      return JSON.stringify(this._data, null, 2);
    },
  },
};
</script>
```

</docs>
