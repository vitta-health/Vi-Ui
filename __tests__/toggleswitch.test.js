import ToggleSwitch from '../src/components/ToggleSwitch';
import { mount } from '@vue/test-utils';

describe('Toggle', () => {
  let wrapper;
  const containerSelector = '.ViToggleSwitch__Container';

  it('Renders properly', () => {
    wrapper = mount(ToggleSwitch);
    expect(wrapper).toBeTruthy();
  });

  it('Renders large option', () => {
    wrapper = mount(ToggleSwitch, {
      propsData: {
        large: true,
      },
    });

    expect(wrapper.find(containerSelector).classes()).toContain('ViToggleSwitch__Container--large');
  });

  it('Renders mini option', () => {
    wrapper = mount(ToggleSwitch, {
      propsData: {
        mini: true,
      },
    });

    expect(wrapper.find(containerSelector).classes()).toContain('ViToggleSwitch__Container--mini');
  });

  it('Renders small option', () => {
    wrapper = mount(ToggleSwitch, {
      propsData: {
        small: true,
      },
    });

    expect(wrapper.find(containerSelector).classes()).toContain('ViToggleSwitch__Container--small');
  });

  it('Trigger input when gets clicked', () => {
    wrapper = mount(ToggleSwitch);
    wrapper.find(containerSelector).trigger('click');
    expect(wrapper.emitted().input.length).toBe(1);
  });

  it('Respect value state', () => {
    wrapper = mount(ToggleSwitch, {
      propsData: {
        value: true,
      },
    });

    expect(wrapper.find(containerSelector).classes()).toContain('ViToggleSwitch__Container--active');
    wrapper.setProps({ value: false });
    expect(wrapper.find(containerSelector).classes()).toEqual(
      expect.not.stringContaining('ViToggleSwitch__Container--active'),
    );
  });

  it('Change the state when is dragged', () => {
    wrapper = mount(ToggleSwitch);

    wrapper.vm.dragging({ clientX: 1000 });
    wrapper.vm.dragStop();
    expect(wrapper.emitted().input[0][0]).toBe(true);

    wrapper.vm.dragging({ clientX: -1000 });
    wrapper.vm.dragStop();
    expect(wrapper.emitted().input[1][0]).toBe(false);
  });

  it('Add event listener when its getting dragged', () => {
    wrapper = mount(ToggleSwitch);
    window.addEventListener = jest.fn(() => {});
    wrapper.find('.ViToggleSwitch__Draggable').trigger('mousedown');
    expect(window.addEventListener.mock.calls.length).toBe(2);
    expect(window.addEventListener.mock.calls[0][0]).toBe('mousemove');
    expect(window.addEventListener.mock.calls[1][0]).toBe('mouseup');
  });
});
