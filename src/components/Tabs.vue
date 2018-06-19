<script>
function toggleClass(element, classAdd, classRemove) {
  if (!element.classList.contains(classAdd)) {
    element.classList.remove(classRemove);
    element.classList.toggle(classAdd);
  }
}

function tabActive(nodeActive, index, hasActiveTabDefault) {
  if (nodeActive === 'true') {
    return 'active';
  }
  return index === 0 && !hasActiveTabDefault ? 'active' : 'inactive';
}

export default {
  name: 'ViTabs',
  functional: true,
  props: {
    /**
     * Define título da aba
     */
    title: {
      type: String,
      default: 'Aba',
    },
    /**
     * Define a aba ativa
     */
    active: {
      type: Boolean,
      default: false,
    },
  },
  render(createElement, context) {
    let hasActiveTabDefault = false;
    const childrens = context.children.filter((node) => {
      if (!node.tag && !node.text) return false;
      if (node.data && node.data.attrs.active) hasActiveTabDefault = true;
      return node.tag;
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
          staticClass: tabActive(node.data.attrs.active, index, hasActiveTabDefault),
          on: {
            click: function click() {
              const listTabs = [...document.getElementsByClassName('TabsList')[0].childNodes];
              const listContents = [...document.getElementsByClassName('ViTabs__Content')[0].childNodes];
              listContents.forEach((element) => {
                toggleClass(element, 'inactive', 'active');
              });

              listTabs.forEach((element) => {
                toggleClass(element.childNodes[0], 'inactive', 'active');
              });

              const elementTab = document.getElementById(`${idContent}-link`);
              const elementContent = document.getElementById(idContent);
              toggleClass(elementTab, 'active', 'inactive');
              toggleClass(elementContent, 'active', 'inactive');
            }
          }
        }, [{ text: node.data.attrs.title }]));

        tabsList.push({ ...tabNode });

        contentNode.data.attrs.id = idContent;
        contentNode.data.staticClass =
          tabActive(node.data.attrs.active, index, hasActiveTabDefault);
      }

      return contentNode;
    });

    return createElement(
      'div', { class: ['ViTabs'] },
      [createElement(
        'nav', { class: ['ViTabs__List'] },
        [createElement('ul', { class: ['TabsList'] }, [tabsList])]
      ), createElement('div', { class: ['ViTabs__Content'] }, [tabsContent])]
    );
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
            border-color #3581bc
            transition border-color 0.4s ease-in-out

        a.active
          border-color #3581bc
          color #3581bc
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
  <vi-card title="Componentes de abas">
    <div slot="body">
      <vi-tabs>
        <div title="Aba 1">
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
</docs>
