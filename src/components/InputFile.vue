<template>
  <vi-wrapper
    mini-spacing
    vertical
    justify-content="flex-start"
    class="ViComponent ViInput ViInputFile"
    :style="{ width: componentWidth }"
  >
    <vi-input-label v-bind="{ for: id, label, instruction }"/>
    <input
      ref="input"
      @valid="validate($event.target)"
      @invalid="validate($event.target)"
      @input="inputChange($event.target)"
      @change="inputChange($event.target)"
      class="ViInput__FileInput"
      type="file"
      v-bind="{
        autocomplete: autoComplete,
        autofocus: autoFocus,
        disabled,
        id,
        accept,
        multiple,
        name: name || id,
        placeholder,
        required,
        readOnly,
      }"
    >
    <vi-wrapper
      no-spacing
      class="ViInput_Wrapper"
    >
      <input
        class="ViInput__Input"
        :class="{
          'ViInput__Input--validated': validated || forceValidation,
          'ViInput__Input--invalid': invalid,
        }"
        type="text"
        v-bind="{
          disabled,
          readOnly: true,
          value: filesTextValue,
        }"
        @click="fileTrigger"
        tabindex="-1"
      >
      <vi-button
        primary
        :disabled="disabled"
        @click="fileTrigger"
        tabindex="-1"
      >
        {{ buttonDesciption }}
      </vi-button>
    </vi-wrapper>
  </vi-wrapper>

</template>


<script>
import ViWrapper from './Wrapper.vue';
import ViButton from './Button.vue';
import ViInputLabel from '../helperComponents/InputLabel.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import inputMixin from '../mixins/input';

export default {
  name: 'ViInputFile',
  components: {
    ViWrapper,
    ViButton,
    ViInputLabel,
  },
  mixins: [scaleMixin, widthMixin, inputMixin],
  props: {
    /**
     * Auto-complete [opções de autocomplete](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute).
     * Obs: Chrome ignora a opção "off" (ou "false") e tenta decidir por conta própria
     */
    autoComplete: {
      type: String,
      default: 'on',
    },
    /**
     * _Validação:_ [formatos e extensões](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)
     * ou [MIME types](http://www.iana.org/assignments/media-types/media-types.xhtml)
     * aceitados por um campo arquivo
     */
    accept: {
      type: String,
      default: null,
    },
    /**
     * Descrição no campo quando o input estiver vazio.
     */
    emptyInput: {
      type: String,
      default: 'No selected file',
    },
    /**
     * Texto do botão para quando a opção `multiple` é true e há mais de um arquivo selecionado.
     * A string ##NUMBER## é substituída pelo número de arquivos.
     */
    filledInput: {
      type: String,
      default: '##NUMBER## Selected files',
    },
    /**
     * Descrição no botão de seleção
     */
    buttonDesciption: {
      type: String,
      default: 'Select files',
    },
    /**
     * Placeholder do campo
     */
    placeholder: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      fileName: '',
      totalFiles: 0,
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
       * @type {File}
       *
       */
      this.$emit('input', value);
    },
    valueHandler(target) {
      this.totalFiles = target.files.length;
      this.fileName = this.totalFiles !== 1
        ? '' : target.value;

      return target.files;
    },
    fileTrigger() {
      if (this.disabled) return;
      this.$refs.input.click();
    },
  },
  computed: {
    filesTextValue() {
      let valueText = this.emptyInput;
      if (this.totalFiles === 1) {
        valueText = this.fileName;
      } else if (this.totalFiles > 1) {
        valueText = this.filledInput;
      }

      return valueText.replace('##NUMBER##', this.totalFiles);
    },
  },
};
</script>

<style lang="stylus">
@import '../themes/main'
@import '../themes/input'

.ViComponent.ViInput
  .ViInput__FileInput
    border 0
    bottom -1px
    height 1px
    margin 0
    overflow hidden
    opacity 0
    padding 0
    position absolute
    right 0
    width 100%

    & + .ViInput_Wrapper
      & .ViInput__Input:focus
        border 1px solid $border-color-main-focus
        box-shadow 0 0 0 0.2em rgba($border-color-main-focus, 0.4)
        outline none
</style>

<docs>
### Input File básico

```jsx
<vi-input-file />
```

### Personalização do Input File

```jsx
<vi-input-file
  multiple
  emptyInput="Nenhuma foto selecionada"
  filledInput="Total de fotos selecionadas: ##NUMBER##"
  label="Adicionar fotos ao album"
  button-desciption="Selecionar fotos"
/>
```

### Exemplo de validação de formulário

```jsx
<form
  @submit.prevent=""
  class="ViComponent"
>
  <vi-wrapper
    vertical
    tag="fieldset"
  >
    <legend><vi-icon name="upload" /> Album</legend>

    <vi-input-file
      label="Photos to upload"
      required
      multiple
      accept="image/*"
    />
  </vi-wrapper>
  <vi-wrapper
    justify-content="left"
  >
    <vi-button type="submit" success>Upload!</vi-button>
  </vi-wrapper>
</form>
```
</docs>
