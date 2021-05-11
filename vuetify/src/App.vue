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
          <v-tab to="/" class="tabText">
            Популярные фильмы
          </v-tab>
          <v-tab to="/favorites" class="tabText">
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
              v-on:keyup.enter="search">
            <v-col class="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-12 mb-0">
              <v-text-field
                  v-model="searchText"
                  :clearable=true
                  placeholder="Поиск"
                  background-color="#EDE7F6"
                  height="2rem"
                  dense
                  class="text-h6"
              ></v-text-field>
            </v-col>
            <v-col class="mb-0 col-2 col-xs-4" align="centre">
              <v-btn
                  @click="search"
                  class="myBackground myButtonText"
              >
                Поиск
              </v-btn>
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

  data: () => ({
    searchText: "",
  }),

  methods: {
    search() {
      if(this.searchText !== "") {
        this.$store.commit("setSearchResultsPage", 1);
        this.$store.commit("setSearchText", this.searchText);
        this.searchText = "";
        this.$store.dispatch("loadSearchResults");
        this.$router.push({path: "/search"});
      }
    },

    linkToMovie() {
      this.$router.push({path: "/"});
    },

    linkToFavorites() {
      this.$router.push({path: "/favorites"});
    }
  }
};
</script>

<style>
.myBackground {
  background-color: #EDE7F6 !important;
}

.tabText {
  font-size: 0.9rem !important;
  color: #FFF !important;
}

.movieTitle {
  font-size: 1.1rem !important;
  font-weight: 700 !important;
  line-height: 1.4rem !important;
}

.v-input__slot {
  padding-left: 1.5rem;
}

.myButtonText {
  font-size: 0.9rem !important;
  font-weight: 600 !important;
}

a:-webkit-any-link {
  text-decoration: none !important;
}

.theme--light.v-pagination .v-pagination__item {
  font-size: 1.1rem;
}

.containerTitle {
  font-weight: 500;
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
}

.pointerCursor {
  cursor: pointer;
}
</style>