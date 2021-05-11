<template>
  <v-container v-if="totalPages === 0">
    <v-row>
      <v-col class="text-center align-center containerTitle pt-5 pb-5">
        Нет избранных фильмов
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else class="lighten-5">
    <v-row>
      <v-col>
        <v-pagination
            v-model="page"
            :length="totalPages"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            total-visible="9"
            color="#7C4DFF"
        ></v-pagination>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center containerTitle pt-5 pb-5">
        Избранные фильмы
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12"
          v-for="movie in movies"
          :key="movie.id"
      >
        <v-card
            class="myBackground"
            max-height="100%"
            height="100%">
          <v-card-text
              @click="deleteFavorite(movie.id)"
              class="text-right text-h6 pt-1 pb-1"
          >
            <span
                class="pointerCursor"
                title="Удалить из избранного"
            >
              &#10006;
            </span>
          </v-card-text>

          <v-img
              :src=movie.posterW342
              alt="poster"
              @click="openMoviePage(movie.id)"
              class="pointerCursor"
          ></v-img>

          <v-card-text
              @click="openMoviePage(movie.id)"
              class="text-center pb-0 pointerCursor movieTitle"
          >
            {{ movie.title }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <a href="#app">
          <v-pagination
              v-model="page"
              :length="totalPages"
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
  name: "FavoritesMovies",

  data: () => ({
    page: 1,
    count: 1
  }),

  computed: {
    totalPages: function () {
      localStorage.removeItem("loglevel:webpack-dev-server");

      if (this.count < 1) {
        return 0;
      }

      if (localStorage.length < 1) {
        return 0;
      }

      return (localStorage.length - 1) / 20 + 1;
    },

    movies: function () {
      if (this.count < 1) {
        return null;
      }

      localStorage.removeItem("loglevel:webpack-dev-server");

      let movies = [];

      for (let i = (this.page - 1) * 20; i < Math.min(localStorage.length, this.page * 20); i++) {
        let movieId = localStorage.key(i);

        let movieInformation = localStorage.getItem(movieId).split("~");

        movies.push({
          id: movieId,
          title: movieInformation[0],
          posterW92: this.$store.state.posterUrls.w92 + movieInformation[1],
          posterW154: this.$store.state.posterUrls.w154 + movieInformation[1],
          posterW185: this.$store.state.posterUrls.w185 + movieInformation[1],
          posterW342: this.$store.state.posterUrls.w342 + movieInformation[1]
        });
      }

      return movies;
    }
  },

  methods: {
    openMoviePage(movieId) {
      this.$store.commit("setCurrentMovieId", movieId);
      this.$router.push({path: "/movie"})
    },

    deleteFavorite(movieId) {
      this.count++;

      if ((localStorage.length - 1) % 20 === 0 && this.page > 1) {
        this.page--;
      }

      localStorage.removeItem(movieId);
    }
  }
}
</script>