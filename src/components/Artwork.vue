<template>
  <div>
    <figure class="artwork">
      <img :src="album.coverMedRes" :alt="album.title" />
      <ArtworkControls :show-success="showSuccess" :on-click="copyImage" />
    </figure>
    <time class="album-date">{{ formatDate(album.releaseDate) }}</time>
    <h2 class="album-title">{{ album.title }}</h2>
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

<style lang="scss">
.success,
.copy {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 1rem;
  background: transparentize(white, 0.25);
  font-size: 1.5rem;
}

.copy {
  display: none;
  border: 0;
}

.active {
  & + .copy {
    display: none;
  }
}

.artwork {
  position: relative;
  margin-bottom: 0.5rem;
  padding-top: 100%;
  background-color: silver;
  border: 0.0625rem solid silver;
  font-size: 0.875rem;

  img {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &:hover {
    .copy {
      display: block;
    }

    .active + .copy {
      display: none;
    }
  }

  @include respond-to(large) {
    font-size: 1.5rem;
  }
}

.album-title {
  margin: 0 0 0.5rem;
  font-size: 0.875em;
}

.album-date {
  display: block;
  margin: 0 0 0.5rem;
  font-size: 0.625em;
  opacity: 0.75;
}

.artist {
  margin: 0.5rem 0;
  font-size: 0.75em;
}

.success {
  display: flex;
  font-weight: 900;
  justify-content: center;
  align-items: center;
}
</style>
