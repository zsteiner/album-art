<template>
  <footer v-if="show">
    <p
      v-if="showSuccess"
      :class="{ active: showSuccess }"
      class="success"
    >
      ✅ image copied
    </p>
    <button
      class="copy"
      type="button"
      @click="onClick"
    >
      ✂️ copy image
    </button>
  </footer>
</template>

<script>
export default {
  name: 'ArtworkControls',
  props: {
    showSuccess: Boolean,
    onClick: { type: Function, default: () => {} },
    show: Boolean,
  },
};
</script>
