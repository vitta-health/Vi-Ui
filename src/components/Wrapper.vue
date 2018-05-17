<script>
import extrasMixin from '../mixins/extras';

export default {
  name: 'ViWrapper',
  mixins: [extrasMixin],
  props: {
    /**
     * Tag que faz wrap do slot
     */
    tag: {
      type: String,
      default: 'span',
    },
    /**
     * Espaço entre elementos
     */
    spacing: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    spacingComp() {
      if (Number.isNaN(this.spacing - 0)) return this.spacing;
      return `${this.spacing}px`;
    },
  },
  /**
   * Arrow function quebra se usado aqui
   */
  render(createElement) {
    const self = this;
    const wrapped = [];
    this.$slots.default.forEach((child) => {
      const newProps = {
        class: 'boxWrapper',
        style: {
          marginLeft: self.spacingComp,
        },
      };

      wrapped.push(createElement(self.tag, newProps, [child]));
    });

    return createElement(self.tag, {
      class: 'flexWraper',
      style: {
        justifyContent: self.justifyContent,
      },
    }, wrapped);
  },
};
</script>

<style lang="stylus" scoped>
.flexWraper
  display flex
  width 100%

  .boxWrapper:first-child
    margin:0!important
</style>

<docs>
Wrapper embrulha cada filho no slot em uma tag escolhida e aplica flexbox entre eles uma usando uma [render function](https://vuejs.org/v2/guide/render-function.html).
</docs>
