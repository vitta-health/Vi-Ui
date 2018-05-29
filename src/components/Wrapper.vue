<script>
import extrasMixin from '../mixins/extras';
import sizesMixin from '../mixins/sizes';

export default {
  name: 'ViWrapper',
  mixins: [extrasMixin, sizesMixin],
  props: {
    /**
     * _Tamanho:_ Remove margens dos filhos.
     */
    noMargin: {
      type: Boolean,
      default: false,
    },
    /**
     * Tag usada no wrapper
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
     * define se filhos vão ser embrulhados em um wrapper filho
     */
    childWrapper: {
      type: Boolean,
      default: false,
    },
    /**
     * Tag usada no wrapper filho (filhos usam mesma tag da prop `tag` se `childTag` igual null)
     */
    childTag: {
      type: String,
      default: null,
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

    if (this.vertical) wrapperClassName.push('flexWraper--vertical');
    if (this.proportionalBlock) blockClassName.push('contentWrapper--proportional');

    if (this.mini) {
      wrapperClassName.push('flexWraper--mini');
    } else if (this.small) {
      wrapperClassName.push('flexWraper--small');
    } else if (this.large) {
      wrapperClassName.push('flexWraper--large');
    } else if (this.noMargin) {
      wrapperClassName.push('flexWraper--noMargin');
    }

    if (this.childWrapper) {
      wrapperClassName.push('flexWraper--childWrapper');
      node.forEach((child) => {
        if (!child.text && !child.tag) return;
        if ('text' in child && !child.tag) {
          if (!child.text.replace(/[\s\n]/g, '')) return;
        }

        const newProps = {
          class: blockClassName.join(' '),
        };

        wrapped.push(createElement(self.childTag || self.tag, newProps, [child]));
      });
    } else {
      node.map((child) => {
        if (!child.text && !child.tag) return child;
        if ('text' in child && !child.tag) {
          if (!child.text.replace(/[\s\n]/g, '')) return child;
        }

        const newChild = child;
        if (child.data) {
          newChild.data.staticClass = child.data.staticClass || '';
          newChild.data.staticClass = `${newChild.data.staticClass} ${blockClassName.join(' ')}`;
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

  &--childWrapper
    & > .contentWrapper
      align-items stretch
      display flex

  & > .contentWrapper
    margin-left 20px

    &:first-child
      margin-left 0

    &--proportional
      flex 1 1

  &--vertical
    flex-direction column
    & > .contentWrapper
      margin-left 0
      margin-top 20px
    & > .contentWrapper:first-child
      margin-top 0

  &--mini
    & > .contentWrapper
      margin-left 5px
      &:first-child
        margin-left 0
    &.flexWraper--vertical
      & > .contentWrapper
        margin-left 0
        margin-top 5px
      & > .contentWrapper:first-child
        margin-top 0

  &--small
    & > .contentWrapper
      margin-left 10px
      &:first-child
        margin-left 0
    &.flexWraper--vertical
      & > .contentWrapper
        margin-left 0
        margin-top 10px
      & > .contentWrapper:first-child
        margin-top 0

  &--large
    & > .contentWrapper
      margin-left 30px
      &:first-child
        margin-left 0
    &.flexWraper--vertical
      & > .contentWrapper
        margin-left 0
        margin-top 30px
      & > .contentWrapper:first-child
        margin-top 0

  &--noMargin
    & > .contentWrapper
      margin-left 0
    &.flexWraper--vertical
      & > .contentWrapper
        margin-top 0
</style>

<docs>
Wrapper aplica flexbox entre os filhos. Ele também pode embrulhar .
</docs>
