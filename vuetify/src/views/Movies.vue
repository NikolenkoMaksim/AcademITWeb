<template>
  <v-container class="grey lighten-5">
    <v-row v-for="m in 5" :key="m">
      <v-col v-for="n in 4" :key="n">
        <v-card class="pa-2" outlined tile>
          <div>{{ 4*(m-1) + n }}</div>
          <div v-for="movie in $store.state.movies" :key="movie.id">
            {{ movie.title }}, <span v-for="genreId in movie.genre_ids" :key="genreId">{{ $store.state.genres[genreId] }} </span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Movies",

  methods: {

  }
}
</script>

<style scoped>

</style>