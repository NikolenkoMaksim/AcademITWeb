<template>
    <v-container class="lighten-5">
        <v-row v-if="$store.state.searchResults.length === 0">
            <v-col class="text-center container-title pt-5 pb-5">
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
                        color="rgb(162, 141, 218)"
                    ></v-pagination>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="text-center container-title pt-5 pb-5">
                    Результаты поиска по запросу "{{ $store.state.searchText }}"
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col
                    class="col-xl-2 col-lg-3 col-md-4 col-sm-6"
                    v-for="movie in $store.state.searchResults"
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
                            <v-card-text class="text-right text-h6 pt-1 pb-1">
                                <span
                                    v-if="movie.favorite"
                                    @click="invertFavorite(movie.id)"
                                    class="pointer-cursor"
                                    title="Удалить из избранного"
                                >
                                    &#x1f9e1;
                                </span>
                                <span
                                    v-else class="pointer-cursor"
                                    @click="invertFavorite(movie.id)"
                                    title="Добавить в избранное"
                                >
                                    &#x1f90d;
                                </span>
                            </v-card-text>

                            <v-img
                                lazy-src="noPoster.png"
                                :src=movie.posterW342
                                alt="poster"
                                @click="openMoviePage(movie.id)"
                                class="pointer-cursor"
                                height="70%"
                            ></v-img>

                            <v-card-text
                                @click="openMoviePage(movie.id)"
                                class="text-center pb-0 pointer-cursor movie-title"
                            >
                                {{ movie.title }}
                            </v-card-text>

                            <v-card-subtitle class="pb-0 pt-2 mb-3 text-center genres">
                                <span
                                    v-for="genreId in movie.genre_ids"
                                    :key="genreId"
                                >
                                    ● {{ $store.state.genres[genreId] }}
                                </span>
                            </v-card-subtitle>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-pagination
                        v-model="page"
                        :length=$store.state.totalSearchResultsPages
                        prev-icon="mdi-menu-left"
                        next-icon="mdi-menu-right"
                        total-visible="9"
                        color="rgb(162, 141, 218)"
                    ></v-pagination>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>

<script>
export default {
    name: "SearchResults",

    data: function () {
        return {
            page: 1
        }
    },

    beforeCreate() {
        if (this.$store.state.searchText === "") {
            this.$router.push({path: "/"});
        }

        this.$store.commit("setCurrentView", "/search");
    },

    watch: {
        page() {
            this.$store.commit("setSearchResultsPage", this.page);
            this.$store.dispatch("loadSearchResults");
            document.location.href = "#app";
        }
    },

    methods: {
        openMoviePage(movieId) {
            this.$store.commit("setCurrentMovieId", movieId);
            document.location.href = "#app";
            this.$router.push({path: "/movie"});
        },

        invertFavorite(movieId) {
            this.$store.commit("invertSearchFavorite", movieId);
        }
    }
}
</script>