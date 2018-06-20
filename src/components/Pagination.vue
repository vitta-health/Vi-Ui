<template>
  <vi-button-group
    pill
    primary
    outlined>
    <vi-button
      title="Primeira Página"
      primary
      @click="handleNavitation('FIRST_PAGE')"
      :href="getURL('FIRST_PAGE')"
      :disabled="!buttonEnabled('FIRST_PAGE')">⏮</vi-button>
    <vi-button
      primary
      @click="handleNavitation('PREVIOUS_PAGE')"
      :href="getURL('PREVIOUS_PAGE')"
      :disabled="!buttonEnabled('PREVIOUS_PAGE')"><vi-icon name="chevron-prev" /></vi-button>
    <vi-button
      primary
      :href="getURL(page)"
      @click="handleNavitation(page)"
      :active="isCurrentPage(page)"
      v-for="(page) in getPages"
      :key="page">{{ page }}
    </vi-button>
    <vi-button
      primary
      @click="handleNavitation('NEXT_PAGE')"
      :href="getURL('NEXT_PAGE')"
      :disabled="!buttonEnabled('NEXT_PAGE')"><vi-icon name="chevron-next" /></vi-button>
    <vi-button
      primary
      title="Última Página"
      @click="handleNavitation('LAST_PAGE')"
      :href="getURL('LAST_PAGE')"
      :disabled="!buttonEnabled('LAST_PAGE')">⏭</vi-button>
  </vi-button-group>
</template>

<script>
import ViButtonGroup from './ButtonGroup.vue';
import ViButton from './Button.vue';

export default {
  name: 'ViPagination',
  components: {
    ViButtonGroup,
    ViButton,
  },
  props: {
    /**
     * Página atual.
     */
    currentPage: {
      type: Number,
      default: 1,
    },
    /**
     * Url para ser composta ex: exemplo?page=##PAGE##
     */
    baseURL: {
      type: String,
      default: null,
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
    getPage(newPage) {
      let goToPage = newPage;
      const countPages = this.totalPages ? this.totalPages : this.getPagesRange[1];
      if (newPage === 'PREVIOUS_PAGE') {
        goToPage = this.currentPage <= 1 ? 1 : this.currentPage - 1;
      } else if (newPage === 'NEXT_PAGE') {
        goToPage = this.currentPage >= countPages ? countPages : this.currentPage + 1;
      } else if (newPage === 'FIRST_PAGE') {
        goToPage = 1;
      } else if (newPage === 'LAST_PAGE') {
        goToPage = countPages;
      }
      return goToPage;
    },
    getURL(page) {
      return this.baseURL ? this.baseURL.replace('##PAGE##', this.getPage(page)) : null;
    },
    /**
     * Evento disparado ao clicar na navegação
     * @event onChangePage
     * @type {object}
     */
    handleNavitation(page) {
      this.$emit('on-change-page', { page: this.getPage(page) });
    },
    buttonEnabled(button) {
      if (button === 'LAST_PAGE') {
        return this.totalPages > 0 && this.currentPage < this.totalPages;
      } else if (button === 'NEXT_PAGE') {
        return this.currentPage < this.totalPages || this.totalPages === 0;
      } else if (button === 'FIRST_PAGE') {
        return this.currentPage > 1;
      }
      return this.currentPage > 1;
    },
    isCurrentPage(page) {
      return this.currentPage === page;
    },
  },
  computed: {
    getPagesRange() {
      const middle = Math.ceil(this.totalShowed / 2);
      if (this.currentPage < middle) {
        return [1, this.totalShowed];
      }
      let countPages = 0;
      const diff = this.currentPage - middle;
      let first = 1 + diff;
      let last = this.totalShowed + diff;
      countPages = this.totalPages ? this.totalPages : last;
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
};
</script>

<docs>
#### Basic Pagination:


```vue
<template>
  <vi-pagination
    :currentPage="currentPage"
    :baseURL="baseURL"
    :totalPages="totalPages"
    :totalShowed="totalShowed"
    @on-change-page="page => mudaPagina(page)"/>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 3,
      baseURL:'/#pagination?page=##PAGE##',
      totalPages: 10,
      totalShowed: 5
    };
  },
  methods: {
    mudaPagina(page) {
      this.currentPage = page.page;
    }
  }
};

</script>
```
</docs>
