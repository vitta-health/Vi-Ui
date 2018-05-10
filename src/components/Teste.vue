<template>
<div class="Teste">
	<button class="teste"
		@click.prevent="onClick">
		<slot></slot>
	</button>
</div>
</template>

<script>

/**
 * The only true teste.
 */
export default {
	name: 'teste',
	props: {
		/**
		 * The color for the teste.
		 */
		color: {
			type: String,
			default: 'ff0000'
		},
		/**
		 * The size of the teste
		 * `small, normal, large`
		 */
		size: {
			type: String,
			default: 'normal'
		},
		/**
		 * Gets called when the user clicks on the teste
		 * @ignore
		 */
		onClick: {
			type:Function,
			default: (event) => {
				console.log('You have clicked me!', event.target);
			}
		}
	},
	computed: {
		fontSize(){
			let size;
			switch (this.size) {
				case 'small':
					size = '10px';
					break;
				case 'normal':
					size = '14px';
					break;
				case 'large':
					size = '18px';
					break;
			}
			return size;
		}
	}
}
</script>

<style scope>
.teste {
	padding: .5em 1.5em;
	color: #666;
	background-color: #0000ff;
	border: 40px solid currentColor;
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
Basic teste:

```jsx
<teste>Push  e Me</teste>
```

Big pink teste:

```jsx
<teste size="large" color="deeppink">Lick Me</teste>
```

And you *can* **use** `any` [Markdown](http://daringfireball.net/projects/markdown/) here.

Fenced code blocks with `vue`, `js`, `jsx` or `javascript` languages are rendered as a interactive playgrounds:

```jsx
<teste>Push Me</teste>
```

You can also use the Single File Component Format

```vue
<template>
    <div class="wrapper">
        <teste @click.native="pushTeste">Push Me</teste>
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
		pushTeste() {
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
