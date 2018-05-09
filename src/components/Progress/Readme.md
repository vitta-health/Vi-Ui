Progress circular em loop:

```jsx
<Progress size="small" />
``` 

Progress circular dinamico:

```jsx
<Progress percentValue="25" />
``` 

Veja como é facil utilizar

```vue
<template>
    <div>
        <Progress :size="size"/>
    </div>
</template>
<script>

export default {
    data () {
        return {
            size: "medium",
        }
    }
}
</script>
```
