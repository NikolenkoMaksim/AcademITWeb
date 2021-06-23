<template>
  <v-container v-if="totalPages === 0">
    <v-row>
      <v-col class="text-center align-center container-title pt-5 pb-5">
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
            color="rgb(162, 141, 218)"
        ></v-pagination>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center container-title pt-5 pb-5">
        Избранные фильмы
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12"
          v-for="movie in movies"
          :key="movie.id"
      >
        <v-hover v-slot="{ hover }">
          <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="purple-background"
              max-height="100%"
              height="100%"
          >
            <v-card-text
                @click="deleteFavorite(movie.id)"
                class="text-right text-h6 pt-1 pb-1"
            >
            <span
                class="pointer-cursor"
                title="Удалить из избранного"
            >
              &#10006;
            </span>
            </v-card-text>

            <v-img
                lazy-src="noPosterBig.png"
                :src=movie.posterW342
                alt="poster"
                @click="openMoviePage(movie.id)"
                class="pointer-cursor"
                height="75%"
            ></v-img>

            <v-card-text
                @click="openMoviePage(movie.id)"
                class="text-center pb-0 pointer-cursor movie-title"
            >
              {{ movie.title }}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-pagination
            v-model="page"
            :length="totalPages"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            total-visible="9"
            color="rgb(162, 141, 218)"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FavoritesMovies",

  data: function () {
    return {
      page: 1,
      maximumMoviesInPage: 20,
      count: 1
    }
  },

  beforeCreate() {
    this.$store.commit("setCurrentView", "/favorites");
  },

  watch: {
    page() {
      document.location.href = "#app";
    }
  },

  computed: {
    totalPages: function () {
      localStorage.removeItem("loglevel:webpack-dev-server");

      if (this.count < 1) {
        return 0;
      }

      if (localStorage.length < 1) {
        return 0;
      }

      return (localStorage.length - 1) / this.maximumMoviesInPage + 1;
    },

    movies: function () {
      if (this.count < 1) {
        return null;
      }

      localStorage.removeItem("loglevel:webpack-dev-server");

      const movies = [];

      for (let i = (this.page - 1) * this.maximumMoviesInPage; i < Math.min(localStorage.length, this.page * 20); i++) {
        const movieId = localStorage.key(i);

        const movieInformation = localStorage.getItem(movieId).split("~");

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

      if ((localStorage.length - 1) % this.maximumMoviesInPage === 0 && this.page > 1) {
        this.page--;
      }

      localStorage.removeItem(movieId);
    }
  }
}
</script>