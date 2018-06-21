<template>
  <vi-wrapper
    mini-spacing
    justify-content="flex-start"
    class="ViComponent ViCheckbox"
    :style="{ width: componentWidth }"
  >
    <input
      ref="input"
      @valid="validate($event.target)"
      @invalid="validate($event.target)"
      @input="inputChange($event.target)"
      @change="inputChange($event.target)"
      class="ViCheckbox__Input"
      :class="{
        'ViCheckbox__Input--validated': validated || forceValidation,
        'ViCheckbox__Input--invalid': invalid,
        'ViCheckbox__Input--radio': radio,
        'ViCheckbox__Input--checkbox': !radio,
      }"
      v-bind="{
        autofocus: autoFocus,
        checked: isChecked,
        disabled,
        id,
        name: name || id,
        required,
        readOnly,
        type: radio ? 'radio' : 'checkbox',
        value,
        indeterminate: !isChecked && indeterminate,
      }"
    >
    <vi-input-label v-bind="{ for: id, label: label||'', instruction }"/>
  </vi-wrapper>
</template>


<script>
import ViWrapper from './Wrapper.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import ViInputLabel from '../helperComponents/InputLabel.vue';
import inputMixin from '../mixins/input';

export default {
  name: 'ViCheckbox',
  components: {
    ViWrapper,
    ViInputLabel,
  },
  mixins: [scaleMixin, widthMixin, inputMixin],
  props: {
    /**
     * Define tipo para radio button
     */
    radio: {
      type: Boolean,
      default: false,
    },
    /**
     * Define se o input está selecionado.
     * (Se `v-model` for um valor booleano, não é necessário usar)
     */
    checked: {
      type: Boolean,
      default: false,
    },
    /**
     * Se for `true`, define o input com estado indeterminado (seleção parcial). [Documentação sobre](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes)
     */
    indeterminate: {
      type: Boolean,
      default: false,
    },
    /**
     * Valor do campo
     * @model
     */
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
  },
  methods: {
    inputChange(target) {
      this.validated = false;
      this.invalid = false;
      const value = typeof this.value === 'boolean'
        ? target.checked
        : target.value;

      /**
       * Evento de retorno de dados
       *
       * @event input
       * @type {string|number|boolean}
       *
       */
      this.$emit('input', value);
    },
  },
  computed: {
    isChecked() {
      return this.checked || this.value === true;
    },
  },
};
</script>

<style lang="stylus">
@import '../themes/main'

.ViComponent.ViCheckbox
  &.flexWrapper
    align-items center

  .contentWrapper.ViCheckbox__Input
    outline none
    opacity 0
    margin-left 0.5em
    position relative
    transform scale(2)
    z-index 1
    cursor pointer

    & + label
      min-height 18px
      position relative
      padding 0 0 0 1em
      z-index 0
      &:after
      &:before
        background $default
        border-radius 0.3em
        content ''
        height 1.5em
        left -1.5em
        position absolute
        top -0.2em
        width 1.5em
        transition all 0.06s ease-out
        transition transform 0.1s ease-out

    &.ViCheckbox__Input--invalid + label:before
    &.ViCheckbox__Input--validated:invalid + label:before
      box-shadow 0px 0px 0px 1px rgba($danger, 1)

    &:focus
      & + label:before
        box-shadow 0 0 0 0.25em rgba($border-color-main-focus, 0.4),
        0 0 0 0.1em rgba($border-color-main-focus, 0.5)

    &.ViCheckbox__Input--checkbox
      & + label:after
        background transparent
        border 0.27em solid $primary
        border-right-width 0.5em
        border-bottom-width 0
        border-left 0
        border-top 0
        border-radius 0
        opacity 0
        transform rotate(90deg) scale(0.4, 0.3) translate(-0.5em)

      &[checked]
      &:checked
        & + label:before
          background $primary
        & + label:after
          border-color $light
          border-bottom-width 0.27em
          opacity 1
          transform rotate(40deg) scale(0.3, 0.6) translate(-0.2em, -0.15em)
        &:focus
          & + label:before
            box-shadow 0 0 0 0.25em rgba($border-color-main-focus, 0.4)

      &[indeterminate]
      &:indeterminate
        & + label:after
          opacity 1!important

    &.ViCheckbox__Input--radio
      & + label
        &:after
          display none
        &:before
          background $primary
          border 0.75em solid lighten($default, 50%)
          border-radius 1.5em

      &[checked]
      &:checked
        & + label:before
          border-width 0.35em
</style>

<docs>
### Exemplo checkbox

```vue
<template>
  <vi-wrapper
    vertical
    class="ViComponent"
  >
    <vi-checkbox label="Exemplo de Checkbox" v-model="isChecked" />
    <hr />
    <vi-checkbox
      radio
      label="Is checkbox checked?"
      :checked="isChecked"
      @input="isChecked = true" />
    <vi-checkbox
      radio
      label="Is checkbox NOT checked?"
      :checked="!isChecked"
      @input="isChecked = false" />
    <pre><code>{{ dataForm }}</code></pre>
  </vi-wrapper>
</template>
<script>
export default {
  data() {
    return {
      isChecked: true,
    };
  },
  computed: {
    dataForm() {
      return JSON.stringify(this._data, null, 2);
    },
  },
};
</script>
```

### Checkbox "indeterminate"

```jsx
<vi-checkbox indeterminate label="Indeterminado" />
```


</docs>
