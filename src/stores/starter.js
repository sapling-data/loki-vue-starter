import { defineStore } from 'pinia';

const useStarterStore = defineStore('starter', {
  state: () => ({
    count: 0,
    message: 'Hello world!',
  }),
  actions: {
    incrementCount() {
      this.count += 1;
    },
    updateMessage(message) {
      this.message = message;
    },
  },
});

export default useStarterStore;
