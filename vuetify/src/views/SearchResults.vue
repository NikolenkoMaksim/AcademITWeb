<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col>
        <v-pagination
            v-model="page"
            :length=$store.state.totalSearchResultsPages
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            total-visible="9"
        ></v-pagination>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" v-for="movie in $store.state.searchResults" :key="movie.id">
        <v-card>
          <v-img
              :src=movie.posterW92
              alt="poster"
          ></v-img>

          <router-link to="/movie">
            <v-card-text @click="setCurrentMovieId(movie.id)" class="text-center text-h6 pb-0 movieTitle">
              {{ movie.title }}
            </v-card-text>
          </router-link>

          <v-card-subtitle class="pb-0 pt-2 text-center">
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
              :length=$store.state.totalSearchResultsPages
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              total-visible="9"
          ></v-pagination>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SearchResults",

  data: () => ({
    page: 1
  }),

  watch: {
    page() {
      this.$store.commit("setSearchResultsPage", this.page);
      this.$store.dispatch("loadSearchResults");
    }
  },

  methods: {
    setCurrentMovieId(currentMovieId) {
      this.$store.commit("setCurrentMovieId", currentMovieId);
    }
  }
}
</script>

<style scoped>

</style>