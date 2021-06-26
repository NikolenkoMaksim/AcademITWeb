import Vue from 'vue'
import VueRouter from 'vue-router'
import Movies from '../views/Movies.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Movies',
        component: Movies
    },
    {
        path: '/moviesFirstPage',
        name: 'moviesFirstPage',
        component: () => import('../views/MoviesFirstPage.vue')
    },
    {
        path: '/movie',
        name: 'Movie',
        component: () => import('../views/Movie.vue')
    },
    {
        path: '/search',
        name: 'SearchResults',
        component: () => import('../views/SearchResults.vue')
    },
    {
        path: '/favorites',
        name: 'FavoritesMovies',
        component: () => import('../views/FavoritesMovies')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
