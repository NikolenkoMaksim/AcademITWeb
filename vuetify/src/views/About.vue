<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <button type="button" @click="loadImage">Пробуем</button>
    </div>
    <div>
      <img class="poster" src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/3mIMt3wOQ5DDtrUsuI5T5yGmCti.jpg" data-src="/t/p/w300_and_h450_bestv2/mWZ2aujwBdFEONvRQv05zPBGy7J.jpg" data-loaded="true">
      <img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/3mIMt3wOQ5DDtrUsuI5T5yGmCti.jpg" alt="Не вышло">
      <img class="poster" src="https://www.themoviedb.org/t/p/w220_and_h330_face/m96dj44zZJ8TxpaMZDJv63TldZh.jpg" srcset="https://www.themoviedb.org/t/p/w220_and_h330_face/m96dj44zZJ8TxpaMZDJv63TldZh.jpg 1x, https://www.themoviedb.org/t/p/w440_and_h660_face/m96dj44zZJ8TxpaMZDJv63TldZh.jpg 2x" alt="Не вышло">
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',

  methods: {
    loadImage() {
      this.$store.dispatch("loadImg");
    }
  }
}
</script>
