<template>
  <div>
    <figure class="artwork">
      <img :src="album.coverMedRes" :alt="album.title" :ref="album.id">
      <ArtworkControls :showSuccess="showSuccess" :onClick="copyImage"></ArtworkControls>
    </figure>
    <h3 class="album-title">{{ album.title }}</h3>
    <p class="artist">{{ album.artist }}</p>
  </div>
</template>

<script>
import ArtworkControls from './ArtworkControls.vue';

export default {
  name: 'Artwork',
  props: {
    album: Object,
  },
  data() {
    return { showSuccess: false };
  },
  components: {
    ArtworkControls,
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
        console.log("Can't copy"); // eslint-disable-line
      }
    },
  },
};
</script>

<style lang="scss">
@import './Artwork';
</style>