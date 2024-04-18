<script setup>
import Lenis from '@studio-freight/lenis'
import HelloWorld from './components/HelloWorld.vue'
import HeroComponent from "./components/HeroComponent.vue";
import CursorComponent from "./components/CursorComponent.vue";
import ScrollProgressComponent from "./components/ScrollProgressComponent.vue";
import StepsComponent from "./components/StepsComponent.vue";
import HeadingComponent from "./components/HeadingComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
console.log('Powered by Rhizome 🤖')
</script>

<template>
  <div class="main">
    <HeaderComponent />
  </div>
    <CursorComponent :color="'pink'" :dotColor="'pink'" :outline="true" />
    <HeroComponent />
    <StepsComponent />

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.main {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
<style>
html,body {
  overflow-x: hidden;
}
</style>
