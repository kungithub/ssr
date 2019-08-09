<template>
  <div id="app">
    <vhead />
    <router-view></router-view>
  </div>
</template>

<script>
import "./assets/style/common.css";
import head from './components/Head.vue';

export default {
  name: "app",
  components: {
    vhead: head
  }
};
</script>