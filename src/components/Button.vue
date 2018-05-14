<template>
<div class="Button">
	<button class="button"
		@click.prevent="onClick">
		<slot></slot>
	</button>
</div>
</template>

<script>

/**
 * The only true button.
 */
export default {
  name: 'Button',
  props: {
    /**
		 * The color for the button.
		 */
    color: {
      type: String,
      default: '#333',
    },
    /**
		 * The size of the button
		 * `small, normal, large`
		 */
    size: {
      type: String,
      default: 'normal'
    },
    /**
		 * Gets called when the user clicks on the button
		 * @ignore
		 */
    onClick: {
      type: Function,
      default: (event) => {
        console.log('You have clicked me!', event.target);
      },
    },
  },
  computed: {
    fontSize() {
      let size;
      switch (this.size) {
        case 'mini': {
          size = '10px'; break;
        }
        case 'small': {
          size = '12px'; break;
        }
        case 'large': {
          size = '21px'; break;
        }
        default: {
          size = '16px'; break;
        }
      }

      return size;
    },
  },
};
</script>

<style scope>
.button {
	padding: .5em 1.5em;
	color: #666;
	background-color: #fff;
	border: 1px solid currentColor;
	border-radius: .3em;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
}
.checks {
	background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(-45deg, #f5f5f5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f5f5f5 75%), linear-gradient(-45deg, transparent 75%, #f5f5f5 75%);
	background-size: 16px 16px;
	background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
}
</style>

<docs>
Basic button:

```jsx
<Button>Push  e Me</Button>
```

Big pink button:

```jsx
<Button size="large" color="deeppink">Lick Me</Button>
```

And you *can* **use** `any` [Markdown](http://daringfireball.net/projects/markdown/) here.

Fenced code blocks with `vue`, `js`, `jsx` or `javascript` languages are rendered as a interactive playgrounds:

```jsx
<Button>Push Me</Button>
```

You can also use the Single File Component Format

```vue
<template>
    <div class="wrapper">
        <Button @click.native="pushButton">Push Me</Button>
        <hr />
        <p class="text-name">Next Dog Name: {{ dogName }}</p>
    </div>
</template>
<script>
const dogNames = require('dog-names').all;

// You can also use 'exports.default = {}' style module exports.
export default {
	data() {
		return { numClicks: 0, dogName: dogNames[0] };
	},
	methods: {
		pushButton() {
			this.numClicks += 1;
			this.dogName = dogNames[this.numClicks];
		}
	}
}
</script>
<style scoped>
    .wrapper {
      padding: 10px;
    }
    .text-name {
      color: red;
    }
</style>
```
</docs>
