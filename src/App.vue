<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;

    top: 0;
    bottom:0;
    left:0;
    width: 100%;
    height: 100%;

  /* The image used */
  background-image: url("./assets/logo.png");

  /* Full height */
}
</style>
