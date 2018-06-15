<template>
  <vi-wrapper
    mini
    vertical
    justify-content="flex-start"
    class="ViComponent ViInput"
    :style="{ width: componentWidth }"
  >
    <vi-input-label v-bind="{ for: id, label, instruction }"/>
    <vi-wrapper
      no-margin
      class="ViInput_Wrapper"
    >
      <div
        v-if="hasPrefix"
        class="ViInput__Slot ViInput__Slot--prefix"
      >
        <slot name="prefix" />
      </div>
      <component
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
          autocomplete: autoComplete,
          autofocus: autoFocus,
          disabled,
          id,
          max,
          maxlength: maxLength,
          min,
          minlength: minLength,
          name: name || id,
          pattern,
          placeholder,
          required,
          readOnly,
          rows,
          type: inputType,
          value,
        }"
        :is="fieldType"
      />
      <div
        v-if="hasSuffix"
        class="ViInput__Slot ViInput__Slot--suffix"
      >
        <slot name="suffix" />
      </div>
    </vi-wrapper>
  </vi-wrapper>
</template>


<script>
import ViWrapper from './Wrapper.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import ViInputLabel from '../helperComponents/InputLabel.vue';
import inputMixin from '../mixins/input';

export default {
  name: 'ViInput',
  components: {
    ViWrapper,
    ViInputLabel,
  },
  mixins: [scaleMixin, widthMixin, inputMixin],
  props: {
    /**
     * Tipo de campo
     */
    type: {
      type: String,
      default: 'text',
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
     * _Validação:_ Número mínimo no valor do campo
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
    * Número de linhas quando usando textarea
    */
    rows: {
      type: [String, Number],
      default: null,
    },
    /**
     * Placeholder do campo
     */
    placeholder: {
      type: String,
      default: null,
    },
  },
  methods: {
    inputChange(target) {
      this.validated = false;
      this.invalid = false;

      /**
       * Evento de retorno de dados
       *
       * @event input
       * @type {string|number|object|array}
       *
       */
      this.$emit('input', target.value);
    },
  },
  computed: {
    hasSuffix() {
      return 'suffix' in this.$slots;
    },
    hasPrefix() {
      return 'prefix' in this.$slots;
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
  },
};
</script>

<style lang="stylus">
@import '../themes/main'
@import '../themes/input'
</style>

<docs>
### Input básico

```jsx
<vi-input />
```

### Input com sufixo e prefixo

```jsx
<vi-input type="number" min="0" step="1">
  <template slot="prefix">R$</template>
  <template slot="suffix">,00</template>
</vi-input>
```

### Exemplo de formulário

Por pardrão o componente imput e outros componentes não tem margem.
Pra trabalhar com conjunto de elementos use o [ViWrapper](#Wrapper).

```vue
<template>
  <form class="ViComponent">
    <vi-wrapper
      vertical
      tag="fieldset"
    >
      <legend><vi-icon name="person" /> About you</legend>
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
      <legend><vi-icon name="question" /> Relationship Status</legend>
      <vi-checkbox
        radio
        v-for="(valueRel, index) in relationshipStatusOptions"
        :key="index"
        :label="valueRel"
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

### Exemplo de validação de formulário

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
      <legend><vi-icon name="padlock" /> Login</legend>
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
    >
      <vi-button type="submit" success>Try!</vi-button>
      <vi-checkbox
        required
        label="I read the EULA"
        v-model="terms"
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
### Exemplo de validação com mensagem personalizada

Você pode ver as popções de validação, [aqui](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#dom-cva-validity).

```vue
<template>
  <form
    @submit.prevent="testForm($event.target.validity)"
    @invalid.capture="testForm($event.target.validity)"
    class="ViComponent"
  >
    <vi-wrapper
      justify-content="space-between"
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
