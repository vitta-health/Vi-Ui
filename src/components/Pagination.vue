<template>
  <vi-button-group
    :class="[
      'ViPagination',
      {
        'ViPagination--dots': dots,
      }
    ]"
    :pill="!dots && pill"
    :outlined="!dots"
  >
    <vi-button
      title="Primeira Página"
      v-bind="colorsOpt()"
      v-if="!dots"
      @click="handleNavigation('FIRST_PAGE')"
      :default-color="pickDefaultColor"
      :disabled="!buttonEnabled('FIRST_PAGE')"
      :href="!disableHistoryChange ? null : getURL('FIRST_PAGE')"
    >⏮</vi-button>
    <vi-button
      v-bind="colorsOpt()"
      v-if="!dots"
      @click="handleNavigation('PREVIOUS_PAGE')"
      :default-color="pickDefaultColor"
      :disabled="!buttonEnabled('PREVIOUS_PAGE')"
      :href="!disableHistoryChange ? null : getURL('PREVIOUS_PAGE')"
    ><vi-icon name="chevron-prev" /></vi-button>
    <vi-button
      v-bind="colorsOpt()"
      @click="handleNavigation(page)"
      v-for="(page) in getPages"
      :active="isCurrentPage(page)"
      :default-color="pickDefaultColor"
      :key="page"
      :href="!disableHistoryChange ? null : getURL(page)"
    >{{ page }}</vi-button>
    <vi-button
      v-bind="colorsOpt()"
      v-if="!dots"
      @click="handleNavigation('NEXT_PAGE')"
      :default-color="pickDefaultColor"
      :disabled="!buttonEnabled('NEXT_PAGE')"
      :href="!disableHistoryChange ? null : getURL('NEXT_PAGE')"
    ><vi-icon name="chevron-next" /></vi-button>
    <vi-button
      v-bind="colorsOpt()"
      v-if="!dots"
      title="Última Página"
      @click="handleNavigation('LAST_PAGE')"
      :default-color="pickDefaultColor"
      :disabled="!buttonEnabled('LAST_PAGE')"
      :href="!disableHistoryChange ? null : getURL('LAST_PAGE')"
    >⏭</vi-button>
  </vi-button-group>
</template>

<script>
import ViButtonGroup from './ButtonGroup.vue';
import ViButton from './Button.vue';
import colorsMixin from '../mixins/colors';

export default {
  name: 'ViPagination',
  components: {
    ViButtonGroup,
    ViButton,
  },
  mixins: [colorsMixin],
  props: {
    /**
     * Página atual.
     * @model
     */
    value: {
      type: Number,
      default: 1,
    },
    /**
     * Define paginação com estilo pílula.
     */
    pill: {
      type: Boolean,
      default: false,
    },
    /**
     * Define paginação com estilo dot.
     */
    dots: {
      type: Boolean,
      default: false,
    },
    /**
     * Url para ser composta. ex: exemplo?page=##PAGE##
     */
    baseURL: {
      default: null,
    },
    /**
     * Por padrão o endereço é alterado usando [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API), essa prop desabilita esse comportamento colocando o href direto nos botões.
     */
    disableHistoryChange: {
      type: Boolean,
      default: false,
    },
    /**
     * Total de páginas
     */
    totalPages: {
      type: Number,
      default: 0,
    },
    /**
     * Total de páginas exibidas por vez.
     */
    totalShowed: {
      type: Number,
      default: 5,
    },
  },
  methods: {
    buttonEnabled(button) {
      switch (button) {
        case 'LAST_PAGE': return this.totalPages > 0 && this.value < this.totalPages;
        case 'NEXT_PAGE': return this.value < this.totalPages || this.totalPages === 0;
        case 'FIRST_PAGE':
        default: return this.value > 1;
      }
    },
    getPage(newPage) {
      if (!Number(newPage)) return 1;

      const countPages = this.totalPages || this.getPagesRange[1];
      switch (newPage) {
        case 'PREVIOUS_PAGE': return this.value <= 1 ? 1 : this.value - 1;
        case 'NEXT_PAGE': return this.value >= countPages ? countPages : this.value + 1;
        case 'FIRST_PAGE': return 1;
        case 'LAST_PAGE': return countPages;
        default: return newPage;
      }
    },
    handleNavigation(page, redirect  = true) {
      const pageNumber = this.getPage(page);
      /**
         * Evento disparado na seleção da página
         * @event input
         * @type {number}
       */
      this.$emit('input', pageNumber);
      if (this.baseURL, redirect) this.changeUrl(pageNumber);
    },
    isCurrentPage(page) {
      return this.value === page;
    },
    getURL(page) {
      const parsedBaseUrl = this.baseURL.replace('##PAGE##', this.getPage(page));
      return `${this.rootUrl}${parsedBaseUrl}`;
    },
    changeUrl(pageNumber) {
      if (this.disableHistoryChange) {
        window.location.href = this.getURL(pageNumber);
      } else {
        history.pushState(null, null, this.getURL(pageNumber));
      }
    },
    startPage() {
      if (!this.baseURL && this.value <= 1) return;
      const matchBase = window.location.href.match(this.baseRegEx);
      if (matchBase) {
        const matchNumber = Number(matchBase[0].match(/\d+/)[0]);
        this.handleNavigation(matchNumber, false);
      }
    },
  },
  computed: {
    baseRegEx() {
      if (!this.baseURL) return null;
      return new RegExp(this.baseURL.replace('##PAGE##', '\\d+'), 'g');
    },
    rootUrl() {
      if (!this.baseURL && !this.baseRegEx) return window.location.href;
      return window.location.href.replace(this.baseRegEx,'');
    },
    pickDefaultColor() {
      return this.dots ? 'dark' : 'primary';
    },
    getPagesRange() {
      const middle = Math.ceil(this.totalShowed / 2);
      if (this.value < middle) {
        return [1, this.totalShowed];
      }
      let countPages = 0;
      const diff = this.value - middle;
      let first = 1 + diff;
      let last = this.totalShowed + diff;
      countPages = this.totalPages || last;
      if (last > countPages) {
        first -= (last - countPages);
        last -= (last - countPages);
      }
      return [first, last];
    },
    getPages() {
      const [first, last] = this.getPagesRange;
      const pages = [];
      for (let i = first; i <= last; i += 1) {
        pages.push(i);
      }
      return pages;
    },
  },
  mounted() {
    this.startPage();
  },
};
</script>

<style lang="stylus">
.ViComponent.ViPagination
  &--dots
    &.ViButtonGroup
      align-items center
      height 20px
      .ViButton
        &
        &:first-child
        &:last-child
          width 0
          height 0
          min-width 0
          min-height 0
          padding 0
          margin 0 0.5em
          overflow hidden
          white-space nowrap
          border-width 0.4em
          border-radius 100px
          transition all 0.1s ease-out
          opacity 0.45

          &.ViButton--active
            opacity 1
            border-width 0.5em

</style>

<docs>
#### Exemplos de paginação:

```vue
<template>
  <vi-wrapper id="pagination" class="ViComponent" vertical>
    <h4>Normal</h4>
  <vi-pagination
      pill
    :baseURL="baseURL"
    :totalPages="totalPages"
    :totalShowed="totalShowed"
      v-model="currentPage"
    />
    <hr/>
    <h4>Dot</h4>
    <vi-pagination
      dots
      dark
      :value="currentPage >= 5 ? 5 : currentPage"
      :totalPages="5"
      :totalShowed="5"
      @input="(value) => { this.currentPage = value; }"
    />
  </vi-wrapper>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      baseURL:'&page=##PAGE##',
      totalPages: 10,
      totalShowed: 5
    };
  }
};

</script>
```
</docs>
