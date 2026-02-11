<template>
  <footer>
    <p v-if="showSuccess" :class="{ active: showSuccess }" class="success">✅ image copied</p>
    <button class="copy" @click="emit('copy')">✂️ copy image</button>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  showSuccess: boolean;
}>();

const emit = defineEmits<{
  copy: [];
}>();
</script>
