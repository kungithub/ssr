<template>
  <div class="container">
    <p>{{ data }}</p>
    <no-ssr placeholder="Loading...">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
        <el-checkbox label="禁用" disabled></el-checkbox>
        <el-checkbox label="选中且禁用" disabled></el-checkbox>
      </el-checkbox-group>
    </no-ssr>
  </div>
</template>

<script>
import axios from "../../common/http";

export default {
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    let data = await axios.get(`/api/data`);
    console.log(data);
    data.checkList = [];
    return data;
  },
  data() {
    return {
      data: "",
      value1: "",
      checkList: []
    };
  },
  created() {
    let data = axios.get(`/api/data`);
    debugger;
    console.log("返回:", data);
    // this.data = data.data;
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
