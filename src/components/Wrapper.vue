<script>
/* eslint-disable max-len */
/* Esse disable precisa exister por causa da tabela na parte de documentação. */
import positioningMixin from '../mixins/positioning';
import { scaleMixin } from '../mixins/sizes';

const justify = value => `flexWraper--justify-content-${value}`;
const align = value => `flexWraper--align-items-${value}`;

const addClassNames = (props, classesToMerge) => {
  const className = ['flexWraper'];
  if (classesToMerge) className.push(classesToMerge);

  if (props.justifyContent) className.push(justify(props.justifyContent));
  if (props.alignItems) className.push(align(props.alignItems));
  if (props.vertical) className.push('flexWraper--vertical');
  if (props.inverted) className.push('flexWraper--inverted');
  if (props.childWrapper || props.grid) className.push('flexWraper--child-wrapper');
  if (props.noWrap && props.grid) className.push('flexWraper--no-wrap');

  if (props.grid) className.push('flexWraper--grid');
  else className.push('flexWraper--not-grid');

  if (props.mini) className.push('flexWraper--mini');
  else if (props.small) className.push('flexWraper--small');
  else if (props.large) className.push('flexWraper--large');
  else if (props.noMargin) className.push('flexWraper--no-margin');

  return className;
};

const kebabToCamelCase = str => str.replace(/-[a-z]/, l => l[1].toUpperCase());
const col = (size, value) => `${kebabToCamelCase(size)}--size${value || '-default'}`;
const order = (size, value) => `${kebabToCamelCase(size)}--pos${value || '-default'}`;

const addChildClassNames = (data, {
  proportionalChild,
  grid,
}) => {
  const className = ['contentWrapper'];
  if (proportionalChild) className.push('contentWrapper--proportional');

  if (!data) return className.join(' ');
  if (data.class) className.push(data.class);

  if (grid) {
    if (!data.attrs) return className.join(' ');

    Object.keys(data.attrs).map((prop) => {
      if (prop.includes('col')) {
        className.push(col(prop, data.attrs[prop]));
      }
      if (prop.includes('order')) {
        className.push(order(prop, data.attrs[prop]));
      }

      return null;
    });
  }

  return className;
};

const orderedChild = (data) => {
  let orderValue = 0;
  let style = {};
  if (data) {
    if (data.style) style = { ...data.style };
    if (data.attrs) {
      if (data.attrs.order) orderValue = data.attrs.order;
    }
  }

  if (orderValue <= 12) return { ...style };

  return {
    ...style,
    ...{ order: orderValue },
  };
};

export default {
  name: 'ViWrapper',
  functional: true,
  mixins: [positioningMixin, scaleMixin],
  props: {
    /**
     * _Tamanho:_ Remove margens dos filhos.
     */
    noMargin: {
      type: Boolean,
      default: false,
    },
    /**
     * Tag principal onde os outros elementos vão dentro.
     */
    tag: {
      type: String,
      default: 'div',
    },
    /**
     * Define se direção do wrap é vertical.
     */
    vertical: {
      type: Boolean,
      default: false,
    },
    /**
     * Define se ordem dos filhos é invertida.
     */
    inverted: {
      type: Boolean,
      default: false,
    },
    /**
     * Define se filhos serão envolvidos em um wrapper filho
     * Sempre `true` quando em modo grid.
     */
    childWrapper: {
      type: Boolean,
      default: false,
    },
    /**
     * Tag usada no wrapper filho. Se `childTag` for null, utiliza o valor da prop `tag`.
     * Só é usado quando `childWrapper` igual `true`.
     */
    childTag: {
      type: String,
      default: null,
    },
    /**
     * Define se blocos precisam ter o mesmo tamanho entre eles.
     * Não funciona quando em modo grid.
     */
    proportionalChild: {
      type: Boolean,
      default: false,
    },
    /**
     * Quando definido, impede os filhos de quebrar a linha  mesmo quando o tamanho mesmo dos filhos exedem o limite da grid.
     * Só é utilizado quando em modo grid.
     */
    noWrap: {
      type: Boolean,
      default: false,
    },
    /**
     * Modo grid permite adicionar colunas para os filhos.
     */
    grid: {
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
    const iteratedChildren = children.map((node) => {
      if (props.childWrapper || props.grid) {
        const newProps = {
          class: addChildClassNames(node.data, props),
        };
        if (props.grid) newProps.style = orderedChild(node.data);

        return createElement(props.childTag || props.tag, newProps, [node]);
      }
      const newNode = node;
      if (!newNode.data) newNode.data = {};
      newNode.data.class = [addChildClassNames(node.data, props)];
      return newNode;
    });

    const newCtx = context.data;
    newCtx.class = [addClassNames(props, newCtx.class)];

    return createElement(props.tag, newCtx, iteratedChildren);
  },
};
</script>

<style lang="stylus">
$justify = 'center' 'start' 'end' 'flex-start' 'flex-end' 'left' 'right' 'baseline' 'stretch'
  'first baseline' 'last baseline' 'space-between' 'space-around' 'space-evenly' 'inherit' 'initial'
  'unset'

$align = 'center' 'start' 'end' 'flex-start' 'flex-end' 'self-start' 'self-end' 'baseline' 'stretch'
  'first baseline' 'last baseline' 'inherit' 'initial' 'unset'

gridPadding($space, $useMargin = false)
  if $useMargin
    & > .contentWrapper
      margin 0 0 0 $space * 2
      &:first-child
        margin-left 0
    &.flexWraper--vertical
      & > .contentWrapper
        margin 0 0 $space * 2
        &:last-child
          margin-bottom 0
  else
    & > .contentWrapper
      margin 0
      padding $space

gridSizes($useMargin = false)
  gridPadding(10px, $useMargin)
  &.flexWraper--mini
    gridPadding(2px, $useMargin)
  &.flexWraper--small
    gridPadding(5px, $useMargin)
  &.flexWraper--large
    gridPadding(20px, $useMargin)
  &.flexWraper--no-margin
    gridPadding(0, true)

mediaQueryInterpolator($size, $max = auto)
  & > .contentWrapper
    for $i in 0..12
      $v = $i || 12
      &.order{$size}--pos{$i || '-default'}
        order $v
      &.col{$size}--size{$i || '-default'}
        flex $v 1 ($v * 8.3%)
        max-width: ($v * 8.3%);

.ViComponent .flexWraper
.flexWraper
  align-items center
  display flex

  & > .contentWrapper
    &--proportional
      flex-grow 1

  &--vertical
    align-items unset
    flex-direction column

  &--inverted
    flex-direction row-reverse
    &^[0]--vertical
      flex-direction column-reverse

  &--justify-content
    for $val in $justify
      &-{replace(' ','-', $val)}
        justify-content unquote($val)
  &--align-items
    for $val in $align
      &-{replace(' ','-', $val)}
        align-items unquote($val)

  &--not-grid
    flex-grow 1
    gridSizes(true)

  &--grid
    justify-content center
    flex-wrap wrap
    gridSizes()

    &^[0]--no-wrap
      flex-wrap nowrap

    /* Columns */
    @media (max-width: 575px)
      mediaQueryInterpolator('Mini')

    @media (min-width: 576px)
      mediaQueryInterpolator('Small', 540px)

    @media (min-width: 768px)
      mediaQueryInterpolator('', 720px)

    @media (min-width: 992px)
      mediaQueryInterpolator('Large', 960px)

    @media (min-width: 1200px)
      mediaQueryInterpolator('Large', 1140px)
</style>

<docs>
O componente ViWrapper é usado para trabalhar com conjunto de componentes.
Ele também pode embrulhar os filhos em uma tag caso necessário.

É recomendao não definir margens no css e usar apenas um wrapper sempre que for trabalhar
com conjunto de componentes.

Use os tamanhos [mini|small|large|no-margin] para definir espaçamento entre componentes ou colunas.

### Exemplo de wrapper

```jsx
<vi-wrapper small align-items="stretch">
    <vi-wrapper small>
      <vi-card primary>1</vi-card>
      <vi-card primary>2</vi-card>
    </vi-wrapper>
    <vi-wrapper vertical small>
      <vi-card primary>3</vi-card>
      <vi-card primary>4</vi-card>
      <vi-card primary>5</vi-card>
    </vi-wrapper>
</vi-wrapper>
```
### Exemplo de wrapper como grid

Use a prop `grid` para definir comportamento de grid.

```jsx
<vi-wrapper vertical mini>
  <vi-wrapper grid small>
    <vi-card col="2" dark>1</vi-card>
    <vi-card col="6" order="2" dark>2</vi-card>
    <vi-card col="4" order="1" dark>3</vi-card>
  </vi-wrapper>
  <vi-wrapper grid small>
    <vi-card col="6" danger>1</vi-card>
    <vi-card col="3" order="1" danger>2</vi-card>
  </vi-wrapper>
  <vi-wrapper break-line grid small>
    <vi-card col="6" success>1</vi-card>
    <vi-card col="3" success>2</vi-card>
    <vi-card col="3" success>3</vi-card>
    <vi-card col="3" success>4</vi-card>
    <vi-card col="3" success>5</vi-card>
    <vi-card col="6" order="1" success>6</vi-card>
    <vi-card col="4" success>7</vi-card>
    <vi-card col="12" success>8</vi-card>
  </vi-wrapper>
</vi-wrapper>
```

#### Tamanhos e colunas no modo grid
<!-- eslint-disable max-len -->
|                    | Mini (`< 576px`) | Small (`=> 576px`) | Medium (`=> 768px`) | large (`=> 992px`) | jumbo (`=> 1200px`) |
|:------------------:|:----------------:|:------------------:|:-------------------:|:------------------:|:-------------------:|
|**largura maxima**  | auto             | 540px              | 720px               | 960px              | 1140px              |
|**total de colunas**| 12               | 12                 | 12                  | 12                 | 12                  |

#### Atributos para colulas no modo grid

| Atributo de colunas | Default | descrição                      |
|:-------------------:|:-------:|:------------------------------:|
| col-mini            | 12      | Coluna `< 576px`               |
| col-small           | 12      | Coluna `=> 576px`              |
| col                 | 12      | Coluna `=> 768px`              |
| col-large           | 12      | Coluna `=> 992px`              |
| col-jumbo           | 12      | Coluna `=> 1200px`             |
| order-mini          | null    | Ordem coluna abaixo de 576px   |
| order-small         | null    | Ordem coluna acima de 576px    |
| order               | null    | Ordem coluna acima de 768px    |
| order-large         | null    | Ordem coluna acima de 992px    |
| order-jumbo         | null    | Ordem coluna acima de 1200px   |
</docs>
