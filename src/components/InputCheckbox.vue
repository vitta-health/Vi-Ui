<template>
  <vi-wrapper
    mini
    justify-content="flex-start"
    tag="div"
    class="ViComponent ViInputCheckbox"
    :style="{ width: componentWidth }"
  >

    <input
      ref="input"
      @valid="validate($event.target)"
      @invalid="validate($event.target)"
      @input="inputChange($event.target)"
      @change="inputChange($event.target)"
      class="ViInputCheckbox__Input"
      :class="{
        'ViInputCheckbox__Input--validated': validated || forceValidation,
        'ViInputCheckbox__Input--invalid': invalid,
      }"
      v-bind="{
        autofocus: autoFocus,
        checked: checked || isChecked,
        disabled,
        id: fieldID,
        name: name || fieldID,
        required,
        readOnly,
        type: radio ? 'radio' : 'checkbox',
        value,
      }"
    >
    <label
      :for="fieldID"
      class="ViInputCheckbox__Label"
    >{{ label }}
      <small
        v-if="instruction"
        class="ViInputCheckbox__Instruction"
      >{{ instruction }}</small>
    </label>
  </vi-wrapper>
</template>


<script>
/* eslint-disable max-len */
import ViWrapper from './Wrapper.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import extrasMixin from '../mixins/extras';

export default {
  name: 'ViInputCheckbox',
  components: {
    ViWrapper,
  },
  mixins: [scaleMixin, widthMixin, extrasMixin],
  props: {
    /**
     * Tipo checkbox ou radio button
     */
    radio: {
      type: Boolean,
      default: false,
    },
    /**
     * Label do campo
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * Label extra ex: "(obrigatório)"
     */
    instruction: {
      type: String,
      default: null,
    },
    /**
     * Valor do campo
     * @model
     */
    value: {
      type: [String, Number, Boolean, Object, Array],
      default: null,
    },
    /**
     * Lista de opções usado para (Radio e Checkbox)
     */
    options: {
      type: Array,
      default: null,
    },
    /**
     * Usado para comparar quando options é um array de objetos
     */
    trackBy: {
      type: String,
      default: null,
    },
    /**
     * Checkbox ou radiobutton marcados?
     */
    checked: {
      type: Boolean,
      default: false,
    },
    /**
     * Identificador do campo. Caso não definido, será um valor gerado automaticamente.
     */
    fieldID: {
      type: String,
      default: () => {
        const crypto = window.crypto.getRandomValues(new Uint8Array(6));
        const uId = Object.keys(crypto)
          .map(key => crypto[key].toString(16))
          .join('');

        return `ViInputCheckbox__Field${uId}`;
      },
    },
    /**
     * Define se o elemento recebe o foco ao entrar a página
     */
    autoFocus: {
      type: Boolean,
      default: false,
    },
    /**
     * Input apenas leitura
     */
    readOnly: {
      type: Boolean,
      default: false,
    },
    /**
     * Input desabilitado
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * _Validação:_ Obrigatório
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * _Validação:_ Mensagens de erro personalizada. [Opções de validação](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#dom-cva-validity).
     * Quando null usa a mensagem padrão na língua definida do browser
     */
    customErrorMsg: {
      type: Object,
      default: null,
    },
    /**
     * _Validação:_ Validação em tempo real durante interação com o input
     * Padão
     */
    forceValidation: {
      type: Boolean,
      default: false,
    },
    /**
    * Nome do campo (usa o mesmo que fieldID se não definido)
    */
    name: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      validated: false,
      invalid: false,
    };
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
       * @type {string|number|object|array|boolean}
       *
       */
      this.$emit('input', value);
    },
    validate(target) {
      this.validated = true;
      this.invalid = !target.validity.valid;
      if (this.customErrorMsg) {
        let customMsg = '';
        const hasMessage = Object.keys(this.customErrorMsg).some((key) => {
          if (target.validity[key]) {
            customMsg = this.customErrorMsg[key];
          }
          return target.validity[key];
        });

        if (hasMessage) {
          target.setCustomValidity(customMsg);
        } else {
          target.setCustomValidity('');
        }
      }

      /**
       * Evento de validação
       *
       * @event invalid
       * @type {boolean}
       */
      this.$emit('invalid', this.invalid);
    },
  },
  computed: {
    isChecked() {
      return typeof this.value === 'boolean' && this.value;
    },
  },
};
</script>

<style lang="stylus">
  @import '../themes/main';

.ViCompenent .ViInputCheckbox
.ViInputCheckbox
  &.flexWraper:not(.flexWraper--vertical)
    align-items center

    .contentWrapper.ViInputCheckbox__Input
    .ViInputCheckbox__Input
      outline none
      opacity 0
      margin-left 0.5em
      position relative
      transform scale(2)
      z-index 1
      cursor pointer

      & + label
        position relative
        padding 0 0 0 1em
        z-index 0
        &:after
        &:before
          background lighten($default, 50%)
          border-radius 0.3em
          content ''
          height 1.5em
          left -1.5em
          position absolute
          top -0.2em
          width 1.5em
          transition all 0.06s ease-out

      &.ViInput__Input--invalid + label:before
      &.ViInput__Input--validated:invalid + label:before
        box-shadow 0px 0px 0px 1px rgba($error-color, 1)

      &:focus
        & + label:before
          box-shadow 0 0 10px rgba($primary, 0.2)

      &[type="checkbox"]
        & + label:after
            background transparent
            border 0.27em solid $primary
            border-right-width 0.5em
            border-left 0
            border-top 0
            border-radius 0
            opacity 0
            transform rotate(40deg) scale(0) translate(-0.3em, -0.15em)

        &:checked
          & + label:after
            opacity 1
            transform rotate(40deg) scale(0.4, 0.7) translate(-0.3em, -0.15em)

      &[type="radio"]
        & + label
          &:after
            display none
          &:before
            background $primary
            border 0.75em solid lighten($default, 50%)
            border-radius 1.5em

        &:checked
          & + label:before
            border-width 0.35em
            box-shadow inset 0 -0.4em 0.35em rgba(0, 0, 0, 0.1)
</style>

<docs>
Exemplo checkbox:

```vue
<template>
  <vi-wrapper vertical class="ViComponent">
    <vi-input-checkbox label="Exemplo de Checkbox" v-model="isChecked" />
    <vi-input-checkbox
      radio
      label="Is checkbox checked?"
      :checked="isChecked"
      @input="isChecked = true" />
    <vi-input-checkbox
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
      return JSON.stringify({ isChecked: this.isChecked }, null, 2);
    },
  },
};
</script>
```

</docs>
