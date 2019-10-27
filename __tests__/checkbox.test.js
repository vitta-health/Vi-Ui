import InputRadioCheckbox from '../src/components/InputRadioCheckbox';
import { mount } from '@vue/test-utils';

describe('Checkbox', () => {
  let wrapper;

  const getInputValue = wrapper => Boolean(wrapper.find('.ViCheckbox__Input').element.checked);

  it('Renders properly', () => {
    wrapper = mount(InputRadioCheckbox);
    expect(wrapper).toBeTruthy();
  });

  it('Respect value props', () => {
    wrapper = mount(InputRadioCheckbox, {
      propsData: {
        value: true,
      },
    });

    expect(getInputValue(wrapper)).toBe(true);
  });

  it('Respect checked props', () => {
    wrapper = mount(InputRadioCheckbox, {
      propsData: {
        value: true,
      },
    });

    expect(getInputValue(wrapper)).toBe(true);
  });

  // also validating then the click is in the label
  it('Change value then clicked', () => {
    wrapper = mount(InputRadioCheckbox);
    expect(getInputValue(wrapper)).toBe(false);
    wrapper.find('.ViCheckbox__Input').trigger('click');
    expect(wrapper.emitted().input[0][0]).toBe(true);
    expect(getInputValue(wrapper)).toBe(true);
    wrapper.find('.ViInput__Label').trigger('click');
    expect(wrapper.emitted().input[1][0]).toBe(false);
    expect(getInputValue(wrapper)).toBe(false);
  });

  it('Does not change value when its disabled', () => {
    wrapper = mount(InputRadioCheckbox, {
      propsData: {
        disabled: true,
      },
    });
    wrapper.find('.ViCheckbox__Input').trigger('click');
    expect(wrapper.emitted().input).toBeFalsy();
    expect(getInputValue(wrapper)).toBe(false);
  });

  it('Show instruction', () => {
    const instruction = 'Please dont click here';

    wrapper = mount(InputRadioCheckbox, {
      propsData: {
        instruction,
      },
    });

    expect(wrapper.find('.ViInput__Instruction').text()).toBe(instruction);
  });

  it('Show the label', () => {
    const label = 'Please dont click here';

    wrapper = mount(InputRadioCheckbox, {
      propsData: {
        label,
      },
    });

    expect(wrapper.find('.ViInput__Label').text()).toBe(label);
  });

  it('Respect width props', () => {
    const width = '100px';

    wrapper = mount(InputRadioCheckbox, {
      attachToDocument: true,
      propsData: {
        width,
      },
    });

    expect(wrapper.find('.ViCheckbox').element.style.width).toBe(width);
  });

  it('Respect required props', () => {
    wrapper = mount(InputRadioCheckbox, {
      attachToDocument: true,
      propsData: {
        required: true,
      },
    });

    expect(wrapper.find('.ViCheckbox__Input').element.required).toBe(true);
  });

  it('Renders checkbox type by default', () => {
    wrapper = mount(InputRadioCheckbox);
    expect(wrapper.find('.ViCheckbox__Input').element.type).toBe('checkbox');
  });

  it('Respect radio option', () => {
    wrapper = mount(InputRadioCheckbox, {
      propsData: {
        radio: true,
      },
    });

    expect(wrapper.find('.ViCheckbox__Input').element.type).toBe('radio');
  });
});
