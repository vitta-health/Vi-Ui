<template>
  <vi-wrapper
    mini-spacing
    vertical
    justify-content="flex-start"
    class="ViComponent ViInput"
    :class="{ 'ViInput--elevated': isPopoverOpen }"
    :style="{ width: componentWidth }"
  >
    <vi-input-label v-bind="{ for: id, label, instruction }"/>
    <vi-wrapper
      no-spacing
      class="ViInput_Wrapper"
    >
      <div class="ViInput__Slot ViInput__Slot--prefix">
        <vi-icon name="calendar"/>
      </div>
      <v-date-picker
        @input="inputChange($event, 'input')"
        @change="inputChange($event, 'change')"
        @popover-will-appear.capture="popoverState(true)"
        @popover-will-disappear.capture="popoverState(false)"
        popover-visibility="focus"
        tint-color="#3581BC"
        :disabled-dates="disabledDates"
        :formats="formats"
        :input-props="{
          required,
          class: [
            'contentWrapper',
            'ViInput__Input',
            {
              'ViInput__Input--validated': validated || forceValidation,
              'ViInput__Input--invalid': invalid,
            }
          ],
          placeholder: placeholder,
        }"
        :is-double-paned="doublePanel"
        :is-required="required"
        :max-date="max"
        :min-date="min"
        :mode="defineMode"
        :show-day-popover="false"
        :value="value"
      />
    </vi-wrapper>
  </vi-wrapper>
</template>

<script>
import { setupCalendar, DatePicker } from 'v-calendar';
import ViWrapper from './Wrapper.vue';
import { scaleMixin, widthMixin } from '../mixins/sizes';
import ViInputLabel from '../helperComponents/InputLabel.vue';
import ViIcon from './Icon.vue';
import inputMixin from '../mixins/input';

const FORMATS = {
  title: 'MMMM YYYY',
  weekdays: 'W',
  navMonths: 'MMM',
  input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
};

export default {
  name: 'ViDatepicker',
  beforeMount() {
    setupCalendar({
      locale: 'pt-BR',
      firstDayOfWeek: 1,
    });
  },
  components: {
    ViWrapper,
    ViInputLabel,
    ViIcon,
    'v-date-picker': DatePicker,
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
     * Datas para desabilitar.
     */
    disabledDates: {
      type: [Array, Date, Object],
      default: null,
    },
    /**
     * _Validação:_ Data mínima no valor do campo
     */
    min: {
      type: [Date],
      default: null,
    },
    /**
     * _Validação:_ Data máxima no valor do campo
     */
    max: {
      type: [Date],
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
     * Exibe dois paineis de calendádio ao mesmo tempo
     */
    doublePanel: {
      type: Boolean,
      default: false,
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
    popoverState(value) {
      this.isPopoverOpen = value;
    },
    inputChange(value, type) {
      this.validated = false;
      this.invalid = false;

      /**
       * Evento de retorno de dados
       *
       * @event input
       * @type {Date|Object|Array}
       *
       */
      this.$emit(type, value);
    },
  },
  data() {
    return {
      formats: FORMATS,
      isPopoverOpen: false,
    };
  },
};
</script>

<style lang="stylus">
@import '../../node_modules/v-calendar/lib/v-calendar.min.css'
@import '../themes/main'
@import '../themes/input'

.ViComponent.ViInput
  .popover-container
    width 100%
</style>

<docs>
### Input Datepicker básico

```vue
<template>
  <vi-wrapper vertical class="ViComponent">
    <vi-datepicker ranged v-model="date" />
    <pre><code>{{ dataForm }}</code></pre>
  </vi-wrapper>
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
