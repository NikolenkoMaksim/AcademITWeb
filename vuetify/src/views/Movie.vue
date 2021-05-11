<template>
  <v-container>
    <v-row>
      <v-col class="text-center containerTitle pt-5 pb-5">
        {{ $store.state.currentMovieData.title }}
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
        <v-img
            :src=$store.state.currentMovieData.posterW342
            alt="poster"
        ></v-img>
      </v-col>

      <v-col class="col-xl-5 col-lg-5 col-md-7 col-sm-6">
        <v-row>
          <v-col
              col-1
              class="text-right"
          >
            <span
                v-if="$store.state.currentMovieData.favorite"
                @click="invertFavorite"
                class="pointerCursor"
                title="Удалить из избранного"
            >
              &#x1f9e1;
            </span>
            <span
                v-else
                @click="invertFavorite"
                class="pointerCursor"
                title="Добавить в избранное"
            >
              &#x1f90d;
            </span>
          </v-col>
        </v-row>

        <v-row v-if="$store.state.currentMovieData.vote_average !== ''">
          <v-col>
            Рейтинг: {{ $store.state.currentMovieData.vote_average }}
          </v-col>
        </v-row>

        <v-row v-if="$store.state.currentMovieData.release_date !== ''">
          <v-col>
            Релиз: {{ $store.state.currentMovieData.releaseDate }}
          </v-col>
        </v-row>

        <v-row v-if="$store.state.currentMovieData.runtime !== 0">
          <v-col>
            Продолжительность: {{ $store.state.currentMovieData.runtime2 }}
          </v-col>
        </v-row>

        <v-row>
          <v-col v-if="$store.state.currentMovieData.budget !== 0">
            Бюджет: {{ $store.state.currentMovieData.budget }}$
          </v-col>
        </v-row>

        <v-row>
          <v-col v-if="$store.state.currentMovieData.isHasGenres">
            Жанры: <span v-for="genre in $store.state.currentMovieData.genres" :key="genre.id">
              ● {{ genre.name }}
            </span>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-if="$store.state.currentMovieData.overview !== ''">
            {{ $store.state.currentMovieData.overview }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <template v-if="$store.state.similarMovies.length !== 0">
      <v-row>
        <v-col class="text-center containerTitle pt-5 pb-5">
          Рекомендуем также
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col
            class="col-xl-2 col-lg-3 col-md-4 col-sm-6"
            v-for="movie in $store.state.similarMovies"
            :key="movie.id"
        >
          <v-card
              class="myBackground" max-height="100%" height="100%"
          >
            <v-card-text
                @click="invertSimilarMovieFavorite(movie.id)"
                class="text-right text-h6 pt-1 pb-1"
            >
            <span
                v-if="movie.favorite"
                class="pointerCursor"
                title="Удалить из избранного"
            >
              &#x1f9e1;
            </span>
              <span
                  v-else class="pointerCursor"
                  title="Добавить в избранное"
              >
                &#x1f90d;
            </span>
            </v-card-text>

            <v-img
                @click="setCurrentMovieId(movie.id)"
                :src=movie.posterW342
                alt="poster"
                class="pointerCursor"
            ></v-img>

            <v-card-text
                @click="setCurrentMovieId(movie.id)"
                class="text-center pb-0 pointerCursor movieTitle"
            >
              {{ movie.title }}
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
      this.$router.push({path: "/"});
    } else {
      this.$store.dispatch("loadMovieData");
      this.$store.dispatch("loadSimilarMovies");
    }
  },

  methods: {
    setCurrentMovieId(currentMovieId) {
      this.$store.commit("setCurrentMovieId", currentMovieId);
      this.$store.dispatch("loadMovieData");
      this.$store.dispatch("loadSimilarMovies");
      document.location.href = "#app"
    },

    invertFavorite() {
      this.$store.commit("invertFavorite", {
        id: this.$store.state.currentMovieData.id,
        title: this.$store.state.currentMovieData.title,
        poster_path: this.$store.state.currentMovieData.poster_path,
        favorite: this.$store.state.currentMovieData.favorite
      });

      this.$store.state.currentMovieData.favorite = !this.$store.state.currentMovieData.favorite;
    },

    invertSimilarMovieFavorite(movieId) {
      this.$store.commit("invertSimilarMovieFavorite", movieId);
    }
  }
}
</script>