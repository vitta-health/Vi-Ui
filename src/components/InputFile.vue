<template>
  <vi-wrapper
    mini
    vertical
    justify-content="flex-start"
    tag="div"
    class="ViComponent ViInput ViInputFile"
    :style="{ width: componentWidth }"
  >
    <vi-input-label v-bind="{ for: fieldID, label, instruction }"/>
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
        id: fieldID,
        accept,
        multiple,
        name: name || fieldID,
        placeholder,
        required,
        readOnly,
      }"
    >
    <vi-wrapper
      no-margin
      class="ViInput_Wrapper"
      tag="div"
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
      >
      <vi-button
        primary
        @click="fileTrigger"
      >
        {{ buttonDesciption }}
      </vi-button>
    </vi-wrapper>
  </vi-wrapper>

</template>


<script>
/* eslint-disable max-len */
import ViWrapper from './Wrapper.vue';
import ViButton from './Button.vue';
import ViInputLabel from '../helperComponents/InputLabel.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import inputMixin from '../mixins/input';
import positioningMixin from '../mixins/positioning';

export default {
  name: 'ViInputFile',
  components: {
    ViWrapper,
    ViButton,
    ViInputLabel,
  },
  mixins: [scaleMixin, widthMixin, inputMixin, positioningMixin],
  props: {
    /**
     * Auto-complete [opções de autocomplete](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute).
     * Obs: Chrome ignora a opção "off" (ou "false") e tenta decidir por conta propria
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
     * Descrição no campo quando input vazio.
     */
    emptyInput: {
      type: String,
      default: 'No selected file',
    },
    /**
     * Descrição no campo se `multiple` selecionado e mais de um arquivo selecionado. A tag ##NUMBER## é subistituida pelo total de arquivos.
     */
    filledInput: {
      type: String,
      default: '(##NUMBER##) Selected files',
    },
    /**
     * Descrição no botão de seleção
     */
    buttonDesciption: {
      type: String,
      default: 'Select files',
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
       * @type {string|number|object|array|boolean}
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
      this.$refs.input.click();
    },
  },
  computed: {
    filesTextValue() {
      let valueText = this.emptyInput;
      if (this.totalFiles > 0 && !this.multiple) {
        valueText = this.fileName;
      } else {
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
</style>

<docs>
Input File básico:

```jsx
<vi-input-file />
```

Personalização do Input File:

```jsx
<vi-input-file
  multiple
  emptyInput="Nenhuma foto selecionada"
  filledInput="Total de fotos selecionadas: (##NUMBER##)"
  label="Adicionar fotos ao album"
  button-desciption="Selecionar fotos"
/>
```


Exemplo de validação de formulário.

```jsx
<form
  @submit.prevent=""
  class="ViComponent"
>
  <vi-wrapper
    vertical
    tag="fieldset"
  >
    <legend>Album</legend>

    <vi-input-file
      label="Photos to upload"
      required
      multiple
      accept="image/*"
    />
  </vi-wrapper>
  <vi-wrapper
    justify-content="left"
    tag="div"
  >
    <vi-button type="submit" success>Upload!</vi-button>
  </vi-wrapper>
</form>
```
</docs>
