import InputSelect from '../src/components/InputSelect';
import { mount } from '@vue/test-utils';

describe('Select', () => {
  let wrapper;

  it('Renders properly', () => {
    wrapper = mount(InputSelect, {
      propsData: {
        options: [],
      },
    });
    expect(wrapper).toBeTruthy();
  });

  it('Only show options when is focused', () => {
    wrapper = mount(InputSelect, {
      propsData: {
        options: [],
      },
    });

    expect(wrapper.find('.multiselect__content-wrapper').element.style.display).toBe('none');
    wrapper.find('.ViInput__Multiselect').element.focus();
    expect(wrapper.emitted().open.length).toBe(1);
    expect(wrapper.find('.multiselect__content-wrapper').element.style.display).toBe('');
  });

  it('Creates one list item for each object in options', () => {
    wrapper = mount(InputSelect, {
      propsData: {
        options: ['apple', 'orange', 'mango'],
      },
    });

    expect(wrapper.findAll('.multiselect__element').length).toBe(3);
  });

  it('Filter the option list', () => {
    wrapper = mount(InputSelect, {
      propsData: {
        options: ['apple', 'orange', 'mango'],
      },
    });

    wrapper.find('.multiselect__input').setValue('app');
    expect(wrapper.findAll('.multiselect__element').length).toBe(1);
    expect(wrapper.emitted()['search-change'].length).toBe(1);
    expect(wrapper.emitted()['search-change'][0][0]).toBe('app');
  });

  it('Respect width prop', () => {
    const width = '100px';

    wrapper = mount(InputSelect, {
      attachToDocument: true,
      propsData: {
        options: [],
        width,
      },
    });

    expect(wrapper.find('.ViInput').element.style.width).toBe(width);
  });

  it('Update the value when an option is selected', () => {
    wrapper = mount(InputSelect, {
      propsData: {
        options: ['apple', 'orange', 'mango'],
      },
    });

    wrapper
      .findAll('.multiselect__option')
      .at(0)
      .trigger('click');

    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0][0]).toBe('apple');

    expect(wrapper.emitted().select.length).toBe(1);
    expect(wrapper.emitted().select[0][0]).toBe('apple');
  });

  it('Doest not show options when disabled is true', () => {
    wrapper = mount(InputSelect, {
      propsData: {
        options: ['apple', 'orange', 'mango'],
        disabled: true,
      },
    });

    expect(wrapper.find('.multiselect__content-wrapper').element.style.display).toBe('none');
    wrapper.find('.ViInput__Multiselect').element.focus();
    expect(wrapper.find('.multiselect__content-wrapper').element.style.display).toBe('none');
  });
});
