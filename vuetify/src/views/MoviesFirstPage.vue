<template>
    <div></div>
</template>

<script>
export default {
    name: "MoviesFirstPage",

    beforeCreate() {
        this.$store.commit("setCurrentMoviesPage", 1);
        this.$router.push("/");
    }
}
</script>