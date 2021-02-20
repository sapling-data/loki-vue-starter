import { shallowMount } from '@vue/test-utils';
import { TestScheduler } from 'jest';
import HelloWorld from '../../src/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

  test('initial count is zero', () => {
    const wrapper = shallowMount(HelloWorld)
    const button = wrapper.find('button')
    expect(button.text()).toContain(0)
  })

  it('increments props.count when button is clicked', async () => {
    const wrapper = shallowMount(HelloWorld)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(button.text()).toContain(1);
  });
});
