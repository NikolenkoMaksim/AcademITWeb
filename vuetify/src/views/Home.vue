<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>Счетчик: {{ this.$store.state.count }}</div>
    <div>
      <button type="button" @click="increment">Увеличить</button>
    </div>
    <div>
      <button type="button" @click="incrementWithDelay">Увеличить c задержкой</button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',

  components: {
    HelloWorld
  },

  methods: {
    increment() {
      this.$store.commit("increment", 2);
    },

    incrementWithDelay() {
      this.$store.dispatch("incrementWithDelay", 3);
    }
  }
}
</script>
