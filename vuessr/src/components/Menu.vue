<template>
  <div class="out-menu-div">
    <div class="menu-div">
      <section class="menu-left">
        <img src="~img/logo.png" />
      </section>
      <section class="menu-right">
        <ul>
          <li>
            <router-link to="/index" :class="active('index')">首页</router-link>
          </li>
          <li>
            <router-link to="/info" :class="active('info')"
              >热门信息</router-link
            >
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  data() {
    return {
      menu: this.type || "index"
    };
  },
  methods: {
    active(key) {
      return key === this.menu ? "menu-active" : "";
    }
  }
};
</script>

<style lang="scss">
.out-menu-div {
  background: #fff;
}
.menu-div {
  display: flex;
  height: 100px;
  margin: 0 auto;
  width: 1024px;
  align-items: center;
  justify-content: space-around;
  .menu-left {
    width: 370px;
    img {
      width: 100%;
    }
  }
  .menu-right {
    flex: 1;
    ul {
      display: flex;
      justify-content: flex-end;
      li {
        padding-left: 20px;
        font-size: 18px;
        text-align: center;
        a {
          text-decoration: none;
        }
        .menu-active {
          color: #33a3ff;
          border-bottom: solid 4px #33a3ff;
          padding-bottom: 10px;
        }
      }
    }
  }
}
</style>
