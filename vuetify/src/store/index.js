import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        apiUrl: "https://api.themoviedb.org/3",
        apiKey: "ce34868e32dd332a30edae12bf9a6972",
        desiredLanguage: "ru-Ru",
        currentMoviesPage: 1,
        totalMoviesPages: 1,
        movies: [],
        genres: {},
        posterUrls: {
            w92: "https://image.tmdb.org/t/p/w92",
            w154: "https://image.tmdb.org/t/p/w154",
            w185: "https://image.tmdb.org/t/p/w185",
            w342: "https://image.tmdb.org/t/p/w342",
            w500: "https://image.tmdb.org/t/p/w500",
            w780: "https://image.tmdb.org/t/p/w780",
            original: "https://image.tmdb.org/t/p/original"
        },
        currentMovieId: -1,
        currentMovieData: {},
        similarMovies: [],
        searchResults: [],
        searchText: "",
        currentSearchResultsPage: 1,
        totalSearchResultsPages: 1,
        currentFavoritesMovie: []
    },

    mutations: {
        setMovies(state, data) {
            state.totalMoviesPages = data.total_pages;
            state.movies = data.results;
        },

        setGenres(state, data) {
            state.genres = data;
        },

        setMovieData(state, data) {
            state.currentMovieData = data;
        },

        setSimilarMovies(state, data) {
            state.similarMovies = data;
        },

        setCurrentMovieId(state, currentMovieId) {
            state.currentMovieId = currentMovieId;
        },

        setCurrentMoviesPage(state, newPage) {
            state.currentMoviesPage = newPage;
        },

        setSearchResults(state, data) {
            state.totalSearchResultsPages = data.total_pages;
            state.searchResults = data.results;
        },

        setSearchText(state, searchText) {
            state.searchText = searchText;
        },

        setSearchResultsPage(state, newPage) {
            state.currentSearchResultsPage = newPage;
        },

        invertMoviesFavorite(state, movieId) {
            let movie = state.movies.find(movie => movie.id === movieId);
            this.commit("invertFavorite", movie);
        },

        invertSearchFavorite(state, movieId) {
            let movie = state.searchResults.find(movie => movie.id === movieId);
            this.commit("invertFavorite", movie);
        },

        invertSimilarMovieFavorite(state, movieId) {
            let movie = state.similarMovies.find(movie => movie.id === movieId);
            this.commit("invertFavorite", movie);
        },

        invertFavorite(state, movie) {
            if (movie.favorite) {
                localStorage.removeItem(movie.id);
            } else {
                localStorage.setItem(movie.id, movie.title + "~" + movie.poster_path);
            }

            movie.favorite = !movie.favorite;
        }
    },

    actions: {
        loadMovies(context) {
            axios.get(
                this.state.apiUrl +
                "/movie/popular?api_key=" + this.state.apiKey +
                "&language=" + this.state.desiredLanguage +
                "&page=" + this.state.currentMoviesPage
            ).then(response => {
                response.data.results.forEach(movie => {
                    movie.posterW342 = this.state.posterUrls.w342 + movie.poster_path;
                    movie.favorite = localStorage.getItem(movie.id) !== null;
                });
                context.commit("setMovies", response.data);
            })
                .catch(error => {
                    alert(error);
                });
        },

        loadGenres(context) {
            axios.get(
                this.state.apiUrl +
                "/genre/movie/list?api_key=" + this.state.apiKey +
                "&language=" + this.state.desiredLanguage
            ).then(response => {
                let genres = {};

                response.data.genres.forEach(genre => {
                    genres[genre.id] = genre.name;
                })

                context.commit("setGenres", genres);
            })
                .catch(error => {
                    alert(error);
                });
        },

        loadMovieData(context) {
            axios.get(
                this.state.apiUrl +
                "/movie/" + this.state.currentMovieId +
                "?api_key=" + this.state.apiKey +
                "&language=" + this.state.desiredLanguage
            ).then(response => {
                response.data.posterW342 = this.state.posterUrls.w342 + response.data.poster_path;
                response.data.favorite = localStorage.getItem(response.data.id) !== null;
                response.data.isHasGenres = response.data.genres.length !== 0;

                if (response.data.release_date !== "") {
                    let release = response.data.release_date.split("-");
                    response.data.releaseDate = release[2] + "." + release[1] + "." + release[0];
                }

                if (response.data.runtime !== 0) {
                    response.data.runtime2 = Math.floor(response.data.runtime / 60) + " час "
                        + response.data.runtime % 60 + " мин";
                }

                context.commit("setMovieData", response.data);
            })
                .catch(error => {
                    alert(error);
                });
        },

        loadSimilarMovies(context) {
            axios.get(
                this.state.apiUrl +
                "/movie/" + this.state.currentMovieId +
                "/similar?api_key=" + this.state.apiKey +
                "&language=" + this.state.desiredLanguage +
                "&page=1"
            ).then(response => {
                console.log(response);

                response.data.results.forEach(movie => {
                    movie.posterW342 = this.state.posterUrls.w342 + movie.poster_path;
                    movie.posterOriginal = this.state.posterUrls.original + movie.poster_path;
                    movie.favorite = localStorage.getItem(movie.id) !== null;
                });
                context.commit("setSimilarMovies", response.data.results);
            })
                .catch(error => {
                    alert(error);
                });
        },

        loadSearchResults(context) {
            axios.get(this.state.apiUrl +
                "/search/movie?api_key=" + this.state.apiKey +
                "&language=" + this.state.desiredLanguage +
                "&query=" + this.state.searchText +
                "&page=" + this.state.currentSearchResultsPage
            ).then(response => {
                response.data.results.forEach(movie => {
                    movie.posterW342 = this.state.posterUrls.w342 + movie.poster_path;
                    movie.posterOriginal = this.state.posterUrls.original + movie.poster_path;
                    movie.favorite = localStorage.getItem(movie.id) !== null;
                });
                context.commit("setSearchResults", response.data);
            })
                .catch(error => {
                    alert(error);
                });
        }
    }
})
