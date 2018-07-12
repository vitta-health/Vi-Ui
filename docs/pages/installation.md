------

## Instalação:

Use o NPM:

```html static
npm install --save vue-vi-ui
```

Ou a CDN:
```html static
<script src="https://unpkg.com/vue-vi-ui/dist/vi-ui.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/vue-vi-ui/dist/vi-ui.min.css">
```

## Utilização

```js static
import 'vue-vi-ui/dist/vi-ui.min.css';

import Vue from 'vue';
import ViUi from 'vue-vi-ui';

Vue.use(ViUi);

export default {
  name: 'app',
}
```

### Importar as fonts

Vi-Ui é feito com as fonts Montserrat e Source Sans Pro:

```html static
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500|Source+Sans+Pro:400,400i,700,700i" rel="stylesheet">
```

O use css import (mais lento):

```css static
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500|Source+Sans+Pro:400,400i,700,700i');
```

## Aplicando estilos padrões do Vi-Ui

Aplique os padrões de estilo do Vi-Ui colocando a classe `ViComponent` no body ou o bloco onde eles são desejados. Componentes com exceção do `vi-wrapper` já apresentam esse estilo.
