<template>
  <vi-wrapper
    mini-spacing
    justify-content="flex-start"
    class="ViComponent ViToggleSwitch"
  >
    <div
      class="ViToggleSwitch__Container"
      :class="[
        {
          'ViToggleSwitch__Container--mini': mini,
          'ViToggleSwitch__Container--small': small,
          'ViToggleSwitch__Container--large': large,
          'ViToggleSwitch__Container--active': isChecked,
        }
      ]"
      @click.self="onClick"
    >
      <div
        class="ViToggleSwitch__Draggable"
        @mousedown.prevent="dragStart"
        @click.self="onClick"
        :style="style"
      />
    </div>
  </vi-wrapper>
</template>


<script>
import ViWrapper from './Wrapper.vue';
import { scaleMixin } from '../mixins/sizes';

export default {
  name: 'ViToggleSwitch',
  components: {
    ViWrapper,
  },
  mixins: [scaleMixin],
  data() {
    return {
      width: 100,
      state: false,
      position: 0,
    };
  },
  props: {
    /**
     * Valor do campo
     * @model
     */
    value: {
      type: Boolean,
      default: null,
    },
  },
  methods: {
    onClick() {
      this.toggle(!this.state);
      this.emit();
    },
    toggle(state) {
      this.state = state;
      this.position = !state ? 0 : 100;
    },
    dragging(e) {
      const pos = e.clientX - this.$el.offsetLeft;
      let percent = pos / this.width * 100;
      percent = percent <= 0 ? 0 : percent;
      percent = percent > 100 ? 100 : percent;
      this.position = percent;
    },
    dragStart() {
      window.addEventListener('mousemove', this.dragging);
      window.addEventListener('mouseup', this.dragStop);
    },
    dragStop() {
      window.removeEventListener('mousemove', this.dragging);
      window.removeEventListener('mouseup', this.dragStop);
      this.toggle(this.position >= 50);
      this.emit();
    },
    emit() {
      this.$emit('input', this.state);
    },
  },
  computed: {
    style() {
      return {
        transform: `translateX(${this.pos_percentage})`,
      };
    },
    pos_percentage() {
      return `${this.position / this.width * 100}%`;
    },
    isChecked() {
      return this.state || this.value === true;
    },
  },
  mounted() {
    this.toggle(this.value);
  },
};
</script>

<style lang="stylus">
@import '../themes/main'

$background-color-off = #fff
$border-color = #eee
$pin-in-color = #fff

.ViToggleSwitch__Container
  background $success
  border 2px solid $border-color
  border-radius 200px
  height 40px
  transition background 0.6s
  width 80px

  &--mini
    height 20px
    width 40px

  &--small
    height 30px
    width 60px

  &--large
    height 52px
    width 104px

  .ViToggleSwitch__Draggable
    background $pin-in-color
    border-radius 100%
    box-shadow 0 3px 10px 0 rgba(0, 0, 0, 0.3), inset -1px 0px 0px 1px rgba(0, 0, 0, 0.08)
    height 99%
    transform translateX(0%)
    transition transform 0.05s ease-in-out
    width 50%

  &--active
    background $background-color-on
    border 2px solid $background-color-on
    transition background 0.6s
</style>

<docs>
### Exemplo toggle Switch

```vue
<template>
  <vi-wrapper
    vertical
    class="ViComponent"
  >
    <vi-toggle-switch v-model="stateNormal" />
    <vi-toggle-switch large v-model="stateLarge" />
    <vi-toggle-switch small v-model="stateSmall" />
    <vi-toggle-switch mini v-model="stateMini" />
    <pre><code>
      State Normal: {{ stateNormal ? 'ativo' : 'inativo' }}
      State Large: {{ stateLarge ? 'ativo' : 'inativo' }}
      State Small: {{ stateSmall ? 'ativo' : 'inativo' }}
      State Mini: {{ stateMini ? 'ativo' : 'inativo' }}
    </code></pre>
  </vi-wrapper>
</template>
<script>
export default {
  data() {
    return {
      stateNormal: true,
      stateLarge: true,
      stateSmall: true,
      stateMini: true,
    };
  }
};
</script>
```

</docs>
