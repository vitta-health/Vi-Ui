<template>
  <vi-wrapper
    mini
    :vertical="isVertical"
    justify-content="flex-start"
    tag="div"
    class="ViComponent ViInput"
    :style="{ width: inputWidth }"
  >
    <template v-for="order in inputLabelOrder">
      <label
        :key="order"
        v-if="label && order === 0"
        :for="fieldID"
        class="ViInput__Label"
      >{{ label }}
        <small
          v-if="instruction"
          class="ViInput__Instruction"
        >{{ instruction }}</small>
      </label>
      <component
        ref="input"
        v-if="order === 1"
        @valid="validate($event.target)"
        @invalid="validate($event.target)"
        @input="inputChange($event.target)"
        @change="inputChange($event.target)"
        class="ViInput__Input"
        :class="{
          'ViInput__Input--validated': validated || forceValidation,
          'ViInput__Input--invalid': invalid,
        }"
        v-bind="{
          autocomplete: autoCompleteHandler,
          autofocus: autoFocus,
          checked: checked || isChecked,
          disabled,
          hidden: type === 'file',
          id: fieldID,
          max,
          maxlength: maxLength,
          min,
          minlength: minLength,
          multiple,
          name: name || fieldID,
          pattern,
          placeholder,
          required,
          readOnly,
          rows,
          type: inputType,
          value,
        }"
        :is="fieldType"
        :key="order"
      />
    </template>
    <vi-button
      dark
      type="button"
      v-if="type === 'file'"
      @click="fileButtonTrigger"
    >{{ fileButton }}</vi-button>
  </vi-wrapper>
</template>


<script>
/* eslint-disable max-len */
import ViWrapper from './Wrapper.vue';
import ViButton from './Button.vue';
import sizeMixin from '../mixins/sizes';
import extrasMixin from '../mixins/extras';

export default {
  name: 'ViInput',
  components: {
    ViWrapper,
    ViButton,
  },
  mixins: [sizeMixin, extrasMixin],
  props: {
    /**
     * Tipo de campo
     */
    type: {
      type: String,
      default: 'text',
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
     * Placeholder do campo
     */
    placeholder: {
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
     * Lista de opções usado para (Select, Radio e Checkbox)
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
     * Auto-complete [opções de autocomplete](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute).
     * Obs: Chrome ignora a opção "off" (ou "false") e tenta decidir por conta propria
     */
    autoComplete: {
      type: String,
      default: 'on',
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

        return `ViInput__Field${uId}`;
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
     * width do input
     */
    width: {
      type: [String, Number],
      default: null,
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
     * _Validação:_ Número minimo no valor do campo
     */
    min: {
      type: [String, Number],
      default: null,
    },
    /**
     * _Validação:_ Número máximo no valor do campo
     */
    max: {
      type: [String, Number],
      default: null,
    },
    /**
     * _Validação:_ Máximo de caracteres no campo
     */
    maxLength: {
      type: [String, Number],
      default: null,
    },
    /**
     * _Validação:_ Mínimo de caracteres no campo
     */
    minLength: {
      type: [String, Number],
      default: null,
    },
    /**
     * _Validação:_ Valida contra uma expressão regular
     */
    pattern: {
      type: String,
      default: null,
    },
    /**
    * Numero de linha quando usando textarea
    */
    rows: {
      type: [String, Number],
      default: null,
    },
    /**
    * Nome do campo (usa o mesmo que fieldID se não definido)
    */
    name: {
      type: String,
      default: null,
    },
    /**
    * Multiplo
    */
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      validated: false,
      invalid: false,
      filesValue: null,
    };
  },
  methods: {
    inputChange(target) {
      this.validated = false;
      this.invalid = false;
      const value = this.valueHandler(target);

      /**
       * Evento de retorno de dados
       *
       * @event input
       * @type {string|number|object|array|boolean}
       *
       */
      this.$emit('input', value);
    },
    valueHandler(target) {
      switch (this.type) {
        case 'file':
          this.filesValue = this.fileButtonTextSetter(target);
          return target.files;
        default:
          return typeof this.value === 'boolean'
            ? target.checked
            : target.value;
      }
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
    fileButtonTrigger() {
      this.$refs.input[0].click();
    },
    fileButtonTextSetter(target) {
      if (target.files.length > 1) {
        return `(${target.files.length}) Arquivos selecionados`;
      }
      return target.value;
    },
  },
  computed: {
    fileButton() {
      if (!this.filesValue) {
        return this.placeholder || 'Selecione arquivos';
      }
      return this.filesValue;
    },
    inputLabelOrder() {
      switch (this.type) {
        case 'checkbox':
        case 'radio':
          return [1, 0];
        default:
          return [0, 1];
      }
    },
    inputWidth() {
      if (this.width === null) return false;
      if (Number.isNaN(this.width - 0)) return this.width;
      return `${this.width}px`;
    },
    fieldType() {
      switch (this.type) {
        case 'textarea':
        case 'select':
          return this.type;
        default:
          return 'input';
      }
    },
    inputType() {
      return this.fieldType === 'input' ? this.type : false;
    },
    isVertical() {
      switch (this.type) {
        case 'checkbox':
        case 'radio':
          return false;
        default:
          return true;
      }
    },
    isChecked() {
      switch (this.type) {
        case 'checkbox':
        case 'radio':
          return typeof this.value === 'boolean' && this.value;
        default:
          return false;
      }
    },
    autoCompleteHandler() {
      if (this.autoComplete !== 'off') return this.autoComplete;

      switch (this.type) {
        case 'email':
        case 'url':
        case 'tel':
          return this.type;
        case 'password':
          return 'off';
        default:
          return this.autoComplete;
      }
    },
  },
};
</script>

<style lang="stylus">
  @import '../themes/main';

.ViCompenent .ViInput
.ViInput
  &.flexWraper:not(.flexWraper--vertical)
    align-items center

  .contentWrapper.ViInput__Input
  .ViInput__Input
    border 1px solid $border-color-main
    background $input-background-main
    border-radius 0.3em
    padding 0.6em
    outline none

    &:focus
      border 1px solid $border-color-main-focus

    &--invalid
    &--validated:invalid
      border 1px solid $error-color

    &[type="checkbox"]:focus
    &[type="radio"]:focus
      & + label:before
        box-shadow 0 0 10px rgba($primary, 0.2)

    &[type="checkbox"]
    &[type="radio"]
      opacity 0
      margin-left 0.5em
      position relative
      transform scale(2)
      z-index 1
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

    &[type="checkbox"]:checked
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

    &[type="radio"]:checked
      & + label:before
        border-width 0.35em
        box-shadow inset 0 -0.4em 0.35em rgba(0, 0, 0, 0.1)
</style>

<docs>
Input básico:

```jsx
<vi-input />
```

Exemplo de formulario.

```vue
<template>
  <form class="ViComponent">
    <vi-wrapper
      vertical
      tag="fieldset"
    >
      <legend>About you</legend>
      <vi-input
        label="Name"
        auto-complete="name"
        v-model="name"
      />
      <vi-input
        label="Bio"
        type="textarea"
        rows="6"
        v-model="profileDescription"
      />
    </vi-wrapper>
    <vi-wrapper
      vertical
      tag="fieldset"
    >
      <legend>Relationship Status</legend>
      <vi-input
        v-for="(valueRel, index) in relationshipStatusOptions"
        :key="index"
        type="radio"
        name="relationshipStatus"
        :label="valueRel"
        :value="valueRel"
        :checked="valueRel === relationshipStatus"
        @input="relationshipStatus = valueRel"
      />
    </vi-wrapper>
    <pre><code>{{ dataForm }}</code></pre>
  </form>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      profileDescription: '',
      relationshipStatus: 'single',
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
  }
};
</script>
```

Exemplo de file input

```vue
<template>
  <form
    class="ViComponent"
    @submit.prevent="showFiles"
  >
    <vi-wrapper tag="div">
      <vi-input
        multiple
        type="file"
        ref="myFiles"
        name="relationshipStatus"
        @input="fileHandler"
      />
      <vi-button type="submit" success>Upload!</vi-button>
    </vi-wrapper>
  </form>
</template>
<script>
export default {
  data() {
    return {
      files: {},
    };
  },
  methods: {
    fileHandler(files) {
      this.files = files;
    },
    showFiles(files) {
      alert('look at your browser console!')
      console.log(this.files)
    },
  },
};
</script>
```


Exemplo de validação de formulário.

```vue
<template>
  <form
    @submit.prevent="testForm($event.target.validity)"
    @invalid.capture="testForm($event.target.validity)"
    class="ViComponent"
  >
    <vi-wrapper
      vertical
      tag="fieldset"
    >
      <legend>Login</legend>
      <vi-input
        label="Email"
        instruction="(Required)"
        type="email"
        v-model="email"
        required
        auto-complete="email"
        placeholder="exemple@gmail.com"
      />
      <vi-input
        label="Password"
        required
        instruction="(Required)"
        v-model="password"
        type="password"
        max-length="8"
        min-length="4"
      />
      <vi-input
        label="Você é um robo?"
        required
        pattern="[Nn]ão"
        instruction="(responda: Não)"
        v-model="robot"
      />
    </vi-wrapper>
    <vi-wrapper
      justify-content="left"
      tag="div"
    >
      <vi-button type="submit" success>Try!</vi-button>
      <vi-input
        required
        label="I read the EULA"
        v-model="terms"
        type="checkbox"
      />
    </vi-wrapper>
  </form>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      robot: '',
      terms: false,
    };
  },
  methods: {
    testForm(validity) {
      if(validity) {
        console.log('validity:', validity);
      } else {
        alert('Valid form!');
      }
    },
  },
};
</script>
```

Exemplo de validação com mensagem personalizada. [Opções de validação](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#dom-cva-validity).

```vue
<template>
  <form
    @submit.prevent="testForm($event.target.validity)"
    @invalid.capture="testForm($event.target.validity)"
    class="ViComponent"
  >
    <vi-wrapper
      justify-content="space-between"
      tag="div"
    >
      <vi-input
        placeholder="Email"
        required
        v-model="email"
        type="email"
        :customErrorMsg="customErrorMsg"
      />
      <vi-button type="submit" success>Try!</vi-button>
    </vi-wrapper>
  </form>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      customErrorMsg: {
        typeMismatch: 'Isso não é um email',
        valueMissing: 'Preecha o email',
      }
    };
  },
  methods: {
    testForm(validity) {
      if(validity) {
        console.log('validity:', validity);
      } else {
        alert('Valid form!');
      }
    },
  },
};
</script>
```
</docs>
