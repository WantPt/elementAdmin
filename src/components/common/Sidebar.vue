<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.icon" style="font-size:14px"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <!-- <el-submenu v-if="subItem.subs" :index="subItem.path" :key="subItem.path">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.path">
                                    {{ threeItem.title }}
                </el-menu-item>
              </el-submenu> -->
              <el-menu-item :index="subItem.path" :key="subItem.path">
                <div @click="$router.replace(subItem.path)" :style="{color:onRoutes == subItem.path?'#20a0ff':'#bfcbd9'}">
                  <div style="width">{{ subItem.title }}</div>
                </div>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path">
            <div @click="$router.replace(item.path)" :style="{color:onRoutes == item.path?'#20a0ff':'#bfcbd9'}">
              <i :class="item.icon" style="font-size:14px"></i>
              <span>{{ item.title }}</span>
            </div>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'work',
                        title: '工作台',
                        subs:[
                            {
                                index:'informationManage',
                                title:'资讯管理',
                                path:'/informationManage',
                            },
                            {
                                index:'financingService',
                                title:'融资服务',
                                path:'/financingService',
                            },
                            {
                                index:'projectManage',
                                title:'项目管理',
                                path: '/projectManage',
                            },
                            {
                                index:'arenaManage',
                                title:'擂台管理',
                                path: '/arenaManage',
                            },
                            {
                                index:'problemManage',
                                title:'问题管理',
                                path:'/problemManage'
                            },
                            {
                                index:'viewpointManage',
                                title:'观点管理',
                                path: '/viewpointManage',
                            },
                            {
                                index:'driftBottleManage',
                                title:'漂流瓶管理',
                                path: '/driftBottleManage',
                            },
                            {
                                index:'userManage',
                                title:'用户管理',
                                path: '/userManage',
                            },
                            {
                                index:'invitationManage',
                                title:'邀请处理',
                                path: '/invitationManage',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index:'configure',
                        title: '配置项',
                        subs: [
                            {
                                index: 'labelManage',
                                title: '标签管理',
                                path: '/labelManage',
                            },
                            {
                                index: 'vestManage',
                                title: '马甲管理',
                                path: '/vestManage',
                            },
                            {
                                index: 'systemMessage',
                                title: '系统消息',
                                path: '/systemMessage',
                            },
                            {
                                index:'roleManage',
                                title:'角色管理',
                                path: '/roleManage',
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
    .router-link-exact-active{
        color:rgb(32, 160, 255) !important;
    } 
    .router-link-active {
        color:rgb(32, 160, 255) !important;
    }
 
</style>
