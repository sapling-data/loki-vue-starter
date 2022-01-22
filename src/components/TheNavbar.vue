<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton class="inline-flex items-center justify-center
          p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <TheCloudMenu />
          <div class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-10 w-auto" src="https://saplingdata.com/wp-content/themes/sapling/img/sapling-data-logo.svg" alt="Sapling Data" />
            <img class="hidden lg:block h-10 w-auto" src="https://saplingdata.com/wp-content/themes/sapling/img/sapling-data-logo.svg" alt="Sapling Data" />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex items-center space-x-4">
              <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  :class="[item.to === $route.path ? 'bg-gray-900 text-white' :
              'text-gray-300 hover:bg-gray-700 hover:text-white',
              'px-3 py-2 rounded-md text-sm font-medium']"
                  :aria-current="item.to === $route.path ? 'page' : undefined">
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2
        sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-50">
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                  class="bg-gray-800 flex text-sm rounded-full text-gray-400
              hover:text-white focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">Open user menu</span>
                <CogIcon class="h-6 w-6" aria-hidden="true" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48
              rounded-md shadow-lg py-1 bg-white ring-1 ring-black
              ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            :class="[item.to === $route.path ? 'bg-gray-900 text-white' :
        'text-gray-300 hover:bg-gray-700 hover:text-white',
        'block px-3 py-2 rounded-md text-base font-medium']"
            :aria-current="item.to === $route.path ? 'page' : undefined">
          {{ item.name }}
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import {
  Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems,
} from '@headlessui/vue';
import {
  MenuIcon, CogIcon, XIcon,
} from '@heroicons/vue/outline';
import TheCloudMenu from './TheCloudMenu.vue';

export default {
  components: {
    CogIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    TheCloudMenu,
    XIcon,
  },
  setup() {
    const open = ref(false);
    const route = useRoute();
    const currentRoute = computed(() => route.path);
    const navigation = [
      { name: 'Hello World', to: '/', current: currentRoute === '/' },
      { name: 'Docs', to: '/docs', current: currentRoute === '/docs' },
    ];

    return {
      currentRoute,
      navigation,
      open,
    };
  },
};
</script>
