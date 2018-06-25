<script>
export default {
  name: 'ViTabs',
  data() {
    return {
      listOfTabs: [],
      listOfContents: [],
    }
  },
  methods: {
    addRemoveClass(element, classAdd, classRemove) {
      if (!element.classList.contains(classAdd)) {
        element.classList.remove(classRemove);
        element.classList.toggle(classAdd);
      }
    },
    createTabList(createElement, attrs, arrayTabs) {
      this.listOfTabs = createElement('ul', attrs, arrayTabs);
      return this.listOfTabs;
    },
    createTabContent(createElement, attrs, arrayContent) {
      this.listOfContents = createElement('div', attrs, arrayContent);
      return this.listOfContents;
    },
    isActiveClass(nodeActive, index, hasActiveTabDefault) {
      return nodeActive === 'true' || (index === 0 && !hasActiveTabDefault);
    },
  },
  render(createElement, context) {
    const self = this;
    let hasActiveTabDefault = false;
    const childrens = this.$slots.default.filter((node) => {
      const nodeItem = node;
      if (!nodeItem.tag && !nodeItem.text) return false;
      if (nodeItem.data && hasActiveTabDefault) nodeItem.data.attrs.active = false;
      if (nodeItem.data && nodeItem.data.attrs.active) hasActiveTabDefault = true;
      return nodeItem.tag;
    });

    const tabsList = [];
    const tabsContent = childrens.map((node, index) => {
      const tabNode = Object.create(node);
      const contentNode = Object.create(node);

      if (node.data) {
        const idContent = `vi-tab${index}`;

        tabNode.tag = 'li';
        tabNode.children = [];
        tabNode.children.push(createElement('a', {
          attrs: { id: `vi-tab${index}-link` },
          class: [{
            'active': self.isActiveClass(node.data.attrs.active, index, hasActiveTabDefault),
            'inactive': !node.data.attrs.active,
          }],
          on: {
            click: function click(elementClicked) {
              self.listOfContents.children.forEach((element) => {
                self.addRemoveClass(element.elm, 'inactive', 'active');
              });

              self.listOfTabs.children.forEach((element) => {
                self.addRemoveClass(element.elm.childNodes[0], 'inactive', 'active');
              });

              self.addRemoveClass(elementClicked.target, 'active', 'inactive');
              self.addRemoveClass(self.$el.querySelector(`#${idContent}`), 'active', 'inactive');
            }
          }
        }, [{ text: node.data.attrs.title }]));

        tabsList.push({ ...tabNode });

        contentNode.data.attrs.id = idContent;
        contentNode.data.class = [{
          'active': self.isActiveClass(node.data.attrs.active, index, hasActiveTabDefault),
          'inactive': !node.data.attrs.active,
        }];

        return contentNode;
      }

      return '';
    });

    return createElement(
      'div', { class: ['ViTabs', 'ViComponent'] },
      [createElement(
        'nav', { class: ['ViTabs__List'] },
        [self.createTabList(createElement, { class: ['TabsList'] }, [tabsList])]
      ), self.createTabContent(createElement, { class: ['ViTabs__Content'] }, [tabsContent])]
    );
  },
};
</script>

<style lang="stylus">
@import '../themes/main'

.ViComponent.ViTabs
  width 100%
  .ViTabs__List
    border-bottom 1px solid lighten($default, 50%)
    height 49px
    margin-bottom 30px
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

  .ViTabs__Content
    .active
      display block

    .inactive
      display none
</style>

<docs>
Card Básico
```jsx
  <vi-card title="Componente de abas">
    <div slot="body">
      <vi-tabs>
        <div title="Aba 1" active="true">
          <div>
            Teste 1
            <div>Teste 1.1</div>
          </div>
        </div>
        <div title="Aba 2">
          <div>Teste 2</div>
        </div>
        <div title="Aba 3" active="true">
          <div>Teste 3</div>
        </div>
      </vi-tabs>
    </div>
  </vi-card>
```

### Atributos para as abas

| Atributo de colunas | Default | descrição                      |
|:-------------------:|:-------:|:------------------------------:|
| title               |         | Define o título da aba         |
| active              | false   | Define se a aba está ativa     |

</docs>
