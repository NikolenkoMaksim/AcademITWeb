<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <button type="button" @click="loadGenres">Пробуем</button>
    </div>
    <div>
      {{ $store.state.genres }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',

  methods: {
    loadGenres() {
      this.$store.dispatch("loadGenres");
    }
  }
}
</script>
