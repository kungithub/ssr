<template>
  <div>
    <vmenu type="info" />
    <ul>
      <li v-for="item in list" :key="item.title">{{item.title}}</li>
    </ul>
    <NoSSR>
      <vpage />
    </NoSSR>
    <p>信息披露</p>
  </div>
</template>

<script>
import menu from "../Menu.vue";
import NoSSR from "../common/NoSSR.vue";
import page from "../common/Page.vue";
import news from "../../store/modules/news.js";
import { mapState } from "vuex";

export default {
  components: {
    vmenu: menu,
    vpage: page,
    NoSSR
  },
  computed: {
    list() {
      return this.$store.state.news.list || [];
    }
  },
  asyncData({ store, route }) {
    store.registerModule("news", news);
    return store.dispatch("news/fetchList", 1);
  },
  destroyed() {
    this.$store.unregisterModule("news");
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
