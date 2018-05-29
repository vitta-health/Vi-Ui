<template>
  <vi-wrapper
    no-margin
    vertical
    justify-content="flex-start"
    tag="div"
    class="ViComponent ViInput">
    <label
      v-if="label"
      :for="idInput"
      class="ViInput__Label"
    >{{ label }}
      <small
        v-if="labelExtra"
        lass="ViInput__LabelExtra"
      >{{ labelExtra }}</small>
    </label>
    <input
      @input="update($event.target.value)"
      :autocomplete="autocomplete"
      class="ViInput__Input"
      :id="idInput"
      :value="value"
      :required="required"
      ref="input"
      :placeholder="placeholder || ''"
      :type="type"
    >
  </vi-wrapper>
</template>

<script>
import ViWrapper from './Wrapper.vue';
import sizeMixin from '../mixins/sizes';
import extrasMixin from '../mixins/extras';

export default {
  name: 'ViInput',
  components: {
    ViWrapper,
  },
  mixins: [sizeMixin, extrasMixin],
  props: {
    /**
     * Tipo de input
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
    labelExtra: {
      type: String,
      default: null,
    },
    /**
     * Placeholder do input
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * Valor do campo
     */
    value: {
      type: [String, Number, Object, Array],
      default: null,
    },
    /**
     * Auto-complete   https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute
     */
    autocomplete: {
      type: String,
      default: 'off',
    },
    /**
     * Identificador do campo (canso não definido retorna uma id auto gerada)
     */
    idInput: {
      type: String,
      default: () => {
        if ('ViInputCounter' in window) {
          window.ViInputCounter += 1;
        } else {
          window.ViInputCounter = 0;
        }
        return `ViInput__Field${window.ViInputCounter}`;
      },
    },
    /**
     * _Validação:_ Obrigatório
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * _Validação:_ Mensagem de required
     */
    requiredMesage: {
      type: String,
      default: null,
    },
  },
  methods: {
    update(value) {
      this.$emit('input', value);
    },
  },
  computed: {
    buttonWidth() {
      if (Number.isNaN(this.width - 0)) return this.width;
      return `${this.width}px`;
    },
    tagButton() {
      if (this.href) return 'a';
      return 'button';
    },
  },
};
</script>

<style lang="stylus">
  @import '../themes/main';

  .ViInput__Label
    margin-bottom 0.3em

  .ViInput__Input
    border 1px solid $border-color-main
    background $input-background-main
    border-radius 0.3em
    padding 0.6em
    outline none

    &:focus
      border 1px solid $border-color-main-focus
</style>

<docs>
Input básico:

```jsx
<vi-input
  label="Label Input"
  value=""
/>
```

Exemplo de formulario.

```vue
<template>
  <form
    @submit.prevent="showform()"
    id="thisFormExemple"
    class="ViComponent"
  >
    <vi-wrapper
      vertical
      tag="fieldset"
    >
      <vi-input
        label="Name"
        autocomplete="name"
        v-model="nome"
      />
      <vi-input
        label="Email"
        labelExtra="(Obrigatório)"
        type="email"
        v-model="email"
        required
        autocomplete="email"
        placeholder="exemple@gmail.com"
      />
      <vi-input
        label="Password"
        required
        labelExtra="(Obrigatório)"
        v-model="password"
        type="password"
      />
      <vi-wrapper justify-content="flex-end">
        <vi-button type="submit" success>Try!</vi-button>
      </vi-wrapper>
      <code style="display:none" ref="formResult"></code>
    </vi-wrapper>
  </form>
</template>
<script>
export default {
  data() {
    return {
      nome: '',
      email: '',
      password: '',
    };
  },
  methods: {
    showform() {
      this.$refs.formResult.style.display = 'block';
      this.$refs.formResult.innerHTML = JSON.stringify(this._data, null, 2);
      return this;
    },
  },
};
</script>
```
</docs>
