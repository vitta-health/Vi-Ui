<script>
import positioningMixin from '../mixins/positioning';

const justify = value => `flexWrapper--justify-content-${value}`;
const align = value => `flexWrapper--align-items-${value}`;

const addClassNames = (props, classesToMerge) => {
  const className = ['flexWrapper'];
  if (classesToMerge) className.push(classesToMerge);
  if (props.justifyContent) className.push(justify(props.justifyContent));
  if (props.alignItems) className.push(align(props.alignItems));

  className.push({
    'flexWrapper--vertical': props.vertical,
    'flexWrapper--inverted': props.inverted,
    'flexWrapper--child-wrapper': props.childWrapper || props.grid,
    'flexWrapper--no-wrap': props.noWrap && props.grid,
    'flexWrapper--not-grid': !props.grid,
    'flexWrapper--grid': props.grid,
    'flexWrapper--mini': props.miniSpacing,
    'flexWrapper--small': props.smallSpacing,
    'flexWrapper--large': props.largeSpacing,
    'flexWrapper--no-spacing': props.noSpacing,
    'flexWrapper--parent-spacing': props.parentSpacing,
  });

  return className;
};

const kebabToCamelCase = str => str.replace(/-[a-z]/, l => l[1].toUpperCase());
const col = (size, value) => `${kebabToCamelCase(size)}--size${value || '-default'}`;
const order = (size, value) => `${kebabToCamelCase(size)}--pos${value}`;

const addChildClassNames = (data, { grid }) => {
  const className = ['contentWrapper'];

  if (!data) return className;
  if (data.class) className.push(data.class);

  if (grid) {
    if (!data.attrs) return className;
    const attrs = Object.keys(data.attrs);

    attrs.map(prop => {
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

export default {
  name: 'ViWrapper',
  functional: true,
  mixins: [positioningMixin],
  props: {
    /**
     * _Espaçamento:_ Define o menor espaçamento entre filhos.
     */
    miniSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Espaçamento:_ Define o espaçamento entre filhos.
     */
    smallSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Espaçamento:_ Define o maior espaçamento entre filhos.
     */
    largeSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Espaçamento:_ Remove espaçamento espaçamento entre filhos.
     */
    noSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * _Espaçamento:_ Adiciona espaçamento no componente wrapper em volta dos filhos.
     * O espaçamento é do mesmo tamanho do espaçamento dos filhos.
     */
    parentSpacing: {
      type: Boolean,
      default: false,
    },
    /**
     * Modo grid permite adicionar colunas para os filhos. Para melhor
     * entendimento, veja o [exemplo](#AnchorForGridDoc).
     */
    grid: {
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
     * Só é utilizado quando `childWrapper` igual `true`.
     */
    childTag: {
      type: String,
      default: null,
    },
    /**
     * Quando definido, impede os filhos de quebrarem a linha mesmo quando o tamanho dos filhos
     * excedem o limite da grid. Só é utilizado quando em modo grid.
     */
    noWrap: {
      type: Boolean,
      default: false,
    },
  },
  render(createElement, context) {
    const children = (context.children || []).filter(node => {
      if (!node.tag && !node.text) return false;
      return node.tag || node.text.replace(/[\s\n]/g, '');
    });
    if (children.length === 0) return null;
    const { props } = context;
    const iteratedChildren = children.map(node => {
      if (props.childWrapper || props.grid) {
        const newProps = {
          class: addChildClassNames(node.data, props),
        };

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
$justify = 'center', 'start', 'end', 'flex-start', 'flex-end', 'left', 'right', 'baseline', 'stretch', 'first baseline', 'last baseline', 'space-between', 'space-around', 'space-evenly', 'inherit', 'initial', 'unset'
$align = 'center', 'start', 'end', 'flex-start', 'flex-end', 'self-start', 'self-end', 'baseline', 'stretch', 'first baseline', 'last baseline', 'inherit', 'initial', 'unset'

gridPadding($space, $useMargin = false)
  &.flexWrapper--parent-spacing
    padding $space * 2

  if ($useMargin)
    & > .contentWrapper
      margin 0 0 0 $space * 2

      &:first-child
        margin-left 0

    &.flexWrapper--vertical
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

  &.flexWrapper--mini
    gridPadding(2px, $useMargin)

  &.flexWrapper--small
    gridPadding(5px, $useMargin)

  &.flexWrapper--large
    gridPadding(20px, $useMargin)

  &.flexWrapper--jumbo
    gridPadding(40px, $useMargin)

  &.flexWrapper--no-spacing
    gridPadding(0, false)

mediaQueryInterpolator($size, $max = auto)
  & > .contentWrapper
    for $i in 0 .. 12
      $v = $i || 12

      &.col{$size}--size{$i || '-default'}
        flex $v 1 ($v * 8.3333%)
        max-width ($v * 8.3333%)

    for $i in 0 .. 50
      &.order{$size}--pos{$i}
        order $i

.flexWrapper
  display flex
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
      &-{replace(' ', '-', $val)}
        justify-content unquote($val)

  &--align-items
    for $val in $align
      &-{replace(' ', '-', $val)}
        align-items unquote($val)

  &--not-grid
    gridSizes(true)

  &--grid
    flex-wrap wrap
    gridSizes()

    & > .contentWrapper
      flex-grow 1
      order 51

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
      mediaQueryInterpolator('Jumbo', 1140px)
</style>

<docs>
O componente ViWrapper é usado para trabalhar com conjunto de componentes.
Ele também pode embrulhar os filhos em uma tag caso necessário.

É recomendado não colocar margens diretamente pelo css. Use um wrapper sempre que precisar definir
um espaçamento entre componentes. As opções de espaçamento  são
[mini-spacing|small-spacing|large-spacing|no-spacing].

### Exemplo de wrapper

```jsx
<vi-wrapper small-spacing align-items="stretch" class="ViComponent">
    <vi-wrapper small-spacing align-items="stretch">
      <vi-card dark>1</vi-card>
      <vi-card dark>2</vi-card>
    </vi-wrapper>
    <vi-wrapper vertical small-spacing>
      <vi-card dark>3</vi-card>
      <vi-card dark>4</vi-card>
      <vi-card dark>5</vi-card>
    </vi-wrapper>
</vi-wrapper>
```
### Exemplo de wrapper como grid

Use a prop `grid` para definir comportamento de grid.
Qualquer filho sem ordem fica na posição 51 por padrão.

```jsx
<vi-wrapper no-spacing grid align-items="stretch" class="ViComponent">
  <vi-wrapper grid small-spacing col-large="6" col-jumbo="3" align-items="flex-end">
    <vi-card col="5" col-jumbo="3" order-jumbo="0" primary>1</vi-card>
    <vi-card col="7" col-jumbo="6" order-jumbo="1"primary>2</vi-card>
    <vi-card col="7" col-jumbo="6" primary>3</vi-card>
    <vi-card col="5" col-jumbo="3" order-jumbo="2" primary>4</vi-card>
  </vi-wrapper>
  <vi-wrapper grid small-spacing col-large="6" col-jumbo="3" align-items="stretch">
    <vi-card col="6" info>1</vi-card>
    <vi-card col="6" order="1" info>2</vi-card>
    <vi-card col="6" info>3</vi-card>
    <vi-card col="6" info>4</vi-card>
  </vi-wrapper>
    <vi-wrapper grid small-spacing col="12" col-jumbo="6">
    <vi-card col="6" secondary>1</vi-card>
    <vi-card col="7" secondary order="1">2</vi-card>
    <vi-card col="3" secondary>3</vi-card>
    <vi-card col="3" secondary>4</vi-card>
    <vi-card col="3" secondary>5</vi-card>
    <vi-card col="5" secondary order="2">6</vi-card>
    <vi-card col="4" secondary>7</vi-card>
    <vi-card col="12" order="0" secondary>8</vi-card>
  </vi-wrapper>
</vi-wrapper>
```

#### Tamanhos e colunas no modo grid
<div id="AnchorForGridDoc"></div>

Medidas (`px`)     |Mini (`<576`)|Small (`>=576`)|Medium (`>=768`)|Large (`>=992`)|Jumbo (`>=1200`)
------------------:|:-----------:|:-------------:|:--------------:|:-------------:|:---------------
**largura maxima** | auto        | 540px         | 720px          | 960px         | 1140px
**# de colunas**   | 12          | 12            | 12             | 12            | 12

#### Atributos para coluna no modo grid

| Atributo de colunas | Default | descrição                             |
|:-------------------:|:-------:|:-------------------------------------:|
| **Colunas**         |         |                                       |
| col-mini            | 12      | Coluna se resolução `< 576px`         |
| col-small           | 12      | Coluna se resolução `>= 576px`        |
| col                 | 12      | Coluna se resolução `>= 768px`        |
| col-large           | 12      | Coluna se resolução `>= 992px`        |
| col-jumbo           | 12      | Coluna se resolução `>= 1200px`       |
| **Ordenação**       |         |                                       |
| order-mini          | null    | Ordem coluna se resolução `< 576px`   |
| order-small         | null    | Ordem coluna se resolução `>= 576px`  |
| order               | null    | Ordem coluna se resolução `>= 768px`  |
| order-large         | null    | Ordem coluna se resolução `>= 992px`  |
| order-jumbo         | null    | Ordem coluna se resolução `>= 1200px` |

Todo filho não posicionado fica na posição 51, qualquer como posição definida
</docs>
