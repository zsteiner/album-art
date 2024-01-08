<template>
  <h2 v-if="madeSearch" class="no-results">Sorry Can't Find Anything</h2>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NoResults',
  computed: {
    ...mapState({
      madeSearch: (state) => state.madeSearch,
    }),
  },
};
</script>

<style lang="scss">
.no-results {
  margin: 2rem 0;
  opacity: 0.75;
}
</style>
