------

```vue noeditor
<template>
<vi-wrapper class="ViComponent" vertical>
  <p>Exemplos do estilo de texto:</p>
  <h1>Exemplo Heading 1</h1>
  <h2>Exemplo Heading 2</h2>
  <h3>Exemplo Heading 3</h3>
  <h4>Exemplo Heading 4</h4>
  <h5>Exemplo Heading 5</h5>
  <h6>Exemplo Heading 6</h6>
  <p>Paragrafo: In the beginning, after all, were the words, and they came with a tune. That was how the world was made, how the void was divided, how the lands and the stars and the dreams and the little gods and the animals, how all of them came into the world.</p>

  <hr/>

  <h2>Tamanhos e usos de fontes</h2>
  <vi-table
    horizontalBordered
    :columns="cols"
    :items="data">
    <template slot-scope="{ item }">
        <td>{{ item.tag }}</td>
        <td>{{ item.typeface }}</td>
        <td>{{ item.weight }}</td>
        <td>{{ item.size }}</td>
        <td>{{ item.lineHeight }}</td>
        <td>{{ item.letterSpacing }}</td>
    </template>
  </vi-table>
  <hr/>
  <h2>Cores</h2>
  <p>A maioria dos componentes possuem props que definem as cores. Nestes casos basta usar a prop.</p>
  <p>Para utilizar em seus próprios componentes, utilize as classes abaixo:</p>
  <vi-wrapper class="ViComponent ViColorDemo" grid>
    <vi-card
      col="4"
      col-mini="12"
      col-small="6"
      large-spacing
      v-for="(color, key) in colors"
      :default-color="key"
      v-bind="color.prop"
      :key="key"
    >
      <h3>{{ key }} <small v-if="color.usage">({{color.usage}})</small><br/><small>{{color.hex}}</small></h3>
      <h4>Classes:</h4>
      <p><small>
      • ViColor-{{ key }}--text<br/>
      • ViColor-{{ key }}--bg<br/>
      • ViColor-{{ key }}--border<br/>
      • ViColor-{{ key }}--hover
      </small></p>
      </ul>
    </vi-card>
  </vi-wrapper>
</vi-wrapper>
</template>

<script>
export default {
  data() {
    return {
      cols: [
        { label:'Categoria' },
        { label:'Typeface' },
        { label:'Font Weight' },
        { label:'Font Size' },
        { label:'Line Height' },
        { label:'Letter Spacing' },
      ],
      data: [
        { tag: 'Default', typeface:'Source Sans Pro', weight:'400', size:'16px', lineHeight: '1.2em', letterSpacing: '0' },
        { tag: 'H1', typeface:'Montserrat', weight:'400', size:'2em', lineHeight: '0.87em', letterSpacing: '0.01em' },
        { tag: 'H2', typeface:'Montserrat', weight:'400', size:'1.5em', lineHeight: '0.87em', letterSpacing: '0.01em' },
        { tag: 'H3', typeface:'Montserrat', weight:'500', size:'1.2em', lineHeight: '0.87em', letterSpacing: '0.03em' },
        { tag: 'H4', typeface:'Montserrat', weight:'500', size:'1.05em', lineHeight: '0.87em', letterSpacing: '0' },
        { tag: 'H5', typeface:'Montserrat', weight:'500', size:'0.86em', lineHeight: '0.87em', letterSpacing: '0' },
        { tag: 'H6', typeface:'Montserrat', weight:'700', size:'0.75em', lineHeight: '0.87em', letterSpacing: '0' },
        { tag: 'legend', typeface:'Montserrat', weight:'500', size:'1em', lineHeight: '1.2em', letterSpacing: '-0.01em' },
        { tag: 'button', typeface:'Montserrat', weight:'500', size:'1em', lineHeight: '1.2em', letterSpacing: '-0.01em' },
        { tag: 'button-large', typeface:'Montserrat', weight:'500', size:'1em', lineHeight: '1.2em', letterSpacing: '-0.02em' },
        { tag: 'code', typeface:'Monospace', weight:'400', size:'1em', lineHeight: '1.2em', letterSpacing: '0' },
      ],
      colors: {
        default: {
          prop: { default: true },
          hex: '#C4CFDA',
        },
        dark: {
          prop: { dark: true },
          hex: '#55636F',
        },
        grey: {
          prop: { grey: true },
          usage: 'background',
          hex: '#EAEAEA',
        },
        primary: {
          prop: { primary: true },
          hex: '#3581BC',
        },
        secondary: {
          prop: { secondary: true },
          hex: '#1C415E',
        },
        info: {
          prop: { info: true },
          hex: '#3297E6',
        },
        success: {
          prop: { success: true },
          hex: '#28A478',
        },
        warning: {
          prop: { warning: true },
          hex: '#DDC880',
        },
        danger: {
          prop: { danger: true },
          hex: '#E45151',
        },
        light: {
          prop: { light: true },
          hex: '#FFFFFF',
        },
      }
    }
  }
};
</script>

<style scoped>
  .ViCard__Body {
    background: white;
    color: #333;
    padding-top 35px;
  }
</style>
```
