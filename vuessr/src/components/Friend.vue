<template>
  <div class="error">
    <p>{{ code }}</p>
    <p class="error-info">出错了~ <router-link to="/">回首页</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: this.$route.query.code || 500
    };
  }
};
</script>

<style lang="scss">
.error {
  margin: 200px auto;
  width: 300px;
  font-size: 100px;
  text-align: center;
  .error-info {
    font-size: 30px;
  }
}
</style>
