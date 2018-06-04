<template>
  <vi-wrapper
    mini
    vertical
    justify-content="flex-start"
    tag="div"
    class="ViComponent ViInput"
    :style="{ width: componentWidth }"
  >
    <vi-input-label v-bind="{ for: fieldID, label, instruction }"/>
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
        autocomplete: autoCompleteHandler,
        autofocus: autoFocus,
        disabled,
        id: fieldID,
        max,
        maxlength: maxLength,
        min,
        minlength: minLength,
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
    />
  </vi-wrapper>
</template>


<script>
/* eslint-disable max-len */
import ViWrapper from './Wrapper.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import ViInputLabel from '../helperComponents/InputLabel.vue';
import inputMixin from '../mixins/input';
import extrasMixin from '../mixins/extras';

export default {
  name: 'ViInput',
  components: {
    ViWrapper,
    ViInputLabel,
  },
  mixins: [scaleMixin, widthMixin, inputMixin, extrasMixin],
  props: {
    /**
     * Tipo de campo
     */
    type: {
      type: String,
      default: 'text',
    },
    /**
     * Usado para comparar quando options é um array de objetos
     */
    trackBy: {
      type: String,
      default: null,
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
    * Número de linhas quando usando textarea
    */
    rows: {
      type: [String, Number],
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
       * @type {string|number|object|array|boolean}
       *
       */
      this.$emit('input', target.value);
    },
  },
  computed: {
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
@import '../themes/main'
@import '../themes/input'
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
      <vi-inputCheckbox
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
      <vi-inputCheckbox
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
