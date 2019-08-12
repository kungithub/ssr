<template>
  <header>
    <div class="head-content">
      <section class="head-left">客服电话：400-6868618 | 了解友金所</section>
      <section class="head-right">
        <router-link to="/user/login"> 登录</router-link>
        |
        <router-link to="/user/register"> 注册</router-link>
      </section>
    </div>
  </header>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss">
header {
  overflow: hidden;
  border-bottom: solid 1px #ccc;
  line-height: 40px;
  background: #fff;
  .head-content {
    margin: 0 auto;
    width: 1024px;
    .head-left {
      float: left;
    }
    .head-right {
      float: right;
    }
  }
}
</style>
