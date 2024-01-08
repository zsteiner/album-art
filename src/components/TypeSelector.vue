<template>
  <div class="type-selector">
    <label
      v-for="selector in mediaTypes"
      :key="selector.value"
      :for="selector.value"
      class="selector"
    >
      <input
        :id="selector.value"
        v-model="media"
        type="radio"
        name="entities"
        :value="selector.value"
      />
      <span :title="selector.label">
        <Icon :icon="selector.value" />
        <small class="icon-label">{{ selector.label }}</small>
      </span>
    </label>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Icon from '@/components/Icon.vue';

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
    ...mapState({
      searchTerm: (state) => state.searchTerm,
    }),
    media: {
      get() {
        return this.$store.state.media;
      },
      set(value) {
        this.setMedia(value);
      },
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
.type-selector {
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  grid-area: header-selector;

  @include respond-to(medium) {
    margin: 0;
  }
}

.selector {
  position: relative;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 2rem;
  }

  input {
    position: absolute;
    visibility: hidden;

    &:checked {
      & + span {
        color: $green;
      }
    }
  }
}

.icon {
  height: auto;
  width: 1em;
  fill: currentColor;

  &-label {
    display: block;
    font-size: 0.75rem;
  }
}
</style>
