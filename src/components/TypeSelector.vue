<template>
  <div class="type-selector">
    <label
      v-for="selector in mediaTypes"
      :key="selector.value"
      :for="selector.value"
      class="selector"
    >
      <input
        type="radio"
        name="entities"
        :value="selector.value"
        :id="selector.value"
        v-model="media"
      >
      <span>{{ selector.label }}</span>
    </label>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TypeSelector',
  data() {
    return {
      mediaTypes: [
        { value: 'music', label: 'Music' },
        { value: 'movie', label: 'Movies' },
        { value: 'podcast', label: 'Podcast' },
        { value: 'musicVideo', label: 'Music Video' },
        { value: 'audiobook', label: 'Audiobook' },
        { value: 'shortFilm', label: 'Short Film' },
        { value: 'tvShow', label: 'TV Shows' },
        { value: 'software', label: 'Software' },
        { value: 'ebook', label: 'Ebook' },
        { value: 'all', label: 'All' },
      ],
    };
  },
  methods: {
    ...mapActions(['setMedia']),
  },

  computed: {
    media: {
      get() {
        return this.$store.state.media;
      },
      set(value) {
        this.setMedia(value);
      },
    },
  },
};
</script>

<style lang="scss">
@import './TypeSelector';
</style>
