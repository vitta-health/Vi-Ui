<template>
  <label
    :for="id"
    class="ViInput__Label"
    v-if="label"
  >{{ label }}
    <small
      v-if="instruction"
      class="ViInput__Instruction"
    >{{ instruction }}</small>
  </label>
</template>

<script>
export default {
  name: 'ViInputLabel',
  props: {
    label: {
      type: String,
      default: null,
    },
    instruction: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
  },
};
</script>
