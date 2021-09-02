<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-3 mb-20">
      <img class="mx-auto my-auto max-h-60 max-w-60" alt="Sapling logo"
      src="./assets/loki-logo.png">
      <img class="mx-auto my-auto max-h-60 max-w-60" alt="Vue logo" src="./assets/vue-logo.png">
      <img class="mx-auto my-auto max-h-60 max-w-60" alt="Sapling logo"
      src="./assets/vite-logo.svg">
    </div>
    <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>

    <button class="inline-flex items-center px-2.5 py-1.5 mt-3 border
      border-transparent text-xs font-medium rounded shadow-sm text-white
      bg-indigo-600 hover:bg-indigo-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="tailwindCheck">If this button is purple, you're riding the Tailwind!</button>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default {
  setup() {
    const tailwindCheck = () => {
      // eslint-disable-next-line no-alert
      alert('Yay Tailwind!');
    };
    return {
      HelloWorld,
      tailwindCheck,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
