<template>
  <div>
    <component :is="component">
      <slot></slot>
    </component>
  </div>
</template>

<script>
import NoSSRTMP from "./NoSSR_TMP.vue";

export default {
  components: {
    NoSSRTMP
  },
  data() {
    return {
      component: ""
    };
  },
  mounted() {
    this.component = "NoSSRTMP";
  }
};
</script>

<style>
</style>