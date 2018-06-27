<p align="center">
  <img src="https://github.com/vitta-health/Vi-Ui/blob/master/docs/layout/components/vi-ui.svg" width="100px">
  # Vi-Ui
</p>

## Install:

Using NPM:

```html static
npm install --save vue-vi-ui
```

Or the CDN:
```html static
<script src="https://unpkg.com/vue-vi-ui/dist/vi-ui.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/vue-vi-ui/dist/vi-ui.min.css">
```
<h1 align="center">Vi-Ui</h1>


## How to use

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

### Apply the Vi-Ui style

Apply the class `ViComponent` to the body for global or where you want to use the Vi-Ui.
