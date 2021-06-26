<template>
    <div id="app">
        <v-app id="inspire">
            <v-card>
                <v-tabs
                    background-color="#906fbd"
                    center-active
                    fixed-tabs
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
                        :class="{ 'selected-tab': $store.state.currentView === '/' }"
                    >
                        Популярные фильмы
                    </v-tab>

                    <v-tab
                        to="/favorites"
                        active-class="activeTab"
                        class="tab-text"
                        :class="{ 'selected-tab': $store.state.currentView === '/favorites' }"
                    >
                        Избранное
                    </v-tab>
                </v-tabs>
            </v-card>

            <v-main>
                <v-container
                    v-if="errorView"
                    fluid
                >
                    <v-row class="mt-6" justify="center">
                        <v-col class="text-center container-title pt-5 pb-5">
                            <div>Ошибка соединения с сервером.</div>
                            <div>
                                Возможно нет соединения с интернетом или данный сайт запрещен на территориии вашей страны.
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="mb-3" justify="center">
                        <v-col cols="auto" class="text-center container-title pt-5 pb-5">
                            <div class="ml-auto">
                            <v-img
                                src="noConnection.png"
                                alt="No connection"
                                max-height="350px"
                                max-width="500px"
                            >
                            </v-img>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>

                <v-container
                    v-else
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

    computed: {
        errorView: function () {
            return this.$store.state.errorView;
        }
    },

    methods: {
        search() {
            if (this.searchText !== "") {
                this.$store.commit("setSearchResultsPage", 1);
                this.$store.commit("setSearchText", this.searchText);
                this.$store.dispatch("loadSearchResults");

                if (this.$store.state.currentView !== "/search") {
                    this.$router.push({path: "/search"});
                }
            }
        },

        setMoviesFirstPage() {
            this.$store.commit("setCurrentMoviesPage", 1);
        }
    }
};
</script>

<style>
.theme--light.v-sheet.purple-background {
    background-color: rgba(178, 163, 199, 0.45);
}

.theme--light.v-sheet.purple-background.v-card.on-hover {
    background-color: rgba(178, 160, 198, 0.8);
}

.v-pagination.v-pagination__item--active {
    background-color: rgb(162, 141, 218);
}

.tab-text {
    font-size: 0.9rem !important;
    color: #FFF !important;
}

.v-tab.selected-tab {
    background: #7f55b7;
}

.v-card__text.movie-title {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.4rem;
}

.v-input__slot {
    padding-left: 1.5rem;
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

.theme--light.v-tabs .v-tab:hover::before {
    opacity: 0.08 !important;
}

.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon.v-icon.mdi {
    color: #FFF;
}

.v-input--hide-details > .v-input__control > .v-input__slot {
    padding-left: 0;
}
</style>