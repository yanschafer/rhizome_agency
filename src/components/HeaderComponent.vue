<script>
import { IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-vue';
export default {
  name: "HeaderComponent",
  components: {IconBrandTelegram, IconBrandWhatsapp },
}
</script>

<template>
  <div class="navbar">
    <div class="navbar-start">
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <div class="navbar-end">
      <a class="btn btn-offer"><IconBrandTelegram color="red" :size="48" stroke-width="1" /></a>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  z-index: 9999;
  top: 0;
  background-color: white;
  width: 50vw;
  border: 1px solid #ececec;
  border-radius: 30rem;
  margin-top: 1rem;

}
</style>