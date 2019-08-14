<template>
  <div>
    <vmenu tpye="index" />
    <div class="index-swipe">
      <el-carousel trigger="click">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small"><img style="width:100%;" :src="urls[item]" /></h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <NoSSR>
      <div id="editor">
        <mavon-editor style="height: 100%"></mavon-editor>
      </div>
    </NoSSR>
  </div>
</template>

<script>
import menu from "./Menu.vue";
import NoSSR from "./common/NoSSR.vue";
import { Carousel, CarouselItem } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  components: {
    vmenu: menu,
    NoSSR,
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem,
    mavonEditor
  },
  data() {
    return {
      content: "editor",
      value: new Date(),
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
      ]
    };
  }
};
</script>

<style lang="scss">
.index-swipe {
  width: 1024px;
  margin: 20px auto;
}
#editor {
  width: 1024px;
  height:600px;
  margin: 20px auto;
}
</style>
