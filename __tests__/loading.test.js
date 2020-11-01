import 'jest-canvas-mock';
import { mount } from '@vue/test-utils';
import Loading from '../src/components/Loading.vue';

describe('Loading', () => {
  it('Renders properly', () => {
    const wrapper = mount(Loading);
    expect(wrapper).toBeTruthy();
    expect(wrapper.classes()).toContain('ViLoading');
  });

  it('Renders with percentage', () => {
    const wrapper = mount(Loading, {
      propsData: {
        percentValue: 30,
      },
    });

    expect(wrapper.find('.ViLoading__Value').text()).toBe('30%');
  });
});
