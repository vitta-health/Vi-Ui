Seu primeiro componente?

### Crie o componente
Coloque o componente colocado na pasta `/src/components`.

### Adicione o import e export
Em `/src/index.js` adicione os código:

```js static
import Exemplo from './components/Exemplo';

export {
  Exemplo,
}
```

### Documente o componente

No seu componente, user **markdown** dentro da tag `<docs></docs>` para descrever sua documentação.

````vue
<docs>
Exemplo:

Componente descrito:
```js
<exemplo></exemplo>
```
</docs>
````
