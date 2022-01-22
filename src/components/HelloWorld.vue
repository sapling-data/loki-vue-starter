<template>
  <div class="flex flex-col gap-7">
    <h1 class="text-3xl font-bold" id="message">{{ message }}</h1>
    <div>
      <input
        type="text"
        v-on:keyup.enter="setMessage"
        name="message"
        class="w-80 mx-auto border p-2 shadow-sm focus:ring-indigo-500
        focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
        placeholder="Type and press enter to update message" />
    </div>
    <div>
      <button class="inline-flex items-center px-2.5 py-1.5 border
      border-transparent text-xs font-medium rounded shadow-sm text-white
      bg-green-600 hover:bg-green-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              @click="incrementCount">count is: {{ count }}</button>
    </div>
    <div>
      <button
          class="inline-flex items-center px-2.5 py-1.5 border
        border-transparent text-xs font-medium rounded shadow-sm text-white
        bg-indigo-600 hover:bg-indigo-700 focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="tailwindCheck">If this button is purple, you're riding the Tailwind!</button>
    </div>
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
    const tailwindCheck = () => {
      // eslint-disable-next-line no-alert
      alert('Yay Tailwind!');
    };
    return {
      count,
      message,
      incrementCount,
      setMessage,
      tailwindCheck,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
