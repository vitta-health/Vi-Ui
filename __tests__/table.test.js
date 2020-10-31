import Table from '../src/components/Table';
import { mount } from '@vue/test-utils';

describe('Table', () => {
  it('Renders simple table with data and columns', () => {
    const columns = [{ id: 'login', label: 'Login' }, { id: 'name', label: 'Name' }];
    const items = [
      { login: 'peter', name: 'Peter Griffin' },
      { login: 'brian', name: 'Brian Griffin' },
    ];
    const wrapper = mount(Table, {
      propsData: { columns, items },
    });

    const table = wrapper.find('.ViTable');
    expect(table.exists()).toBe(true);

    const headers = wrapper.findAll('thead th');
    expect(headers.length).toBe(columns.length);

    columns.forEach((column, index) => {
      const header = headers.at(index);
      expect(header.text()).toBe(column.label);
    });

    const dataRows = wrapper.findAll('tbody tr');
    expect(dataRows.length).toBe(items.length);
    items.forEach((item, index) => {
      const tds = dataRows.at(index).findAll('td');
      expect(tds.at(0).text()).toBe(item.login);
      expect(tds.at(1).text()).toBe(item.name);
    });
  });

  it('Renders with checkbox', () => {
    const columns = [{ id: 'login', label: 'Login' }, { id: 'name', label: 'Name' }];
    const items = [
      { login: 'peter', name: 'Peter Griffin' },
      { login: 'brian', name: 'Brian Griffin' },
    ];
    const wrapper = mount(Table, {
      propsData: { columns, items, checkbox: true },
    });

    expect(wrapper.findAll('thead th').length).toBe(3);
    expect(wrapper.find('thead th input[type=checkbox]').exists()).toBe(true);

    const dataRows = wrapper.findAll('tbody tr');
    items.forEach((item, index) => {
      const tds = dataRows.at(index).findAll('td');
      expect(tds.length).toBe(3);
      expect(tds.at(0).find('input[type=checkbox]').exists()).toBe(true);
    });
  });

  it('Renders with sort column and direction', () => {
    const columns = [{ id: 'login', label: 'Login', sortable: true }, { id: 'name', label: 'Name', sortable: true }];
    const items = [
      { login: 'peter', name: 'Peter Griffin' },
      { login: 'brian', name: 'Brian Griffin' },
    ];
    const wrapper = mount(Table, {
      propsData: { columns, items, sortedColumn: 'login', sortedDirection: 'asc' },
    });

    const headers = wrapper.findAll('thead th');
    headers.wrappers.forEach(header => {
      expect(header.find('.ViTable__Arrows').exists()).toBe(true);
      expect(header.find('.ViTable__ArrowUp').exists()).toBe(true);
      expect(header.find('.ViTable__ArrowDown').exists()).toBe(true);
    });

    // check if we have only one active and is asc
    const activeSortArrow = wrapper.findAll('thead .ViTable__Arrows--active');
    expect(activeSortArrow.length).toBe(1);
    expect(activeSortArrow.at(0).classes()).toContain('ViTable__ArrowUp');

    // check if the active is on the first column (id);
    expect(headers.at(0).find('.ViTable__Arrows--active').exists()).toBe(true);
  });

  it('Renders striped', () => {
    const columns = [{ id: 'login', label: 'Login' }, { id: 'name', label: 'Name' }];
    const items = [
      { login: 'peter', name: 'Peter Griffin' },
      { login: 'brian', name: 'Brian Griffin' },
    ];

    const wrapper = mount(Table, {
      propsData: { columns, items, striped: true },
    });

    expect(wrapper.find('.ViTable').classes()).toContain('ViTable--striped-rows');
  });

  it('Emit sort event', () => {
    const columns = [{ id: 'login', label: 'Login', sortable: true }, { id: 'name', label: 'Name', sortable: true }];
    const items = [
      { login: 'peter', name: 'Peter Griffin' },
      { login: 'brian', name: 'Brian Griffin' },
    ];
    const wrapper = mount(Table, {
      propsData: { columns, items, sortedColumn: 'login', sortedDirection: 'asc' },
    });

    wrapper.findAll('thead th').at(0).trigger('click');
    wrapper.findAll('thead th').at(1).trigger('click');
    expect(wrapper.emitted().sort).toBeTruthy();

    expect(wrapper.emitted().sort[0][0]).toMatchObject({
      sortedColumn: 'login',
      sortedDirection: 'desc',
    });

    expect(wrapper.emitted().sort[1][0]).toMatchObject({
      sortedColumn: 'name',
      sortedDirection: 'asc',
    });
  });

  it('Emit select all event', () => {
    const columns = [{ id: 'login', label: 'Login' }, { id: 'name', label: 'Name' }];
    const items = [
      { login: 'peter', name: 'Peter Griffin' },
      { login: 'brian', name: 'Brian Griffin' },
    ];
    const wrapper = mount(Table, {
      propsData: { columns, items, checkbox: true },
    });

    wrapper.find('thead [type=checkbox]').trigger('click');
    expect(wrapper.emitted()['select-all']).toBeTruthy();

    expect(wrapper.emitted()['select-all'][0][0].lines).toMatchObject(items);
    expect(wrapper.emitted()['select-all'][0][0].selected).toBe(true);
  });

  it('Emit select event', () => {
    const columns = [{ id: 'login', label: 'Login' }, { id: 'name', label: 'Name' }];
    const items = [
      { login: 'peter', name: 'Peter Griffin' },
      { login: 'brian', name: 'Brian Griffin' },
    ];
    const wrapper = mount(Table, {
      propsData: { columns, items, checkbox: true },
    });

    wrapper.find('tbody [type=checkbox]').trigger('click');
    expect(wrapper.emitted().select).toBeTruthy();

    expect(wrapper.emitted().select[0][0].lines).toMatchObject(items[0]);
    expect(wrapper.emitted().select[0][0].selected).toBe(true);
  });
});
