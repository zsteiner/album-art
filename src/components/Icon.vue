<template>
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <use :xlink:href="`symbol-defs.svg#icon-${icon}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
}>();
</script>

<style scoped>
.icon {
  fill: currentcolor;
  height: 1em;
  position: relative;
  width: 1em;
}
</style>
