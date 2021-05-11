<template>
  <v-container class="lighten-5">
    <v-row v-if="$store.state.searchResults.length === 0">
      <v-col class="text-center containerTitle pt-5 pb-5">
        По запросу "{{ $store.state.searchText }}" ничего не найдено
      </v-col>
    </v-row>

    <template v-else>
      <v-row>
        <v-col>
          <v-pagination
              v-model="page"
              :length=$store.state.totalSearchResultsPages
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              total-visible="9"
              color="#7C4DFF"
          ></v-pagination>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-center containerTitle pt-5 pb-5">
          Результаты поиска по запросу "{{ $store.state.searchText }}"
        </v-col>
      </v-row>

      <v-row>
        <v-col
            class="col-xl-2 col-lg-3 col-md-4 col-sm-6"
            v-for="movie in $store.state.searchResults"
            :key="movie.id"
        >
          <v-card
              class="myBackground"
              max-height="100%"
              height="100%"
          >
            <v-card-text class="text-right text-h6 pt-1 pb-1">
              <span
                  v-if="movie.favorite"
                  @click="invertFavorite(movie.id)"
                  class="pointerCursor"
                  title="Удалить из избранного"
              >
                &#x1f9e1;
              </span>
              <span
                  v-else class="pointerCursor"
                  @click="invertFavorite(movie.id)"
                  title="Добавить в избранное"
              >
                &#x1f90d;
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

            <v-card-subtitle class="pb-0 pt-2 text-center genres">
            <span
                v-for="genreId in movie.genre_ids"
                :key="genreId"
            >
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
                :length=$store.state.totalSearchResultsPages
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                total-visible="9"
                color="#7C4DFF"
            ></v-pagination>
          </a>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "SearchResults",

  data: () => ({
    page: 1
  }),

  beforeCreate() {
    if (this.$store.state.searchText === "") {
      this.$router.push({path: "/"});
    }
  },

  watch: {
    page() {
      this.$store.commit("setSearchResultsPage", this.page);
      this.$store.dispatch("loadSearchResults");
    }
  },

  methods: {
    openMoviePage(movieId) {
      this.$store.commit("setCurrentMovieId", movieId);
      this.$router.push({path: "/movie"})
    },

    invertFavorite(movieId) {
      this.$store.commit("invertSearchFavorite", movieId);
    }
  }
}
</script>