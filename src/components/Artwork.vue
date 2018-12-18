<template>
  <div>
    <figure class="artwork">
      <img :src="album.coverMedRes" :alt="album.title" :ref="album.id">
      <!-- <p v-if="showSuccess" v-bind:class="{ active: showSuccess }" class="success">✅ image copied</p>
      <button class="copy" @click="copyImage">✂️ copy image</button>-->
    </figure>
    <h3 class="album-title">{{ album.title }}</h3>
    <p class="artist">{{ album.artist }}</p>
  </div>
</template>

<script>
export default {
  name: 'Artwork',
  props: {
    album: Object,
  },
  data() {
    return { showSuccess: false };
  },
  methods: {
    copyImage() {
      const { id } = this.album;
      const copyTarget = this.$refs[id];
      const range = document.createRange();
      range.selectNode(copyTarget);
      window.getSelection().addRange(range);

      try {
        const successful = document.execCommand('copy');
        this.showSuccess = !!successful;

        window.getSelection().removeAllRanges();

        setTimeout(() => {
          this.showSuccess = false;
        }, 4000);
      } catch (err) {
        console.log("Can't copy");
      }
    },
  },
};
</script>

<style lang="scss">
@import './Artwork';
</style>
