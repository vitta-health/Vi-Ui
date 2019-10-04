<p align="center">
  <img src="https://raw.githubusercontent.com/vitta-health/Vi-Ui/master/docs/assets/vi-ui.svg?sanitize=true" width="120px">
</p>
<h1 align="center">Vi-Ui</h1>
<p align="center">
  <a href="https://david-dm.org/vitta-health/Vi-Ui" title="dependencies status"><img src="https://david-dm.org/vitta-health/Vi-Ui/status.svg"/></a>
  <a href="https://github.com/vitta-health/Vi-Ui/blob/master/LICENSE" title="Licente Mit"><img src="https://img.shields.io/badge/License-MIT-blue.svg"/></a>
</p>

<h2 align="center"><a href="https://vitta-health.github.io/Vi-Ui/">Read the documentation</a></h2>

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

### Import the fonts

Vi-Ui is made to use the fonts Montserrat e Source Sans Pro:

```html static
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500|Source+Sans+Pro:400,400i,700,700i" rel="stylesheet">
```

or use the css import (slower):

```css static
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500|Source+Sans+Pro:400,400i,700,700i');
```

### Apply the Vi-Ui style

Apply the class `ViComponent` to the body for global or where you want to use the Vi-Ui.

### Visual Code extension

You can use the <a href="https://github.com/pablovieiras/viui-vscode">viui-vscode</a> extension to get some snippets and autocomplete when developing something with Vi-Ui.

### Contribution, Feature Resquests and Bug Report

See our <a href="https://github.com/vitta-health/Vi-Ui/issues">issues page</a>.
