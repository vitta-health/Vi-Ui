import Button from '../src/components/Button.vue';
import { mount } from '@vue/test-utils';

describe('Button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = null;
  });

  it('Renders properly', () => {
    wrapper = mount(Button);

    expect(wrapper).toBeTruthy();
  });

  it('Render default slot', () => {
    wrapper = mount(Button, {
      slots: {
        default: ` <div id="myText">hello</div>`,
      },
    });

    expect(wrapper.find('#myText').text()).toEqual('hello');
  });
});
