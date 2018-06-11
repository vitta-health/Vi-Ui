<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <vi-wrapper
    mini
    vertical
    justify-content="flex-start"
    tag="div"
    class="ViComponent ViInput"
    :style="{ width: componentWidth }"
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
      v-bind="$props"
      v-model="localValue"
      :multiple="multiple||checkbox"
      :label="optionLabel"
    >

      <template slot="clear" slot-scope="{ search }">
        <slot name="clear" :search="search">
          <template v-if="checkbox">
            <div class="ViInput__CheckAll">
              <span
                class="multiselect__option"
                :class=" {
                  'multiselect__option--selected  ': isAllChecked,
                }"
              >
                <span
                  tabindex="1"
                  class="ViInput__MultiselectCheckbox"
                  @keydown.enter.prevent="selectAll(options, localValue)"
                  @mousedown.prevent="selectAll(options, localValue)"
                >{{ checkAllLabelComp }}</span>
              </span>
              <span class="ViInput__Total">({{ totalValue }})</span>
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
          <template v-if="checkbox"/>
        </slot>
      </template>

      <template slot="singleLabel" slot-scope="scope">
        <slot name="singleLabel" slot-scope="scope">
          {{ scope.option }}
        </slot>
      </template>
      <template slot="beforeList">
        <slot name="beforeList">
          <template v-if="searchable && checkbox">
            <li class="ViInput__Search">
              <span class="multiselect__option" />
            </li>
          </template>
        </slot>
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
      <template slot="placeholder" v-if="!checkbox">
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
     * Prop do Vue-Multisect.
     */
    showLabels: {
      type: Boolean,
      default: false,
    },
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
     * Select show the pill list
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
     * Label da opção "Desmarcar tudo" quando `checkbox` igual true e todas as p
     */
    uncheckAllLabel: {
      type: String,
      default: 'Desmarcar tudo',
    },
  },
  data() {
    return {
      localValue: null,
    };
  },
  watch: {
    value() {
      this.localValue = this.value;
    }
  },
  computed: {
    isAllChecked() {
      return this.options === this.localValue;
    },
    checkAllLabelComp() {
      return this.isAllChecked
        ? this.uncheckAllLabel
        : this.checkAllLabel;
    },
    totalValue() {
      if (!this.value) return 0;
      return this.value.length;
    },
  },
  methods: {
    equalFirstValue(option) {
      if (!this.value) return false;
      return option === this.value[0];
    },
    selectedlLabel(option) {
      const lastOptionIndex = this.value.length - 1;
      const lastOption = this.getOptionLabel(this.value[lastOptionIndex]);
      const isLastOption = option === lastOption;
      return `${option}${isLastOption ? '' : ','}`;
    },
    selectAll(options, option) {
      if (options === option) {
        this.removeElement(option);
      } else {
        this.$emit('input', options);
      }
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
      this.$emit('serch-change', value, id);
    },
    closeEvent(value, id) {
      this.$emit('close', value, id);
    },
    openEvent(id) {
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
      &.ViInput__Multiselect--hideOptionsOnFocus
        .multiselect__tags-wrap
          display none
      .multiselect__tags
        border-bottom-left-radius 0
        border-bottom-right-radius 0
        border-bottom-color rgba($border-color-main, 0.2)

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
              color rgba($text-color-main, 0.2)

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
      z-index 1

    .multiselect__option
      border-bottom 1px solid rgba($border-color-main, 0.2)

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

      &--highlight
        border-bottom 1px solid rgba($border-color-main, 0.2)
        background rgba($border-color-main, 0.05)
        color $text-color-main

        &.multiselect__option--selected
          &:focus
          &:hover
            color $success

    .ViInput__CheckAll
      position absolute
      display flex
      height 40px
      justify-content space-between
      padding 0 35px 0 0
      width 100%
      z-index 2

      .multiselect__option
        border-bottom 0
        font-weight 300

      .ViInput__Total
        font-size 80%
        padding 12px 0 0
        text-height 16px

    &--checkbox
      .multiselect__single
        display none

      .multiselect__input
        height 0
        left 1px
        opacity 0
        position absolute
        top 0
        transition opacity 0.1s linear
        z-index 2
        border-bottom 1px solid rgba($border-color-main, 0.2)

      &.multiselect--active
        .multiselect__input
          height 40px
          opacity 1
          padding 0 1em
          top 40px
          width calc(100% - 2px)!important

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
