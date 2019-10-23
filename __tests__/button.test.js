import Button from '../src/components/Button.vue';
import { mount } from '@vue/test-utils';

describe('Button', () => {
  it('Renders properly', () => {
    expect(mount(Button)).to.not.throw();
  });
});
