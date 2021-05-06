<template>
  <v-container>
    <v-row>
      <v-col cols="10" class="title text-center text-h4">
        {{ $store.state.currentMovieData.title }}
      </v-col>
      <v-col cols="1" @click="invertFavorite">
        <span v-if="$store.state.currentMovieData.favorite" class="pointerCursor">&#x1f9e1;</span>
        <span v-else class="pointerCursor">&#x1f90d;</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-img :src=$store.state.currentMovieData.posterW154 alt="poster"></v-img>
      </v-col>
      <v-col class="title">
        <v-row>
          <v-col>
            {{ $store.state.currentMovieData.title }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            Рейтинг: {{ $store.state.currentMovieData.vote_average }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            Релиз: {{ $store.state.currentMovieData.release_date }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            Продолжительность: {{ $store.state.currentMovieData.runtime }} мин
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            Бюджет: {{ $store.state.currentMovieData.budget }}$
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            Жанры: <span v-for="genre in $store.state.currentMovieData.genres" :key="genre.id">
              ● {{ genre.name }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            {{ $store.state.currentMovieData.overview }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="title text-center">
        Рекомендуем также
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" v-for="movie in $store.state.similarMovies" :key="movie.id">
        <v-card @click="setCurrentMovieId(movie.id)">
          <a href="#app">
            <v-img
                :src=movie.posterW154
                alt="poster"
            ></v-img>

            <v-card-text class="text-center text-h6 pb-0 movieTitle">
              {{ movie.title }}
            </v-card-text>
          </a>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Movie",

  created() {
    this.$store.dispatch("loadMovieData");
    this.$store.dispatch("loadSimilarMovies");
  },

  methods: {
    setCurrentMovieId(currentMovieId) {
      this.$store.commit("setCurrentMovieId", currentMovieId);
      this.$store.dispatch("loadMovieData");
      this.$store.dispatch("loadSimilarMovies");
    },

    invertFavorite() {
      this.$store.commit("invertCurrentMovieFavorite");
    }
  }
}
</script>

<style scoped>

</style>