<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    title: String
  }
};
</script>

<style scoped lang="scss">
@import "./Search";
</style>
