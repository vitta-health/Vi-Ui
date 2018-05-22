<template>
  <vi-button-group
    pill
    outlined>
    <vi-button
      title="Primeira Página"
      @on-click="goto('FIRST_PAGE')"
      primary
      :disabled="!buttonEnabled('FIRST_PAGE')">◂◂</vi-button>
    <vi-button
      @on-click="goto('PREVIOUS_PAGE')"
      primary
      :disabled="!buttonEnabled('PREVIOUS_PAGE')">◂</vi-button>
    <vi-button
      primary
      @on-click="goto(index)"
      :disabled="isCurrentPage(index)"
      :selected="isCurrentPage(index)"
      v-for="(page, index) in updateTotalShowed"
      :key="index"
      v-if="index >= (updateTotalShowed - totalShowed)">{{ page }}
    </vi-button>
    <vi-button
      @on-click="goto('NEXT_PAGE')"
      primary
      :disabled="!buttonEnabled('NEXT_PAGE')">▸</vi-button>
    <vi-button
      primary
      title="Última Página"
      @on-click="goto('LAST_PAGE')"
      :disabled="buttonEnabled('LAST_PAGE')">▸▸</vi-button>
  </vi-button-group>
</template>

<script>

import ButtonGroup from './ButtonGroup.vue';

export default {
  name: 'ViPagination',
  components: {
    ButtonGroup,
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
    /**
      * Evento de disparado ao clicar nos botões de navegação da paginação.
      *
      * @event onAtualizaPagina
      * @type {object}
      */
    goto(newPage) {
      let goToPage = newPage;
      const countPages = this.totalPages ? this.totalPages : this.updateTotalShowed;
      if (newPage === 'PREVIOUS_PAGE') {
        goToPage = this.currentPage <= 1 ? 1 : this.currentPage - 1;
      } else if (newPage === 'NEXT_PAGE') {
        goToPage = this.currentPage >= countPages ? countPages : this.currentPage + 1;
      } else if (newPage === 'FIRST_PAGE') {
        goToPage = 1;
      } else if (newPage === 'LAST_PAGE') {
        goToPage = countPages;
      } else {
        goToPage = newPage + 1;
      }
      const baseUrl = this.baseURL ? `${this.baseURL}?page=${goToPage}` : null;
      this.$emit('on-atualiza-pagina', { currentPage: goToPage, baseUrl });
    },
    buttonEnabled(button) {
      if (button === 'LAST_PAGE') {
        return this.currentPage >= this.updateTotalShowed || this.totalPages === 0;
      } else if (button === 'NEXT_PAGE') {
        return this.currentPage < this.updateTotalShowed;
      } else if (button === 'FIRST_PAGE') {
        return this.currentPage <= this.updateTotalShowed && this.currentPage > 1;
      }
      return this.currentPage > 1;
    },
    isCurrentPage(index) {
      return this.currentPage === (index + 1);
    },
  },
  computed: {
    updateTotalShowed() {
      const middle = Math.ceil(this.totalShowed / 2);
      if (this.currentPage < middle) {
        return this.totalShowed;
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
      return last;
    },

  },
};
</script>

<style lang="stylus">
@import '../themes/main';
@import '../themes/colors';

</style>

<docs>
#### Basic Pagination:


```vue
<template>
  <vi-pagination
    :currentPage="currentPage"
    :baseURL="baseURL"
    :totalPages="totalPages"
    :totalShowed="totalShowed"
    @on-atualiza-pagina="page => mudaPagina(page)"/>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 4,
      baseURL:'baseurl.com.br',
      totalPages: 10,
      totalShowed: 5
    };
  },
  methods: {
    mudaPagina(page) {
      this.currentPage = page.currentPage;
    }
  }
};

</script>
```
</docs>
