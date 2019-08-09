<template>
  <div class="hello">
    <span>测试 hot moudile replace!!!</span>
    <h1>{{ msg }}</h1>
    <p>
      {{ item }}
    </p>
    <p>
      {{ count }}
    </p>
    <button @click="count++">click</button>
    <button @click="tip">show</button>
  </div>
</template>

<script>
import "../assets/style/common.css";

export default {
  name: "HelloWorld",
  data() {
    return {
      count: 1
    };
  },
  props: {
    msg: String
  },
  created() {
    // this.$ssrContext.title = '什么鬼啊';
  },
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch("fetchItem", route.params.id);
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item() {
      return this.$store.state.items[this.$route.params.id];
    }
  },
  methods: {
    tip() {
      alert("嘻嘻哈哈");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
div {
  span {
    color: red;
  }
}
</style>
