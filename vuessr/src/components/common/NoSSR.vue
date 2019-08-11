<template>
  <div :is="component">
    <slot></slot>
  </div>
</template>

<script>
import tmp from "./NoSSR_TMP.vue";

export default {
  components: {
    tmp
  },
  data() {
    return {
      component: ""
    };
  },
  mounted() {
    this.component = "tmp";
  }
};
</script>

<style>
</style>