<template>
  <div>
    <figure class="artwork">
      <img
        class="img"
        :src="album.coverMedRes"
        :alt="album.title"
      >
      <ArtworkControls
        :show-success="showSuccess"
        :on-click="copyImage"
      />
    </figure>
    <time class="album-date">{{ formatDate(album.releaseDate) }}</time>
    <h2 class="album-title">
      {{ album.title }}
    </h2>
    <p class="artist">
      {{ album.artist }}
    </p>
  </div>
</template>

<script>
import ArtworkControls from './ArtworkControls.vue';

export default {
  name: 'Artwork',
  components: {
    ArtworkControls,
  },
  props: {
    album: { type: Object, default: () => {} },
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
        console.log("Can't copy"); // eslint-disable-line
      }
    },
    formatDate(releaseDate) {
      const date = new Date(releaseDate);
      const dateOptions = {
        year: 'numeric',
      };
      const formattedDate = date.toLocaleDateString('en-us', dateOptions);
      return formattedDate;
    },
  },
};
</script>

<style scoped>
.success,
.copy {
  background: rgb(255 255 255 / 25%);
  block-size: 100%;
  font-size: 1.5rem;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
  padding: 1rem;
  position: absolute;
}

.copy {
  border: 0;
  display: none;
}

.active + .copy {
  display: none;
}

.artwork {
  --artwork-color: silver;

  background-color: var(--artwork-color);
  border: 0.0625rem solid var(--artwork-color);
  font-size: 0.875rem;
  margin-block-end: 0.5rem;
  padding-block-start: 100%;
  position: relative;
}
.img {
  block-size: 100%;
  inline-size: 100%;
  inset-block-start: 0;
  object-fit: cover;
  position: absolute;
}

.img:hover .copy {
  display: block;
}

.img:hover .active + .copy {
  display: none;
}

@media (min-width: 70rem) {
  .artwork {
    font-size: 1.5rem;
  }
}

.album-title {
  font-size: 0.875em;
  margin: 0 0 0.5rem;
}

.album-date {
  display: block;
  font-size: 0.625em;
  margin: 0 0 0.5rem;
  opacity: 0.75;
}

.artist {
  font-size: 0.75em;
  margin: 0.5rem 0;
}

.success {
  align-items: center;
  display: flex;
  font-weight: 900;
  justify-content: center;
}
</style>
