import Vue from "vue";
import Vuex from "vuex";
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
        currentFavoritesMovie: [],
        currentView: "",
        previousView: "",
        errorView: false
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
            const movie = state.movies.find(movie => movie.id === movieId);

            if (movie.favorite) {
                localStorage.removeItem(movie.id);
            } else {
                localStorage.setItem(movie.id, movie.title + "~" + movie.poster_path);
            }

            movie.favorite = !movie.favorite;
        },

        invertCurrentMovieFavorite(state) {
            const movie = state.currentMovieData;

            if (movie.favorite) {
                localStorage.removeItem(movie.id);
            } else {
                localStorage.setItem(movie.id, movie.title + "~" + movie.poster_path);
            }

            movie.favorite = !movie.favorite;
        },

        invertSearchFavorite(state, movieId) {
            const movie = state.searchResults.find(movie => movie.id === movieId);

            if (movie.favorite) {
                localStorage.removeItem(movie.id);
            } else {
                localStorage.setItem(movie.id, movie.title + "~" + movie.poster_path);
            }

            movie.favorite = !movie.favorite;
        },

        invertSimilarMovieFavorite(state, movieId) {
            const movie = state.similarMovies.find(movie => movie.id === movieId);

            if (movie.favorite) {
                localStorage.removeItem(movie.id);
            } else {
                localStorage.setItem(movie.id, movie.title + "~" + movie.poster_path);
            }

            movie.favorite = !movie.favorite;
        },

        setCurrentView(state, currentPage) {
            state.previousView = state.currentView;
            state.currentView = currentPage;
        },

        setErrorView(state, value) {
            state.errorView = value;
            console.log("state.errorView = " + state.errorView);
        }
    },

    actions: {
        loadMovies(context) {
            axios.request({
                url: context.state.apiUrl + "/movie/popular",
                method: "get",
                params: {
                    api_key: context.state.apiKey,
                    language: context.state.desiredLanguage,
                    page: context.state.currentMoviesPage
                }
            }).then(response => {
                response.data.results.forEach(movie => {
                    movie.posterW342 = context.state.posterUrls.w342 + movie.poster_path;
                    movie.favorite = localStorage.getItem(movie.id) !== null;
                });
                context.commit("setMovies", response.data);
            }).catch(() => {
                context.commit("setErrorView", true);
            });
        },

        loadGenres(context) {
            axios.request({
                url: context.state.apiUrl + "/genre/movie/list",
                method: "get",
                params: {
                    api_key: context.state.apiKey,
                    language: context.state.desiredLanguage
                }
            }).then(response => {
                const genres = {};

                response.data.genres.forEach(genre => {
                    genres[genre.id] = genre.name;
                })

                context.commit("setGenres", genres);
            }).catch(() => {
                context.commit("setErrorView", true);
            });
        },

        loadMovieData(context) {
            axios.request({
                url: context.state.apiUrl + "/movie/" + context.state.currentMovieId,
                method: "get",
                params: {
                    api_key: context.state.apiKey,
                    language: context.state.desiredLanguage
                }
            }).then(response => {
                const data = response.data;

                data.posterW342 = context.state.posterUrls.w342 + data.poster_path;
                data.favorite = localStorage.getItem(data.id) !== null;
                data.isHasGenres = data.genres.length !== 0;

                if (data.release_date !== "") {
                    const release = data.release_date.split("-");
                    data.releaseDate = release[2] + "." + release[1] + "." + release[0];
                }

                if (data.runtime !== 0) {
                    data.runtime2 = Math.floor(data.runtime / 60) + " час " + data.runtime % 60 + " мин";
                }

                context.commit("setMovieData", response.data);
            }).catch(() => {
                context.commit("setErrorView", true);
            });
        },

        loadSimilarMovies(context) {
            axios.request({
                url: context.state.apiUrl + "/movie/" + context.state.currentMovieId + "/similar",
                method: "get",
                params: {
                    api_key: context.state.apiKey,
                    language: context.state.desiredLanguage,
                    page: 1
                }
            }).then(response => {
                response.data.results.forEach(movie => {
                    movie.posterW342 = context.state.posterUrls.w342 + movie.poster_path;
                    movie.posterOriginal = context.state.posterUrls.original + movie.poster_path;
                    movie.favorite = localStorage.getItem(movie.id) !== null;
                });
                context.commit("setSimilarMovies", response.data.results);
            }).catch(() => {
                context.commit("setErrorView", true);
            });
        },

        loadSearchResults(context) {
            axios.request({
                url: context.state.apiUrl + "/search/movie",
                method: "get",
                params: {
                    api_key: context.state.apiKey,
                    language: context.state.desiredLanguage,
                    query: context.state.searchText,
                    page: context.state.currentSearchResultsPage
                }
            }).then(response => {
                response.data.results.forEach(movie => {
                    movie.posterW342 = context.state.posterUrls.w342 + movie.poster_path;
                    movie.posterOriginal = context.state.posterUrls.original + movie.poster_path;
                    movie.favorite = localStorage.getItem(movie.id) !== null;
                });
                context.commit("setSearchResults", response.data);
            }).catch(() => {
                context.commit("setErrorView", true);
            });
        }
    }
})
