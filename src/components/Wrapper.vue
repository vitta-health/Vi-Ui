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
     * define se blocos precisam ter o mesmo tamanho entre eles
     */
    proportionalBlock: {
      type: Boolean,
      default: false,
    },
    /**
     * define se direção do wrap é vertical
     */
    vertical: {
      type: Boolean,
      default: false,
    },
    /**
     * define se filhos vão ser encapsulados em uma tag
     */
    noChildWrapper: {
      type: Boolean,
      default: false,
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
  render(createElement) {
    const self = this;
    const wrapped = [];
    const node = this.$slots.default;
    const wrapperClassName = ['flexWraper'];
    const blockClassName = ['contentWrapper'];

    if (this.vertical) wrapperClassName.push(' flexWraper--vertical');
    if (this.proportionalBlock) blockClassName.push(' contentWrapper--proportional');

    if (!this.noChildWrapper) {
      node.forEach((child) => {
        if (!child.text && !child.tag) return;
        const newProps = {
          class: blockClassName.join(' '),
          style: {
            marginLeft: self.spacingComp,
          },
        };

        wrapped.push(createElement(self.tag, newProps, [child]));
      });
    } else {
      node.map((child) => {
        const newChild = child;
        if (child.data) {
          newChild.data.staticClass = child.data.staticClass || '';
          newChild.data.staticClass = `${newChild.data.staticClass} ${blockClassName.join(' ')}`;
          newChild.data.style = { marginLeft: self.spacingComp };
        }

        return newChild;
      });
    }

    return createElement(self.tag, {
      class: wrapperClassName.join(' '),
      style: {
        justifyContent: self.justifyContent,
      },
    }, wrapped.length ? wrapped : node);
  },
};
</script>

<style lang="stylus" scoped>
.flexWraper
  align-items stretch
  display flex
  width 100%

  &--vertical
    flex-direction column

  & > .contentWrapper
    align-items stretch
    display flex

    &:first-child
      margin-left 0!important

    &--proportional
      flex 1 1
</style>

<docs>
Wrapper embrulha cada filho no slot em uma tag escolhida e aplica flexbox entre eles uma usando uma [render function](https://vuejs.org/v2/guide/render-function.html).
</docs>
