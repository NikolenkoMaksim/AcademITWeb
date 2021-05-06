import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentMoviesPage: 1,
        totalMoviesPages: 1,
        movies: [],
        genres: {},
        movieUrl: "https://api.themoviedb.org/3",
        posterUrls: {
            w92: "https://image.tmdb.org/t/p/w92",
            w154: "https://image.tmdb.org/t/p/w154",
            w185: "https://image.tmdb.org/t/p/w185",
            w342: "https://image.tmdb.org/t/p/w342",
            w500: "https://image.tmdb.org/t/p/w500",
            w780: "https://image.tmdb.org/t/p/w780",
            original: "https://image.tmdb.org/t/p/original"
        },
        currentMovieId: 460465,
        currentMovieData: {},
        similarMovies: [],
        searchResults: [],
        searchedText: "",
        currentSearchResultsPage: 1,
        totalSearchResultsPages: 1,
        currentFavoritesMovie: []
    },

    mutations: {
        saveMovies(state, data) {
            console.log("Movies " + data);
            state.totalMoviesPages = data.total_pages;
            state.movies = data.results;
            console.log(state.movies);
        },

        saveGenres(state, data) {
            console.log("Genres " + data);
            state.genres = data;
        },

        saveMovieData(state, data) {
            console.log("MovieData " + data);
            state.currentMovieData = data;
        },

        saveSimilarMovies(state, data) {
            console.log("SimilarMovies " + data);
            state.similarMovies = data;
        },

        setCurrentMovieId(state, currentMovieId) {
            state.currentMovieId = currentMovieId;
            console.log("currentMovieId: " + state.currentMovieId);
        },

        setCurrentMoviesPage(state, newPage) {
            state.currentMoviesPage = newPage;
            console.log("page " + state.currentMoviesPage);
        },

        saveSearchResults(state, data) {
            console.log("SearchResults " + data);
            state.totalSearchResultsPages = data.total_pages;
            state.searchResults = data.results;
            console.log(state.searchResults);
        },

        setSearchedText(state, searchedText) {
            state.searchedText = searchedText;
        },

        setSearchResultsPage(state, newPage) {
            state.currentSearchResultsPage = newPage;
            console.log("currentSearchResultsPage " + state.currentSearchResultsPage);
        },

        invertFavorite(state, movieId) {
            let movie = state.movies.find(movie => movie.id === movieId);

            if (movie.favorite) {
                localStorage.removeItem(movieId);
            } else {
                localStorage.setItem(movieId, movie.title + "~" + movie.poster_path);
            }

            movie.favorite = !movie.favorite;

            console.log(localStorage);
        },

        invertCurrentMovieFavorite(state) {
            if (state.currentMovieData.favorite) {
                localStorage.removeItem(state.currentMovieId);
            } else {
                localStorage.setItem(state.currentMovieId, "");
            }

            state.currentMovieData.favorite = !state.currentMovieData.favorite;
        }
    },

    actions: {
        loadMovies(context) {
            axios.get(this.state.movieUrl + "/movie/popular?api_key=ce34868e32dd332a30edae12bf9a6972&language=ru-RU&page=" + this.state.currentMoviesPage)
                .then(response => {
                    response.data.results.forEach(movie => {
                        movie.posterW92 = this.state.posterUrls.w92 + movie.poster_path;
                        movie.posterW154 = this.state.posterUrls.w154 + movie.poster_path;
                        movie.posterW185 = this.state.posterUrls.w185 + movie.poster_path;
                        movie.posterW342 = this.state.posterUrls.w342 + movie.poster_path;
                        movie.posterW500 = this.state.posterUrls.w500 + movie.poster_path;
                        movie.posterW780 = this.state.posterUrls.w780 + movie.poster_path;
                        movie.posterOriginal = this.state.posterUrls.original + movie.poster_path;
                        movie.favorite = localStorage.getItem(movie.id) !== null;
                    });
                    context.commit("saveMovies", response.data);
                })
                .catch(error => {
                    alert(error);
                });
        },

        loadGenres(context) {
            axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=ce34868e32dd332a30edae12bf9a6972&language=ru-RU")
                .then(response => {
                    let genres = {};

                    response.data.genres.forEach(o => {
                        genres[o.id] = o.name;
                    })

                    context.commit("saveGenres", genres);
                })
                .catch(error => {
                    alert(error);
                });
        },

        loadConfiguration() {
            axios.get(this.state.movieUrl + "/configuration?api_key=ce34868e32dd332a30edae12bf9a6972")
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    alert(error);
                });
        },

        loadMovieData(context) {
            axios.get(this.state.movieUrl + "/movie/" + this.state.currentMovieId + "?api_key=ce34868e32dd332a30edae12bf9a6972&language=ru-RU")
                .then(response => {

                    response.data.posterW92 = this.state.posterUrls.w92 + response.data.poster_path;
                    response.data.posterW154 = this.state.posterUrls.w154 + response.data.poster_path;
                    response.data.posterW185 = this.state.posterUrls.w185 + response.data.poster_path;
                    response.data.posterW342 = this.state.posterUrls.w342 + response.data.poster_path;
                    response.data.posterW500 = this.state.posterUrls.w500 + response.data.poster_path;
                    response.data.posterW154 = this.state.posterUrls.w780 + response.data.poster_path;
                    response.data.posterOriginal = this.state.posterUrls.original + response.data.poster_path;
                    response.data.favorite = localStorage.getItem(response.data.id) !== null;

                    context.commit("saveMovieData", response.data)
                })
                .catch(error => {
                    alert(error);
                });
        },

        loadSimilarMovies(context) {
            axios.get(this.state.movieUrl + "/movie/" + this.state.currentMovieId + "/similar?api_key=ce34868e32dd332a30edae12bf9a6972&language=ru-RU&page=1")
                .then(response => {
                    console.log(response);

                    response.data.results.forEach(movie => {
                        movie.posterW92 = this.state.posterUrls.w92 + movie.poster_path;
                        movie.posterW154 = this.state.posterUrls.w154 + movie.poster_path;
                        movie.posterW185 = this.state.posterUrls.w185 + movie.poster_path;
                        movie.posterW342 = this.state.posterUrls.w342 + movie.poster_path;
                        movie.posterW500 = this.state.posterUrls.w500 + movie.poster_path;
                        movie.posterW780 = this.state.posterUrls.w780 + movie.poster_path;
                        movie.posterOriginal = this.state.posterUrls.original + movie.poster_path;
                    });
                    context.commit("saveSimilarMovies", response.data.results);
                })
                .catch(error => {
                    alert(error);
                });
        },

        loadSearchResults(context) {
            axios.get(this.state.movieUrl + "/search/movie?api_key=ce34868e32dd332a30edae12bf9a6972&language=ru-RU&query=" + this.state.searchedText + "&page=" + this.state.currentSearchResultsPage)
                .then(response => {
                    response.data.results.forEach(movie => {
                        movie.posterW92 = this.state.posterUrls.w92 + movie.poster_path;
                        movie.posterW154 = this.state.posterUrls.w154 + movie.poster_path;
                        movie.posterW185 = this.state.posterUrls.w185 + movie.poster_path;
                        movie.posterW342 = this.state.posterUrls.w342 + movie.poster_path;
                        movie.posterW500 = this.state.posterUrls.w500 + movie.poster_path;
                        movie.posterW154 = this.state.posterUrls.w780 + movie.poster_path;
                        movie.posterOriginal = this.state.posterUrls.original + movie.poster_path;
                    });
                    context.commit("saveSearchResults", response.data);
                })
                .catch(error => {
                    alert(error);
                });
        }
    },

    modules: {}
})
