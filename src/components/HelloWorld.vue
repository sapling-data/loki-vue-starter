<template>
  <div>
    <h1 class="text-3xl font-bold">{{ message }}</h1>
    <div class="my-5">
      <input
        type="text"
        v-on:keyup.enter="setMessage"
        name="message"
        id="message"
        class="w-80 mx-auto border p-2 shadow-sm focus:ring-indigo-500
        focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
        placeholder="Type and press enter to update message" />
    </div>
    <p>
      For more information on how to configure your project for deployment to Loki,<br>
      check out the
      <a href="https://github.com/sapling-data/loki-vite-starter" target="_blank" rel="noopener">loki-vite-starter documentation</a>.
    </p>
    <div class="my-3">
      <span class="font-bold">Vue Ecosystem</span>
      <ul>
        <li><a href="https://vitejs.dev" target="_blank" rel="noopener">vite</a></li>
        <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
        <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
        <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
        <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
      </ul>
    </div>
    <div class="my-3">
      <span class="font-bold">Tailwind CSS</span>
      <ul>
        <li><a href="https://tailwindcss.com/" target="_blank" rel="noopener">Tailwind Docs</a></li>
      </ul>
    </div>

    <button class="inline-flex items-center px-2.5 py-1.5 my-3 border
      border-transparent text-xs font-medium rounded shadow-sm text-white
      bg-green-600 hover:bg-green-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      @click="incrementCount">count is: {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import useStarterStore from '../stores/starter';

export default {
  setup() {
    const starterStore = useStarterStore();
    const { count, message } = toRefs(starterStore);
    const { incrementCount, updateMessage } = starterStore;
    const setMessage = (event) => {
      updateMessage(event.target.value);
    };
    return {
      count,
      message,
      incrementCount,
      setMessage,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
