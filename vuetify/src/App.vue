<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <v-tabs
            background-color="deep-purple accent-4"
            center-active
            fixed-tabs
            dark
            color="white"
            slider-size="0"
        >
          <v-tab
              class="tab-text"
              :to=$store.state.previousView
              :disabled="$store.state.previousView === ''"
          >
            <v-icon left light>mdi-arrow-left</v-icon>
            <span>Назад</span>
          </v-tab>

          <v-tab
              to="/moviesFirstPage"
              class="tab-text"

          >
            Популярные фильмы
          </v-tab>

          <v-tab
              to="/favorites"
              active-class="activeTab"
              class="tab-text"

          >
            Избранное
          </v-tab>
        </v-tabs>
      </v-card>

      <v-main>
        <v-container
            fluid
        >
          <v-row
              justify="center"
              app
              v-on:keyup.enter="search"
          >
            <v-col class="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-12 mb-0">
              <v-text-field
                  v-model=searchText
                  class="mx-4"
                  flat
                  hide-details
                  label="Поиск"
                  prepend-inner-icon="mdi-magnify"
                  :clearable=true
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row
              align="center"
              justify="center"
          >
            <v-col>
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',

  data: function () {
    return {
      searchText: ""
    }
  },

  methods: {
    search() {
      if (this.searchText !== "") {
        this.$store.commit("setSearchResultsPage", 1);
        this.$store.commit("setSearchText", this.searchText);
        this.$store.dispatch("loadSearchResults");
        this.$router.push({path: "/search"});
      }
    },

    setMoviesFirstPage() {
      this.$store.commit("setCurrentMoviesPage", 1);
    }
  }
};
</script>

<style>
.background {
  background-color: #EDE7F6 !important;
}

.tab-text {
  font-size: 0.9rem !important;
  color: #FFF !important;
}

.movie-title {
  font-size: 1.1rem !important;
  font-weight: 700 !important;
  line-height: 1.4rem !important;
}

.v-input__slot {
  padding-left: 1.5rem;
}

.search-button-text {
  font-size: 0.9rem !important;
  font-weight: 600 !important;
}

a:-webkit-any-link {
  text-decoration: none !important;
}

.theme--light.v-pagination .v-pagination__item {
  font-size: 1.1rem;
}

.container-title {
  font-weight: 500;
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
}

.pointer-cursor {
  cursor: pointer;
}
</style>