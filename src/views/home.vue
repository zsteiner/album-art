<template>
  <article>
    <h1>Album Art</h1>
  </article>
</template>

<script>
export default {
  created() {
    const query = Object.assign({}, this.$route.query);
    delete query.q;
    delete query.media;
    this.$router.replace({ query });
  },
};
</script>
