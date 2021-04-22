import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        movies: [],
        genres: {}
    },

    mutations: {
        increment(state, step) {
            state.count += step;
        },

        saveMovies(state, data) {
            console.log(data);
            state.page = data.page;
            state.totalPages = data.total_pages;
            state.movies = data.results;
            console.log(state.movies);
        },

        saveGenres(state, data) {
            console.log(data);
            state.genres = data;
        }
    },

    actions: {
        incrementWithDelay(context, step) {
            setTimeout(() => {
                context.commit("increment", step)
            }, 500);
        },

        loadMovies(context) {
            axios.get("https://api.themoviedb.org/3/movie/popular?api_key=ce34868e32dd332a30edae12bf9a6972&language=en-US&page=1")
                .then(response => {
                    context.commit("saveMovies", response.data);
                })
                .catch(error => {
                    alert(error);
                })
        },

        loadGenres(context) {
            axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=ce34868e32dd332a30edae12bf9a6972&language=en-US")
                .then(response => {
                    console.log(response.data);

                    let genres = {};

                    response.data.genres.forEach(o => {
                        genres[o.id] = o.name;
                    })

                    context.commit("saveGenres", genres);
                })
                .catch(error => {
                    alert(error);
                })
        },
    },

    modules: {}
})
