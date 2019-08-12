<template>
  <div class="page-container">
    <section>
      <router-link :to="{ name: url, params: { pageIndex: 1 } }">
        第一页
      </router-link>
    </section>
    <section
      v-for="(i, ix) in pageCount"
      :key="i"
      :class="{ current: pageIndex == ix + 1 }"
    >
      <router-link :to="{ name: url, params: { pageIndex: ix + 1 } }">
        {{ ix + 1 }}
      </router-link>
    </section>
    <section>
      <router-link :to="{ name: url, params: { pageIndex: pageCount.length } }">
        最后一页
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: "page",
  props: {
    pageSize: { default: 10 },
    pageIndex: { default: 1 },
    count: { default: 100 },
    url: { default: "" }
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
  mounted() {},
  created() {}
};
</script>

<style lang="scss">
.page-container {
  padding: 10px;
  display: flex;
  justify-content: center;
  .current {
    color: #fff;
    background: #33a3ff;
  }
  section {
    padding: 5px 10px;
    border: solid 1px #f3f3f3;
    border-radius: 5px;
    margin: 5px;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
}
</style>