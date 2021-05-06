<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col>
        <v-pagination
            v-model="page"
            :length=$store.state.totalMoviesPages
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            total-visible="9"
            color="#7C4DFF"
        ></v-pagination>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center containerTitle pt-5 pb-5">
        Популярные фильмы
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="2" v-for="movie in $store.state.movies" :key="movie.id">
        <v-card class="myBackground" height="40rem">
          <v-card-text @click="invertFavorite(movie.id)" class="text-right text-h6 pt-1 pb-1">
            <span v-if="movie.favorite" class="pointerCursor" title="Удалить из избранного">&#x1f9e1;</span>
            <span v-else class="pointerCursor" title="Добавить в избранное">&#x1f90d;</span>
          </v-card-text>

          <v-img
              :src=movie.posterW92
              alt="poster"
              @click="openMoviePage(movie.id)"
              class="pointerCursor"
              height="25rem"
          ></v-img>

          <v-card-text @click="openMoviePage(movie.id)" class="text-center pb-0 pointerCursor movieTitle">
            {{ movie.title }}
          </v-card-text>

          <v-card-subtitle class="pb-0 pt-2 text-center genres">
            <span v-for="genreId in movie.genre_ids" :key="genreId">
              ● {{ $store.state.genres[genreId] }}
            </span>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <a href="#app">
          <v-pagination
              v-model="page"
              :length=$store.state.totalMoviesPages
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              total-visible="9"
              color="#7C4DFF"
          ></v-pagination>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Movies",

  beforeCreate() {
    this.$store.dispatch("loadMovies");
    this.$store.dispatch("loadGenres");
  },


  data: () => ({
    page: 1
  }),

  watch: {
    page() {
      this.$store.commit("setCurrentMoviesPage", this.page);
      this.$store.dispatch("loadMovies");
    }
  },

  methods: {
    openMoviePage(movieId) {
      this.$store.commit("setCurrentMovieId", movieId);
      this.$router.push({path: "/movie"})
    },

    invertFavorite(movieId) {
      console.log(movieId);
      this.$store.commit("invertFavorite", movieId);
    }
  }
}
</script>

<style>

</style>