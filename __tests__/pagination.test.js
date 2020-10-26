import Pagination from '../src/components/Pagination';
import { mount } from '@vue/test-utils';

describe('Pagination', () => {
  let wrapper;

  const SELECTORS = {
    FIRST_PAGE: '.ViPagination__FirstPage',
    PREVIOUS_PAGE: '.ViPagination__PreviousPage',
    LAST_PAGE: '.ViPagination__LastPage',
    NEXT_PAGE: '.ViPagination__NextPage',
    PAGE: number => `.ViPagination__Page[data-page="${number}"]`,
  };

  beforeEach(() => {
    wrapper = null;
  });

  it('Renders all pages links with correct url', () => {
    wrapper = mount(Pagination, {
      propsData: {
        baseURL: '/page/##PAGE##',
        totalPages: 5,
        totalShowed: 5,
        currentPage: 3,
        value: 3,
      },
    });

    const firstPageLink = wrapper.find(SELECTORS.FIRST_PAGE);
    expect(firstPageLink.exists()).toBeTruthy();
    expect(firstPageLink.attributes().href).toBe('/page/1');

    const previousPageLink = wrapper.find(SELECTORS.PREVIOUS_PAGE);
    expect(previousPageLink.exists()).toBeTruthy();
    expect(previousPageLink.attributes().href).toBe('/page/2');

    const nextPage = wrapper.find(SELECTORS.NEXT_PAGE);
    expect(nextPage.exists()).toBeTruthy();
    expect(nextPage.attributes().href).toBe('/page/4');

    const lastPageLink = wrapper.find(SELECTORS.LAST_PAGE);
    expect(lastPageLink.exists()).toBeTruthy();
    expect(lastPageLink.attributes().href).toBe('/page/5');

    [1, 2, 3, 4, 5].forEach(page => {
      const element = wrapper.find(SELECTORS.PAGE(page));
      expect(element.exists()).toBe(true);
      expect(element.text()).toBe(page.toString());
      expect(element.attributes().href).toBe('/page/' + page);
    });
  });

  it('Renders "dot" style', () => {
    wrapper = mount(Pagination, {
      propsData: { dots: true },
    });
    expect(wrapper.find('.ViPagination').classes()).toContain('ViPagination--dots');

    wrapper = mount(Pagination, {
      propsData: { dots: false },
    });
    expect(wrapper.find('.ViPagination').classes()).not.toContain('ViPagination--dots');
  });

  it('Renders "pill" style', () => {
    wrapper = mount(Pagination, {
      propsData: { pill: true },
    });
    expect(wrapper.find('.ViPagination').classes()).toContain('ViButtonGroup--pill');

    wrapper = mount(Pagination, {
      propsData: { pill: false },
    });
    expect(wrapper.find('.ViPagination').classes()).not.toContain('ViButtonGroup--pill');
  });

  it('Hides pages outside visible range', () => {
    wrapper = mount(Pagination, {
      propsData: {
        baseURL: '/page/##PAGE##',
        totalPages: 5,
        totalShowed: 3,
        currentPage: 3,
        value: 3,
      },
    });

    expect(wrapper.find(SELECTORS.FIRST_PAGE).exists()).toBe(true);
    expect(wrapper.find(SELECTORS.PREVIOUS_PAGE).exists()).toBe(true);
    expect(wrapper.find(SELECTORS.NEXT_PAGE).exists()).toBe(true);
    expect(wrapper.find(SELECTORS.LAST_PAGE).exists()).toBe(true);

    [2, 3, 4].forEach(page => {
      expect(wrapper.find(SELECTORS.PAGE(page)).exists()).toBe(true);
    });

    [1, 5].forEach(page => {
      expect(wrapper.find(SELECTORS.PAGE(page)).exists()).toBe(false);
    });
  });

  it('Shows extra pages as disabled links', () => {
    wrapper = mount(Pagination, {
      propsData: {
        totalPages: 2,
        totalShowed: 5,
      },
    });

    expect(wrapper.find(SELECTORS.FIRST_PAGE).exists()).toBe(true);
    expect(wrapper.find(SELECTORS.PREVIOUS_PAGE).exists()).toBe(true);
    expect(wrapper.find(SELECTORS.NEXT_PAGE).exists()).toBe(true);
    expect(wrapper.find(SELECTORS.LAST_PAGE).exists()).toBe(true);

    [1, 2].forEach(page => {
      const pageNode = wrapper.find(SELECTORS.PAGE(page));
      expect(pageNode.exists()).toBe(true);
      expect(pageNode.attributes().disabled).toBe(undefined);
    });

    [3, 4, 5].forEach(page => {
      const pageNode = wrapper.find(SELECTORS.PAGE(page));
      expect(pageNode.exists()).toBe(true);
      expect(pageNode.attributes().disabled).toBe('disabled');
    });
  });
});
