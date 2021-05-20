<template>
  <v-container>
    <v-row justify="center">
      <v-col class="text-center container-title pt-5 pb-5" justify="center">
        {{ movie.title }}
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col class="col-xl-4 col-lg-4 col-md-4 col-sm-6" justify="center">
        <v-img
            lazy-src="noPosterBig.png"
            :src=movie.posterW342
            alt="poster"
        ></v-img>
      </v-col>

      <v-col class="col-xl-5 col-lg-5 col-md-7 col-sm-6">
        <v-row v-if="movie.vote_average === ''">
          <v-col>
            <span
                v-if="movie.favorite"
                @click="invertFavorite"
                class="pointer-cursor"
                title="Удалить из избранного"
            >
              &#x1f9e1;
            </span>
            <span
                v-else
                @click="invertFavorite"
                class="pointer-cursor"
                title="Добавить в избранное"
            >
              &#x1f90d;
            </span>
          </v-col>
        </v-row>

        <v-row
            v-if="movie.vote_average !== ''"
            justify="space-between"
        >
          <v-col>
            <span class="font-weight-bold">Рейтинг: </span>
            {{ movie.vote_average }}
          </v-col>
          <v-col
              col-1
              class="text-right"
              justify="right"
          >
            <span
                v-if="movie.favorite"
                @click="invertFavorite"
                class="pointer-cursor"
                title="Удалить из избранного"
            >
              &#x1f9e1;
            </span>
            <span
                v-else
                @click="invertFavorite"
                class="pointer-cursor"
                title="Добавить в избранное"
            >
              &#x1f90d;
            </span>
          </v-col>
        </v-row>

        <v-row v-if="movie.release_date !== ''">
          <v-col>
            <span class="font-weight-bold">Релиз: </span>
            {{ $store.state.currentMovieData.releaseDate }}
          </v-col>
        </v-row>

        <v-row v-if="movie.runtime !== 0">
          <v-col>
            <span class="font-weight-bold">Продолжительность: </span>
            {{ movie.runtime2 }}
          </v-col>
        </v-row>

        <v-row>
          <v-col v-if="movie.budget !== 0">
            <span class="font-weight-bold"> Бюджет: </span>
           {{ $store.state.currentMovieData.budget }}$
          </v-col>
        </v-row>

        <v-row>
          <v-col v-if="movie.isHasGenres">
            <span class="font-weight-bold">Жанры: </span>
            <span v-for="genre in movie.genres" :key="genre.id">
              ● {{ genre.name }}
            </span>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-if="movie.overview !== ''">
            {{ movie.overview }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <template v-if="movie.length !== 0">
      <v-row>
        <v-col class="text-center container-title pt-5 pb-5">
          Рекомендуем также
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col
            class="col-xl-2 col-lg-3 col-md-4 col-sm-6"
            v-for="similarMovie in $store.state.similarMovies"
            :key="similarMovie.id"
        >
          <v-card
              class="background" max-height="100%" height="100%"
          >
            <v-card-text
                @click="invertSimilarMovieFavorite(similarMovie.id)"
                class="text-right text-h6 pt-1 pb-1"
            >
            <span
                v-if="similarMovie.favorite"
                class="pointer-cursor"
                title="Удалить из избранного"
            >
              &#x1f9e1;
            </span>
              <span
                  v-else class="pointer-cursor"
                  title="Добавить в избранное"
              >
                &#x1f90d;
            </span>
            </v-card-text>

            <v-img
                @click="setCurrentMovieId(similarMovie.id)"
                lazy-src="noPosterBig.png"
                :src=similarMovie.posterW342
                alt="poster"
                class="pointer-cursor"
                height="75%"
            ></v-img>

            <v-card-text
                @click="setCurrentMovieId(similarMovie.id)"
                class="text-center pb-3 pointer-cursor movie-title"
            >
              {{ similarMovie.title }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "Movie",

  beforeCreate() {
    if (this.$store.state.currentMovieId === -1) {
      this.$store.commit("setCurrentMoviesPage", 1);
      this.$router.push({path: "/"});
    } else {
      this.$store.dispatch("loadMovieData");
      this.$store.dispatch("loadSimilarMovies");
      this.$store.commit("setCurrentView", "/movie");
    }
  },

  computed: {
    movie: function () {
      return this.$store.state.currentMovieData;
    }
  },

  methods: {
    setCurrentMovieId(currentMovieId) {
      this.$store.commit("setCurrentMovieId", currentMovieId);
      this.$store.dispatch("loadMovieData");
      this.$store.dispatch("loadSimilarMovies");
      document.location.href = "#app";
    },

    invertFavorite() {
      this.$store.commit("invertFavorite", {
        id: this.$store.state.currentMovieData.id,
        title: this.$store.state.currentMovieData.title,
        poster_path: this.$store.state.currentMovieData.poster_path,
        favorite: this.$store.state.currentMovieData.favorite
      });

      this.$store.commit("invertCurrentMovieFavorite");
    },

    invertSimilarMovieFavorite(movieId) {
      this.$store.commit("invertSimilarMovieFavorite", movieId);
    }
  }
}
</script>