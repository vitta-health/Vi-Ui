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
import { ViButton } from 'vue-vi-ui';

export default {
  name: 'app',
  components: {
    ViButton,
  }
}
```

## Aplicando estilos padrões do Vi-Ui

Aplique os padrões de estilo do Vi-Ui colocando a classe `ViComponent` no body ou o bloco onde eles são desejados. Componentes com exceção do `vi-wrapper` já apresentam esse estilo.
