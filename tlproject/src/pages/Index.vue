<template>
  <!-- 后台首页 -->
  <el-container>
    <el-aside width="200px">
      <!-- :defaultActive="this.$route.meta" -->
      <el-menu
        :defaultActive="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <el-menu-item>
          <i class="el-icon-dish"></i>
         <strong>外卖商家中心</strong>
        </el-menu-item>
        <div v-for="item in newtreelist " :key="item.index">
          <!-- 一级路由 -->
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <i :class="item.icls"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="item2 in item.children" :key="item2.index" :index="item2.index">
              <i :class="item2.icls"></i>
              {{item2.title}}
            </el-menu-item>
          </el-submenu>
          <!-- 一级路由 -->
          <el-menu-item v-else :index="item.index">
            <i :class="item.icls"></i>
            <span>{{item.title}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadlist" :key="item">{{item}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item v-for="(item, index) in this.$route.meta" :key="index">{{item}}</el-breadcrumb-item> -->
          </el-breadcrumb>
        </div>
        <div class="index_box">
          <span>欢迎你,</span>
          <span v-html="username"></span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :size="40" :src="message.imgUrl"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/index/mycenter">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/">退出登录</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { API_ACCOUNTINFO, API_TOKEN } from "@/api/apis";
export default {
  data() {
    return {
      // 头像
      role: "",
      username: "请登录",
      message: {
        account: "",
        imgUrl: ""
      },
      // 监听路由对象变化
      breadlist: ["首页"],
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      // treelist:左侧动态菜单数据
      // index:点击树选项卡，跳转的hash值
      // icls:树选项卡前面的图标
      // title:树选项卡的一级名字
      // children:一级选项卡下面的二级菜单(选项卡)，可以展开
      // children:[{
      //     },]
      treelist: [
        {
          index: "/index/home",
          icls: "el-icon-menu",
          title: "后台首页",
          role: ["super", "normal"]
        },
        {
          index: "/index/order",
          icls: "el-icon-menu",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "3",
          icls: "el-icon-setting",
          title: "商品管理",
          role: ["super", "normal"],

          //二级页面
          children: [
            {
              index: "/index/prolist",
              title: "商品列表",
              icls: "el-icon-paperclip"
            },
            {
              index: "/index/articleadd",
              title: "商品添加",
              icls: "el-icon-paperclip"
            },
            {
              index: "/index/classify",
              title: "商品分类",
              icls: "el-icon-paperclip"
            }
          ]
        },
        {
          index: "/index/manage",
          icls: "el-icon-bank-card",
          title: "店铺管理",
          role: ["super"]
        },
        {
          index: "5",
          icls: "el-icon-s-custom",
          title: "账号管理",
          role: ["super"],
          // 二级页面
          children: [
            {
              index: "/index/accountList",
              title: "账号列表",
              icls: "el-icon-paperclip"
            },
            {
              index: "/index/addaccount",
              title: "添加账号",
              icls: "el-icon-paperclip"
            },
            {
              index: "/index/changepwd",
              title: "修改密码",
              icls: "el-icon-paperclip"
            }
          ]
        },
        {
          index: "6",
          icls: "el-icon-time",
          title: "销售统计",
          role: ["super"],
          // 二级页面
          children: [
            {
              index: "/index/goodsstatistics",
              title: "商品统计",
              icls: "el-icon-paperclip"
            },
            {
              index: "/index/orderstats",
              title: "订单统计",
              icls: "el-icon-paperclip"
            }
          ]
        }
      ],
      defaultActive: ""
    };
  },
  watch: {
    $route: {
      handler: function(val) {
        // 当前hash地址
        // val.path
        window._indexthis.changebreadlist(val.path);
      },
      // 深度观察监听
      deep: true
    }
  },
  computed: {
    newtreelist() {
      return this.treelist.filter(item => item.role.includes(this.role));
    }
  },
  created() {
    // console.log(this.$route.path);
    // this.defaultActive=hash
    // breadlist
    let hash = this.$route.path;
    this.defaultActive = hash;
    this.changebreadlist(this.$route.path);
    window._indexthis = this;
    API_ACCOUNTINFO(localStorage.id).then(res => {
      this.message.imgUrl = res.data.accountInfo.imgUrl;
    });
    API_TOKEN(localStorage.token).then(res => { 
      if (res.data.code == 0) {
        this.username = localStorage.acc;
      } else {
        this.username = "<a href='#/'>请登录</a>";
      }
    });
    this.role = localStorage.role;
  },
  methods: {
    changebreadlist(hash) {
      let arr = [];
      switch (hash) {
        case "/index/home":
          arr = ["首页"];
          break;
        case "/index/order":
          arr = ["订单管理"];
          break;
        case "/index/mycenter":
          arr = ["个人中心"];
          break;
        case "/index/prolist":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/articleadd":
          arr = ["商品管理", "商品描述"];
          break;
        case "/index/classify":
          arr = ["商品管理", "商品分类"];
          break;
        case "/index/manage":
          arr = ["店铺管理"];
          break;
        case "/index/accountList":
          arr = ["账号管理", "账号列表"];
          break;
        case "/index/addaccount":
          arr = ["账号管理", "添加账号"];
          break;
        case "/index/changepwd":
          arr = ["账号管理", "修改密码"];
          break;
        case "/index/goodsstatistics":
          arr = ["销售统计", "商品统计"];
          break;
        case "/index/orderstats":
          arr = ["销售统计", "订单统计"];
          break;
      }
      this.breadlist = arr;
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  background: #f0f2f5;
  .el-aside {
    background: #304156;
    .el-menu {
      border: 0px;
      .el-icon-dish {
        color: #1296db;
        font-size: 25px;
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    width: 100%;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .index_box {
    margin: 0px 15px;
    position: relative;
    top: -10px;
    left: 0px;
    span {
      margin-left: 8px;
    }

    .el-avatar--circle {
      margin-top: 5px;
    }
  }
  .el-avatar--circle {
    position: relative;
    top: 13px;
    left: -3px;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    background: white;
    .el-breadcrumb {
      line-height: 60px;
    }
  }
}
a {
  text-decoration: none;
  color: cornflowerblue;
}
</style>