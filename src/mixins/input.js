/**
 * @mixin
 */
export default {
  props: {
    /**
     * Valor do campo
     * @model
     */
    value: {
      type: [String, Number, Boolean, Object, Array],
      default: null,
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
    * Nome do campo (usa o mesmo que fieldID se não definido)
    */
    name: {
      type: String,
      default: null,
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
  },
  methods: {
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
  data() {
    return {
      validated: false,
      invalid: false,
    };
  },
};
