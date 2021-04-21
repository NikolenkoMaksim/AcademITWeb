<template>
  <div class="align-center">
    <h1>Movies</h1>
    <div>
      <button type="button" @click="loadMovies">Обновить</button>
    </div>
    <div v-for="movie in $store.state.movies" :key="movie.id">
      {{ movie.title }}, <span v-for="genreId in movie.genre_ids" :key="genreId">{{ $store.state.genres[genreId] }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Movies",

  methods: {
    loadMovies() {
      this.$store.dispatch("loadMovies");
    }
  }
}
</script>

<style scoped>

</style>