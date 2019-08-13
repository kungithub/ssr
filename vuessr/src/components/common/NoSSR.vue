<template>
  <component :is="component">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    path: String
  },
  components: {
    tmp: () => import("./NoSSR_TMP.vue")
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