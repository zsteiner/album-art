<template>
  <div class="type-selector">type selector</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TypeSelector',
  computed: {
    ...mapState({
      searchTerm: state => state.type,
    }),
  },
  methods: {
    updateType(event) {
      this.$store.commit('type', event.target.value);
    },
  },
};
</script>

<style lang="scss">
@import './TypeSelector';
</style>
