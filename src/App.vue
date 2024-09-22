<template>
  <div id="app">
    <h1 id="title">Data Chart</h1>
    <ChartComponent />
  </div>
</template>

<script>
  import ChartComponent from './components/ChartComponent.vue'

  export default {
    name: 'App',
    components: {
      ChartComponent,
    },
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0;
    padding-top: 0;
  }
</style>
