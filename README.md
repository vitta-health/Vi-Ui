<p align="center">
  <img src="https://github.com/vitta-health/Vi-Ui/blob/master/docs/layout/components/vi-ui.svg" width="120px">
</p>
<h1 align="center">Vi-Ui</h1>

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


## How to use:

```js static
import 'vue-vi-ui/dist/vi-ui.min.css';

import Vue from 'vue';
import ViUi from 'vue-vi-ui';

Vue.use(ViUi);

export default {
  name: 'app',
}
```

### Apply the Vi-Ui style

Apply the class `ViComponent` to the body for global or where you want to use the Vi-Ui.
