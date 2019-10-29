import { mount } from '@vue/test-utils';
import Alert from '../src/components/Alert';

describe('Alert', () => {
  let wrapper;
  jest.useFakeTimers();

  beforeEach(() => {
    wrapper = null;
  });

  it('Renders properly', () => {
    wrapper = mount(Alert);
    expect(wrapper).toBeTruthy();
  });

  it('Render Light with the right class', () => {
    wrapper = mount(Alert, {
      propsData: {
        light: '',
      },
    });

    expect(wrapper.find('.ViAlert').classes()).toContain('ViColor-light--bg');
  });

  it('Render Primary with the right class', () => {
    wrapper = mount(Alert, {
      propsData: {
        primary: '',
      },
    });

    expect(wrapper.find('.ViAlert').classes()).toContain('ViColor-primary--bg');
  });

  it('Render Secondary with the right color', () => {
    wrapper = mount(Alert, {
      propsData: {
        secondary: '',
      },
    });

    expect(wrapper.find('.ViAlert').classes()).toContain('ViColor-secondary--bg');
  });

  it('Render Success with the right color', () => {
    wrapper = mount(Alert, {
      propsData: {
        success: '',
      },
    });

    expect(wrapper.find('.ViAlert').classes()).toContain('ViColor-success--bg');
  });

  it('Render Danger with the right color', () => {
    wrapper = mount(Alert, {
      propsData: {
        danger: '',
      },
    });

    expect(wrapper.find('.ViAlert').classes()).toContain('ViColor-danger--bg');
  });

  it('Render Dark with the right color', () => {
    wrapper = mount(Alert, {
      propsData: {
        dark: '',
      },
    });

    expect(wrapper.find('.ViAlert').classes()).toContain('ViColor-dark--bg');
  });

  it('Render Info with the right color', () => {
    wrapper = mount(Alert, {
      propsData: {
        info: '',
      },
    });

    expect(wrapper.find('.ViAlert').classes()).toContain('ViColor-info--bg');
  });

  it('Render Warning with the right color', () => {
    wrapper = mount(Alert, {
      propsData: {
        warning: '',
      },
    });

    expect(wrapper.find('.ViAlert').classes()).toContain('ViColor-warning--bg');
  });

  it('Render Pill option', () => {
    wrapper = mount(Alert, {
      propsData: {
        pill: '',
      },
    });

    expect(wrapper.find('.ViAlert').classes()).toContain('ViAlert--pill');
  });

  it('Close by default after 2 seconds', () => {
    wrapper = mount(Alert, {
      propsData: {
        timeout: '2',
      },
    });

    jest.advanceTimersByTime(2000);
    expect(wrapper.classes()).toContain('ViAlert--closed');
  });

  it('Respect v-model state', () => {
    let show = false;

    wrapper = mount(Alert, {
      propsData: {
        value: show,
      },
    });
    expect(wrapper.classes()).toContain('ViAlert--closed');
    show = true;
    wrapper.setProps({ value: show });
    expect(wrapper.classes()).toContain('ViAlert--open');
    jest.advanceTimersByTime(2000);
    expect(wrapper.classes()).toContain('ViAlert--closed');
  });

  it('Trigger input after the timeout is pass', () => {
    let show = true;

    wrapper = mount(Alert, {
      propsData: {
        value: show,
      },
    });

    jest.advanceTimersByTime(2000);

    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0][0]).toBe(false);
  });

  it('Close after the timeout', () => {
    wrapper = mount(Alert, {
      propsData: {
        timeout: 10,
      },
    });
    expect(wrapper.classes()).toContain('ViAlert--open');
    jest.advanceTimersByTime(10000);
    expect(wrapper.classes()).toContain('ViAlert--closed');
  });

  it('Does not close when its hovered', () => {
    wrapper = mount(Alert, {
      propsData: {
        value: true,
      },
    });

    wrapper.trigger('mouseover');
    jest.advanceTimersByTime(10000);
    expect(wrapper.classes()).toContain('ViAlert--open');
  });

  it('Closes after 2 seconds when mouseover then mouseout', () => {
    wrapper = mount(Alert, {
      propsData: {
        value: true,
      },
    });

    wrapper.trigger('mouseover');
    jest.advanceTimersByTime(10000);
    expect(wrapper.classes()).toContain('ViAlert--open');
    wrapper.trigger('mouseout');
    jest.advanceTimersByTime(2000);
    expect(wrapper.classes()).toContain('ViAlert--closed');
  });

  it('Closes after timeout when mouseover then mouseout', () => {
    wrapper = mount(Alert, {
      propsData: {
        value: true,
        timeout: 5,
      },
    });

    wrapper.trigger('mouseover');
    jest.advanceTimersByTime(10000);
    expect(wrapper.classes()).toContain('ViAlert--open');
    wrapper.trigger('mouseout');
    jest.advanceTimersByTime(5000);
    expect(wrapper.classes()).toContain('ViAlert--closed');
  });

  it('Close when we click the close button', () => {
    wrapper = mount(Alert);
    wrapper.find('.ViAlert__Close').trigger('click');
    expect(wrapper.emitted().close.length).toBe(1);
    expect(wrapper.classes()).toContain('ViAlert--closed');
  });

  it('Trigger open event when gets rendered', () => {
    wrapper = mount(Alert);
    expect(wrapper.emitted().open.length).toBe(1);
  });

  // even if we pass value and timeout
  it('Does not close when property notDismissable is true', () => {
    wrapper = mount(Alert, {
      propsData: {
        notDismissable: true,
        value: true,
        timeout: 1,
      },
    });
    jest.advanceTimersByTime(2000);
    expect(wrapper.classes()).toContain('ViAlert--open');
    wrapper.setProps({ timeout: 5 });
    jest.advanceTimersByTime(5000);
    expect(wrapper.classes()).toContain('ViAlert--open');
    expect(wrapper.emitted().close).toBeFalsy();
  });

  it('Allows width prop', () => {
    wrapper = mount(Alert, {
      propsData: {
        width: 200,
      },
    });

    expect(wrapper.attributes().style).toMatch('width: 200px');
  });

  it('Renders in the right', () => {
    wrapper = mount(Alert, {
      propsData: {
        right: true,
      },
    });

    expect(wrapper.classes()).toContain('ViAlert--right');
  });

  it('Render in the left', () => {
    wrapper = mount(Alert, {
      propsData: {
        left: true,
      },
    });

    expect(wrapper.classes()).toContain('ViAlert--left');
  });

  it('Render in the bottom', () => {
    wrapper = mount(Alert, {
      propsData: {
        bottom: true,
      },
    });

    expect(wrapper.classes()).toContain('ViAlert--bottom');
  });

  it('Render inline', () => {
    wrapper = mount(Alert, {
      propsData: {
        inline: true,
      },
    });

    expect(wrapper.classes()).toContain('ViAlert--inline');
  });

  it('Render icon', () => {
    wrapper = mount(Alert, {
      propsData: {
        icon: 'rounded-plus',
      },
    });

    expect(wrapper.find('.vi-icon-rounded-plus').classes()).toContain('vi-icon');
  });
});
