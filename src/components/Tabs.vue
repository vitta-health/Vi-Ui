<script>
export default {
  name: 'ViTabs',
  data() {
    return {
      currentTab: null,
    }
  },
  props: {
    /**
     * Controle da aba aberta. Na aba use o atributo `tab` como identificador.
     * @model
     */
    value: {
      type: String,
      default: null,
    },
  },
  methods: {
    selectTab(tab) {
      this.currentTab = tab;
      this.$emit('input', this.currentTab);
    },
    isTabActive(tab) {
      if (!this.currentTab) this.currentTab = tab;
      return this.currentTab === tab;
    },
    tabTitle(node, index) {
      const dataPath = this.testPath('data.attrs.title', node);
      if (dataPath) return dataPath;

      const propPath = this.testPath('componentOptions.propsData.title', node);
      if (propPath) return propPath;

      return `Aba ${index}`;
    },
    testPath(path, node) {
      return  path.split('.').reduce((obj, key, i, arr) => {
        if (!obj) arr.splice(i-1);
        return obj ? obj[key] : obj;
      }, node);
    },
  },
  watch: {
    value(v) {
      this.currentTab = v;
    }
  },
  mounted() {
    if(this.value) this.currentTab = this.value;
  },
  render(createElement) {
    const self = this;
    const childrens = this.$slots.default.filter((node) => {
      if (!node.tag && !node.text) return false;
      return true;
    });

    let tabIndex = 0;
    const tabsList = [];
    const tabsContent = []
    childrens.map((node, index) => {
      const tabNode = Object.create(node);
      const contentNode = Object.create(node);

      if (node.data) {
        tabIndex += 1;
        let tabId = `tab${tabIndex}`;
        if(self.testPath('data.attrs.tab', node)) tabId = node.data.attrs.tabid;

        tabNode.tag = 'li';
        tabNode.children = [];
        tabNode.children.push(createElement('a', {
          class: [
            'ViTabs__Link',
            {
              'ViTabs__Link--active': self.isTabActive(tabId),
              'ViTabs__Link--inactive': !self.isTabActive(tabId),
            }
          ],
          on: {
            click: (elementClicked) => {
              self.selectTab(tabId);
            }
          }
        }, [{ text: self.tabTitle(node, tabIndex) }]));

        contentNode.data.class = [
          'ViTabs__Tab',
          {
            'ViTabs__Tab--active': self.isTabActive(tabId),
            'ViTabs__Tab--inactive': !self.isTabActive(tabId),
          }
        ];

        tabsList.push({ ...tabNode });
        tabsContent.push(contentNode);
      }
      return null;
    });

    const tabsListCreate = createElement('ul', { class: ['ViTabs__List'] }, [tabsList])

    return createElement(
      'div', { class: ['ViTabs', 'ViComponent'] },
      [
        createElement('nav', { class: ['ViTabs__Nav'] }, [tabsListCreate]),
        createElement('div', { class: ['ViTabs__Content'] }, [tabsContent]),
      ]
    );
  },
};
</script>

<style lang="stylus">
@import '../themes/main'

.ViComponent.ViTabs
  width 100%
  .ViTabs__Nav
    border-bottom 1px solid rgba(black, 0.1)
    height 49px
    margin-bottom 30px
    position relative

    .ViTabs__List
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

        .ViTabs__Link
          align-items center
          border-bottom 3px transparent solid
          color $dark
          cursor pointer
          display flex
          height 50px
          text-decoration none
          transition border-color 0.1s ease-in-out
          white-space nowrap

          &:focus
            border-color $primary

          &:hover
            border-color $dark
            color $dark

          &--active
            border-color $primary
            color $primary
            font-weight 700

  .ViTabs__Content
    .ViTabs__Tab
      display none
      &--active
        display block
</style>

<docs>
### Exemplo de tabs

```vue
<template>
  <vi-wrapper class="ViComponent ViTabsDemo">
      <vi-tabs v-model="tab">
        <vi-card :title-size="3" tabid="tab1" title="Exemplo 1">
          <p>In the beginning, after all, were the words, and they came with a tune. That was how the world was made, how the void was divided, how the lands and the stars and the dreams and the little gods and the animals, how all of them came into the world.</p>
        </vi-card>
        <vi-card  :title-size="3" tabid="tab2" title="Exemplo 2">
          <p>The great beasts were sung into existence, after the Singer had done with the planets and the hills and the trees and the oceans and the lesser beasts. The cliffs that bound existence were sung, and the hunting grounds, and the dark. Songs remain. They last. The right song can turn an emperor into a laughingstock, can bring down dynasties. A song can last long after the events and the people in it are dust and dreams and gone. That’s the power of songs. There are other things you can do with songs. They do not only make worlds or recreate existence. Fat Charlie Nancy’s father, for example, was simply using them to have what he hoped and expected would be a marvelous night out.</p>
        </vi-card>
        <vi-card  :title-size="3" tabid="tab3" title="Exemplo 3">
          <p>Before Fat Charlie’s father had come into the bar, the barman had been of the opinion that the whole karaoke evening was going to be an utter bust; but then the little old man had sashayed into the room, walked past the table of several blonde women with the fresh sunburns and smiles of tourists, who were sitting by the little makeshift stage in the corner. He had tipped his hat to them, for he wore a hat, a spotless green fedora, and lemon-yellow gloves, and then he walked over to their table. They giggled.</p>
        </vi-card>
      </vi-tabs>
  </vi-wrapper>
</template>
<script>
export default {
  data() {
    return {
      tab: 'tab2',
    };
  },
};
</script>
<style>
.ViTabsDemo {
  background: #EAEAEA;
  padding: 20px;
}
</style>

```

### Atributos para as abas

| Atributo de colunas | Default | descrição              |
|:-------------------:|:-------:|:----------------------:|
| title               |         | Define o título da aba |
| tab                 |         | Identificador da aba   |

Obs: Se nenhum identificador `tab` for definido, ele é criado automaticamente.
</docs>
