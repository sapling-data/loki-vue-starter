<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 mb-20">
      <img class="my-auto max-h-60 max-w-60" alt="Sapling logo" src="http://saplingdata.com/api/urn/com/loki/core/model/api/modelResource/v/urn/com/saplingdata/website/app/resources/res0/img/sapling-footer-logo.svg?r=33">
      <img class="my-auto max-h-60 max-w-60" alt="Vue logo" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg">
    </div>
    <HelloWorld msg="Welcome to your Loki Vue 3 + Vite Starter!" />

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
