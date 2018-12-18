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
      <span :title="selector.label">
        <svg class="icon" viewBox="0 0 24 24">
          <use v-bind:xlink:href="'symbol-defs.svg#icon-' + selector.value"></use>
        </svg>
        <small class="icon-label">{{selector.label}}</small>
      </span>
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
        { value: 'tvShow', label: 'TV Shows' },
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
