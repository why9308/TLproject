<template>
    <div class="Index_middle">
      <i :class="src" :style="color"></i>
      <div>
        <p>{{text}}</p>
        <div>{{div}}</div>
      </div>
    </div>
</template>

<script>
export default {
  props: ["src", "text", "div","color"]
};
</script>

<style lang="less" scoped>
.Index_middle {
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    i {
      font-size: 60px;
    }
    p {
      color: rgb(205, 205, 205);
      margin-left: 15px;
      white-space: nowrap;
      margin-bottom: 5px;
      margin-top: 10px;
    }
    div{
      color: #333;
        margin-left: 15px;
        font-weight: bold;
    }
  }
</style>