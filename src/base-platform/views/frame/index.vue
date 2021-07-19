<template>
  <pj-container class="pj-main">
    <pj-aside class="aside" width="160px">
      <div class="aside-title"> 沃畅CDN</div>
      <div class="main-menu-area">
        <div class="first-menu" :key="item.id" v-for="item in menus">
          <div class="first-menu-title" :class="{ active: item.activeParam.active }" @click="menuClick(item)">
            <div class="icon">
              <span :class="'menu-icon-' + item.icon" />
            </div>
            <div class="title">{{ item.name }}</div>
            <div class="arrow" v-if="item.children && item.children.length">
              <span class="el-icon-arrow-up" v-if="item.activeParam.active"></span>
              <span class="el-icon-arrow-down" v-else></span>
            </div>
          </div>
          <div class="sec-menu" v-if="item.children && item.children.length > 0" v-active-height="item.activeParam">
            <div :key="sec.id" class="sec-menu-item" :class="{ active: sec.activeParam.active }" v-for="sec in item.children" @click="menuClick(sec)">
              <div class="sec-menu-title">{{ sec.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </pj-aside>
    <pj-container direction="vertical">
      <pj-header class="main-header" height="48px">
        <div class="left">
          <div class="back" @click="goBack">
            <span class="icon platform-icon-back"></span>
            <span>返回</span>
          </div>
          <div class="split"></div>
          <div class="breads">
            <template v-for="(item, index) in breadNav">
              <span :key="'bread-item-split-' + index" class="bread-splice" v-if="index > 0">/</span>
              <span :key="'bread-item-split-' + index" class="bread-item" :class="{ link: item.path || item.click }" @click="breadClick(item, index)">
                {{ item.name }}
              </span>
            </template>
          </div>
        </div>
        <div class="right">
          <span v-if="userInfo.depart" class="company">{{ userInfo.depart }}</span>
          <img v-if="userInfo.icon" class="user-icon" :src="userInfo.icon" alt="用户头像" />
          <span class="user-name">{{ userInfo.nickname }}</span>
          <span class="split">|</span>
          <span class="exit" @click="logout">退出</span>
        </div>
      </pj-header>
      <pj-main class="page-content-main">
        <error401 v-if="noAuth" />
        <error404 v-else-if="noData" />
        <router-view v-else></router-view>
      </pj-main>
    </pj-container>
  </pj-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'
import { Config } from '@plugin'
import Error404 from '../error/404.vue'
import Error401 from '../error/401.vue'

export default defineComponent({
  components: {
    Error404,
    Error401
  },
  computed: {
    ...mapGetters('bread', ['breadNav']),
    ...mapState('frame_user', ['userInfo']),
    ...mapState('frame_menu', ['menus', 'menuMap']),
    ...mapState('frame_show', ['noAuth', 'noData'])
  },
  mounted() {
    this.$store.dispatch('frame_user/loadUserInfo')
    this.$store.dispatch('frame_menu/initAuth')
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    breadClick(item: Config.ItemBread, index: number) {
      if (item.path) {
        this.$router.push(item.path).catch(() => null)
      } else if (item.click) {
        item.click()
        this.$bread.splice(index + 1)
      }
    },
    menuClick(item) {
      this.$store.commit('frame_menu/menuActive', {
        id: item.id,
        active: !item.activeParam.active
      })
      if (item.path) {
        this.$router.push(item.path)
      }
    },
    logout() {
      this.$store.commit('frame_user/clearUserInfo')
      this.$router.push('/login')
    }
  }
})
</script>

<style scoped lang="scss">
.pj-main {
  height: 100%;
  width: 100%;
}

.aside {
  height: 100%;
  position: relative;
  transition: width 0.5s;
  left: 0;
  background: #3b74fb;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

//图标
.aside-title {
  border-radius: 3px;
  margin: 15px 0;
  flex: 0 0 30px;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;

  .small-logo {
    width: 30px;
  }

  .big-logo {
    width: 100px;
  }

  img {
    margin: 0 auto;
    display: block;
  }
}

.main-menu-area {
  margin-left: 5px;
  height: 100%;

  .first-menu ~ .first-menu {
    margin-top: 8px;
  }

  .first-menu-title {
    display: flex;
    flex-direction: row;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    font-size: 16px;
    padding: 0 10px 0 10px;
    cursor: pointer;

    &:hover,
    &.active {
      background: #283ce5;
      border-radius: 8px 0 0 8px;
    }

    .icon {
      flex: 0 0 16px;
    }

    .title {
      flex: 1;
      font-size: 14px;
      margin: 0 6px 0 8px;
      white-space: nowrap;
      overflow: hidden;
    }

    .arrow {
      flex: 0 0 16px;
    }
  }

  .sec-menu {
    height: 0;
    overflow: hidden;
    transition: height 0.2s ease-in;
  }

  .sec-menu-item {
    height: 30px;
    line-height: 30px;
    color: #ebf1fe;
    border-radius: 8px 0 0 8px;
    padding-left: 32px;
    margin-top: 8px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;

    &:hover,
    &.active {
      background: #ffffff;
      color: #3b74fb;
    }
  }
}

//header
.main-header {
  display: flex;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.07);
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;

  .left {
    flex: 0 0 auto;
    color: #666666;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    line-height: 48px;

    .back {
      cursor: pointer;
      margin-right: 8px;

      .icon {
        margin-right: 8px;
      }
    }

    .split {
      color: #d8d8d8;
      border-right: 1px solid #d8d8d8;
    }

    .breads {
      margin-left: 8px;

      .bread-item {
        &.link {
          cursor: pointer;

          &:hover {
            color: #3b74fb;
          }
        }

        &:last-child {
          color: #3b74fb;
        }
      }

      .bread-splice {
        margin: 0 2px;
      }
    }
  }

  .right {
    border-left: 1px solid #d8d8d8;
    height: 100%;
    line-height: 48px;

    .company {
      color: #666666;
      margin-left: 16px;
      font-size: 18px;
    }

    .user-icon {
      width: 32px;
      height: 32px;
      margin: 8px 0 0 24px;
      vertical-align: top;
      border-radius: 100%;
      overflow: hidden;
    }

    .user-name {
      margin-left: 8px;
      color: #c0c0c0;
      font-size: 14px;
    }

    .split {
      margin: 0 8px;
      font-size: 16px;
      color: #d8d8d8;
    }

    .exit {
      color: #c0c0c0;
      cursor: pointer;
    }
  }
}

.page-content-main {
  width: 100%;
  height: 100%;
  padding: 24px;
}
</style>
