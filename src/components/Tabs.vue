<template>
  <div class="ViTabs">
    <div class="ViTabs__List">
      <hr class="ViTabs__Line" />
      <ul class="TabsList">
        <li
          v-for="(value, key) in listOfTabs"
          :key="key">
          <a
            @click="changeTab(value.tab)"
            :class="{ 'active': value.tab === activeTabProp }">
            {{value.title ? value.title : value.tab}}
          </a>
        </li>
      </ul>
    </div>
    <div class="ViTabs__Content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViTabs',
  data() {
    return {
      activeTabProp: '',
      listOfTabs: [],
    };
  },
  props: {
    /**
     * Define o nome da tab ativa
     */
    activeTab: {
      type: String,
      required: true,
      default: null,
    },
    /**
     * Define o nome da tab ativa
     * @model
     */
    value: {
      type: String,
      default: null,
    },
  },
  methods: {
    changeTab(tab) {
      this.$emit('input', tab);
      this.activeTabProp = tab;
      this.tabsList();
    },
    tabsList() {
      const vm = this;
      const tab = this.activeTabProp;
      this.listOfTabs = [];

      this.$slots.default.map((child) => {
        if(child.tag) {
          child.data.class = [
            'ViTabs__Content',
            {
              active: child.data.attrs.tab === tab,
              inactive: child.data.attrs.tab !== tab,
            },
          ];

          vm.listOfTabs.push(child.data.attrs);
        }

        return null;
      });
    },
  },
  beforeMount() {
    this.activeTabProp = this.activeTab;
    this.tabsList();
  },
};
</script>

<style lang="stylus">
@import '../themes/main'

.ViTabs
  .ViTabs__List
    position relative

    .TabsList
      background-color transparent
      display flex
      height 50px
      list-style none
      margin 0
      margin-bottom 30px
      overflow-y hidden
      padding 0

      li
        padding 0 20px
        text-align center

        &:first-child
          padding-left 0

        a
          align-items center
          border-bottom 3px transparent solid
          color $dark
          cursor pointer
          display flex
          height 50px
          text-decoration none
          transition border-color 0.4s ease-in-out
          white-space nowrap

          &:hover
            border-color $primary
            transition border-color 0.4s ease-in-out

        a.active
          border-color $primary
          color $primary
          font-weight 600

  .ViTabs__Line
    border 2px solid #d2d2d24f
    bottom 0
    margin 0
    position absolute
    width 100%

  .ViTabs__Content
    .active
      display block

    .inactive
      display none
</style>

<docs>
Componente de abas em um card
```vue
<template>
  <vi-card>
    <div slot="body">
      <vi-tabs active-tab="Tab1">
        <div title="Aba 1" tab="Tab1">
          <div>
            Aba 1
            <div>Aba 1.1</div>
          </div>
        </div>
        <div title="Aba 2" tab="Tab2">
          Conteúdo Aba 2
        </div>
        <div title="Aba 3" tab="Tab3">
          Conteúdo Aba 3
        </div>
      </vi-tabs>
    </div>
  </vi-card>
</template>
<script>
export default {
  data() {
    return {
      activeTab: 'Tab1',
    };
  },
};
</script>
```

### Atributos para as abas

| Atributo de colunas | Default | descrição                      |
|:-------------------:|:-------:|:------------------------------:|
| title               |         | Define o título da aba         |
| active              | false   | Define se a aba está ativa     |

</docs>
