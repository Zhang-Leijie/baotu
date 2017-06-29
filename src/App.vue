<template>
  <div id="app" class="mainBody">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
.mainBody{
    min-width: 960px;
    width: 100%;
    height: 100%;
    color: #666;
    position: relative;
    font-family: "Microsoft YaHei","微软雅黑","PingFang SC", "Helvetica Neue", Helvetica,  "Hiragino Sans GB",  Arial, sans-serif;
    &:before {
        content: "";
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #F0F3F4;
        background-size: cover;
        will-change: transform;
        z-index: -1;
    }
}
</style>
