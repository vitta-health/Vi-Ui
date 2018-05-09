Progress circular em loop:

```jsx
<Progress />
``` 

Progress circular dinamico:

```jsx
<Progress percentValue="25" />
``` 

Veja como é facil utilizar

```vue
<template>
    <div>
        <Progress :size="size" :borderSize="border" />
    </div>
</template>
<script>

export default {
    data () {
        return {
            border: 12,
            size: 64,
        }
    }
}
</script>
```
