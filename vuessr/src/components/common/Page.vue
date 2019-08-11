<template>
  <div class="page-container">
    <section>第一页</section>
    <section v-for="(i,index) in pageCount" :key="i">{{index+1}}</section>
    <section>最后一页</section>
  </div>
</template>

<script>
export default {
  name: "page",
  props: {
    pageSize: { default: 10 },
    pageIndex: { default: 1 },
    count: { default: 100 }
  },
  computed: {
    pageCount() {
      return Array.from({
        length:
          this.count % this.pageSize == 0
            ? this.count / this.pageSize
            : Math.floor(this.count / this.pageSize) + 1
      });
    }
  },
  mounted() {
    // alert("xxx" + window.title);
  },
  created() {
    // alert("哈哈哈哈哈");
    console.log(document.title);
  }
};
</script>

<style>
</style>