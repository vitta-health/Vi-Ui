<script>
import positioningMixin from '../mixins/positioning';
import { scaleMixin } from '../mixins/sizes';

export default {
  name: 'ViWrapper',
  functional: true,
  mixins: [positioningMixin, scaleMixin],
  props: {
    /**
     * _Tamanho:_ Remove margens dos filhos
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
     * Define se blocos precisam ter o mesmo tamanho entre eles
     */
    proportionalBlock: {
      type: Boolean,
      default: false,
    },
    /**
     * Define se direção do wrap é vertical
     */
    vertical: {
      type: Boolean,
      default: false,
    },
    /**
     * Define se ordem dos filhos é invertida
     */
    inverted: {
      type: Boolean,
      default: false,
    },
    /**
     * Quando definido, os filhos quebrar linha
     */
    breakLine: {
      type: Boolean,
      default: false,
    },
    /**
     * Define se filhos vão ser embrulhados em um wrapper filho
     */
    childWrapper: {
      type: Boolean,
      default: false,
    },
    /**
     * Tag usada no wrapper filho. Se `childTag` for null, utiliza o valor da prop `tag`
     */
    childTag: {
      type: String,
      default: null,
    },
    /**
     * Tag pai condincional
     */
    removeParentWrapper: {
      type: Boolean,
      default: false,
    },
  },
  render(createElement, context) {
    const children = context.children.filter((node) => {
      if (!node.tag && !node.text) return false;
      return node.tag || node.text.replace(/[\s\n]/g, '');
    });
    if (children.length === 0) return null;
    const { props } = context;
    const wrapperClassName = ['flexWraper'];
    const blockClassName = ['contentWrapper'];

    if (props.vertical) wrapperClassName.push('flexWraper--vertical');
    if (props.inverted) wrapperClassName.push('flexWraper--inverted');
    if (props.breakLine) wrapperClassName.push('flexWraper--breakLine');
    if (props.childWrapper) wrapperClassName.push('flexWraper--childWrapper');
    if (props.proportionalBlock) blockClassName.push('contentWrapper--proportional');

    if (props.mini) wrapperClassName.push('flexWraper--mini');
    else if (props.small) wrapperClassName.push('flexWraper--small');
    else if (props.large) wrapperClassName.push('flexWraper--large');
    else if (props.noMargin) wrapperClassName.push('flexWraper--noMargin');

    const iteratedChildren = children.map((node) => {
      if (props.childWrapper) {
        const newProps = {
          class: blockClassName.join(' '),
        };
        return createElement(props.childTag || props.tag, newProps, [node]);
      }
      const newNode = node;

      if (node.data) {
        newNode.data.staticClass = `${node.data.staticClass || ''} ${blockClassName.join(' ')}`;
      }
      return newNode;
    });
    if (!props.removeParentWrapper) {
      const newCtx = context.data;
      newCtx.staticClass = `${newCtx.staticClass} ${wrapperClassName.join(' ')}`;
      newCtx.style = {
        ...newCtx,
        ...{
          justifyContent: props.justifyContent,
          alignItems: props.alignItems,
        },
      };

      return createElement(props.tag, newCtx, iteratedChildren);
    }

    return iteratedChildren;
  },
};
</script>

<style lang="stylus">
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
Ele também pode embrulhar os filhos em uma tag caso necessário.
</docs>
