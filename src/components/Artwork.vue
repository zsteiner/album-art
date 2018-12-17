<template>
  <div>
    <figure class="artwork">
      <div :ref="album.id" contenteditable>
        <img :src="album.coverMedRes" :alt="album.title">
      </div>
      <p v-if="showSuccess" v-bind:class="{ active: showSuccess}" class="success">✅ image copied</p>
      <button class="copy" @click="copyLink">copy image</button>
    </figure>
    <h3 class="album-title">{{ album.title }}</h3>
    <p class="artist">{{ album.artist }}</p>
  </div>
</template>

<script>
export default {
  name: 'Artwork',
  props: {
    album: Object
  },
  data() {
    return { showSuccess: false };
  },
  methods: {
    copyLink() {
      const id = this.album.id;
      const copy_text = this.$refs[id];
      const range = document.createRange();
      range.selectNode(copy_text);
      window.getSelection().addRange(range);

      try {
        const successful = document.execCommand('copy');
        this.showSuccess = successful ? true : false;

        window.getSelection().removeAllRanges();

        setTimeout(() => {
          this.showSuccess = false;
        }, 4000);
      } catch (err) {
        console.log('Oops, unable to copy');
      }
    }
  }
};
</script>

<style lang="scss">
@import "./Artwork";
</style>