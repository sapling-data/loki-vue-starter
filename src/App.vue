<template>
  <div>
    <TheNavbar />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-3 mb-20">
        <img
            class="mx-auto my-auto max-h-60 max-w-60"
            alt="Sapling logo"
            src="https://saplingdata.com/wp-content/uploads/2021/04/powered-sapling-image-2.png">
        <img
            class="mx-auto my-auto max-h-60 max-w-60"
            alt="Vue logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png">
        <img
            class="mx-auto my-auto max-h-60 max-w-60"
            alt="Vite logo"
            src="https://vitejs.dev/logo.svg">
      </div>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue';

export default {
  components: {
    TheNavbar,
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
