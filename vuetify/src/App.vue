<template>
  <div id="app">
    <v-app id="inspire">

      <v-app-bar
          app
          color="indigo"
          dark
      >
        <router-link to="/">Movies</router-link>
        <router-link to="/about">About</router-link>
      </v-app-bar>

      <v-main>
        <v-container
            class="fill-height"
            fluid
        >
          <v-row
              align="center"
              justify="center"
          >
            <v-col class="text-center">
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer
          color="indigo"
          app
      >
        <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),

  beforeCreate() {
    this.$store.dispatch("loadMovies");
    this.$store.dispatch("loadGenres")
  },

  methods: {}
};
</script>
