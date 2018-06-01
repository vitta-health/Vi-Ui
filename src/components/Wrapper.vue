<script>
import extrasMixin from '../mixins/extras';
import { scaleMixin } from '../mixins/sizes';

export default {
  name: 'ViWrapper',
  mixins: [extrasMixin, scaleMixin],
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
     * define se ordem dos filhos é invertida
     */
    inverted: {
      type: Boolean,
      default: false,
    },
    /**
     * quando definido, pode quebra linha
     */
    breakLine: {
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
    if (!this.$slots.default) return null;
    const self = this;
    const wrapped = [];
    const node = this.$slots.default;
    const wrapperClassName = ['flexWraper'];
    const blockClassName = ['contentWrapper'];

    if (this.vertical) wrapperClassName.push('flexWraper--vertical');
    if (this.inverted) wrapperClassName.push('flexWraper--inverted');
    if (this.breakLine) wrapperClassName.push('flexWraper--breakLine');
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
        alignItems: self.alignItems,
      },
    }, wrapped.length ? wrapped : node);
  },
};
</script>

<style lang="stylus" scoped>
.ViComponent .flexWraper
.flexWraper
  align-items stretch
  display flex
  width 100%

  &--childWrapper
    & > .contentWrapper
      align-items stretch
      display flex

  & > .contentWrapper
    margin 0 20px 0 0

    &:last-child
      margin 0

    &--proportional
      flex 1 1

  &--breakLine
    flex-wrap wrap
    & > .contentWrapper
      margin-bottom 20px

  &--vertical
    flex-direction column
    & > .contentWrapper
      margin 0 0 20px
    & > .contentWrapper:last-child:not(.flexWrape--breakLine)
      margin 0

  &--inverted
    flex-direction row-reverse
    &.flexWraper--vertical
      flex-direction column-reverse

  &--mini
    & > .contentWrapper
      margin 0 5px 0 0
      &:last-child:not(.flexWrape--breakLine)
        margin 0
    &.flexWrape--breakLine
      & > .contentWrapper
        margin-bottom 5px
    &.flexWraper--vertical
      & > .contentWrapper
        margin 0 0 5px
        &:last-child
          margin 0

  &--small
    & > .contentWrapper
       margin 0 10px 0 0
      &:last-child:not(.flexWrape--breakLine)
        margin 0
    &.flexWrape--breakLine
      & > .contentWrapper
        margin-bottom 10px
    &.flexWraper--vertical
      & > .contentWrapper
        margin 0 0 10px
        &:last-child
          margin 0

  &--large
    & > .contentWrapper
      margin 0 30px 0 0
      &:last-child:not(.flexWrape--breakLine)
        margin 0
    &.flexWrape--breakLine
      & > .contentWrapper
        margin-bottom 30px
    &.flexWraper--vertical
      & > .contentWrapper
        margin 0 0 30px
        &:last-child
          margin 0

  &--noMargin
    & > .contentWrapper
      margin 0
    &.flexWrape--breakLine
    &.flexWraper--vertical
      & > .contentWrapper
        margin 0
</style>

<docs>
Wrapper aplica flexbox entre os filhos.
Ele também pode embrulhar os filhos em uma tag caso necessario.
</docs>
