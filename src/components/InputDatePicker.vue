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
    <vi-wrapper
      no-margin
      class="ViInput_Wrapper"
      tag="div"
    >
      <div class="ViInput__Slot ViInput__Slot--prefix">
        <vi-icon name="calendar"/>
      </div>
      <v-date-picker
        :class="[
          'ViInput__Input',
          {
            'ViInput__Input--validated': validated || forceValidation,
            'ViInput__Input--invalid': invalid,
          }
        ]"
        :formats="formats"
        popover-visibility="focus"
        :show-day-popover="false"
        @input="inputChange"
        :min-date="min"
        :max-date="max"
        :disabled-dates="disabledDates"
        :input-props="{
          required,
          pattern,
          class: 'ViInput__InputDate',
          placeholder: ranged ? rangedPlaceholder : placeholder,
        }"
        tint-color="#3581BC"
        :mode="defineMode"
        :value="value"
      />
    </vi-wrapper>
  </vi-wrapper>
</template>


<script>
import ViWrapper from './Wrapper.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import ViInputLabel from '../helperComponents/InputLabel.vue';
import ViIcon from './Icon.vue';
import inputMixin from '../mixins/input';


export default {
  name: 'ViDatePicker',
  components: {
    ViWrapper,
    ViInputLabel,
    ViIcon,
  },
  mixins: [scaleMixin, widthMixin, inputMixin],
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
     * Datas para desabilitar.
     */
    disabledDates: {
      type: [Array, Date, Object],
      default: null,
    },
    /**
     * _Validação:_ Número mínimo no valor do campo
     */
    min: {
      type: [Date],
      default: null,
    },
    /**
     * _Validação:_ Número máximo no valor do campo
     */
    max: {
      type: [Date],
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
     * Define se o datepicker dever buscar um período em vez de uma data especifica.
     */
    ranged: {
      type: Boolean,
      default: false,
    },
    /**
     * Placeholder se datepicker for ranged.
     */
    rangedPlaceholder: {
      type: String,
      default: 'Selecione um período',
    },
    /**
     * Placeholder do datepicker.
     */
    placeholder: {
      type: String,
      default: 'Selecione uma data',
    },
    /**
     * Valor do campo
     * @model
     */
    value: {
      type: [Date, Object, Array],
      default: null,
    },
  },
  computed: {
    defineMode() {
      if (this.multipe) return 'multiple';
      return this.ranged ? 'range' : 'single';
    },
  },
  methods: {
    inputChange(value) {
      this.validated = false;
      this.invalid = false;

      /**
       * Evento de retorno de dados
       *
       * @event input
       * @type {Date|Object|Array}
       *
       */
      this.$emit('input', value);
    },
  },
  data() {
    return {
      dateFormat: 'D MMM',
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'W',
        navMonths: 'MMM',
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
        dayPopover: 'L',
      }
    };
  },
};
</script>

<style lang="stylus">
@import '../../node_modules/v-calendar/lib/v-calendar.min.css'
@import '../themes/main'
@import '../themes/input'

.ViComponent.ViInput
  .contentWrapper.ViInput__Input
    .ViInput__InputDate
      border-top-left-radius 0
      border-bottom-left-radius 0
</style>

<docs>
Input Datepicker básico:

```vue
<template>
  <div class="ViComponent">
    <vi-date-picker ranged v-model="date" />
    <pre><code>{{ dataForm }}</code></pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: null,
    };
  },
  computed: {
    dataForm() {
      return JSON.stringify(this._data, null, 2);
    },
  }
};
</script>
```
</docs>
