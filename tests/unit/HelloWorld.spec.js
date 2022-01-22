/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import HelloWorld from '../../src/components/HelloWorld.vue';
import useStarterStore from '../../src/stores/starter';

describe('HelloWorld.vue', () => {
  it('renders store.message when passed', async () => {
    const message = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: { message },
    });
    const store = useStarterStore();
    await store.$patch({ message });
    expect(wrapper.find('h1#message').text()).toMatch('new message');
  });

  test('initial count is zero', () => {
    const wrapper = shallowMount(HelloWorld);
    const button = wrapper.find('button');
    expect(button.text()).toContain("0");
  });

  it('increments props.count when button is clicked', async () => {
    const wrapper = shallowMount(HelloWorld, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const store = useStarterStore();
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(button.text()).toContain(store.count.toString());
  });
});
