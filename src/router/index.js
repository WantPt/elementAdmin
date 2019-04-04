import Vue from 'vue';
import Router from 'vue-router';
import {
    resolve
} from 'url';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/informationManage',
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '首页' },
            name: 'Dashboard',
            children: [
                /*  (工作台) */
                //资讯管理模块
                {
                    path: '/informationManage',
                    component: resolve => require(['../components/page/work/informationManage/informationManage.vue'], resolve),
                    meta: { title: '资讯管理' },
                    name: 'InformationManage',
                },
                //融资服务模块
                {
                    path: '/financingService',
                    component: resolve => require(['../components/page/work/financingService/financingService.vue'], resolve),
                    meta: { title: '融资服务' },
                    name: 'FinancingService'
                },
                //项目管理模块
                {
                    path: '/projectManage',
                    component: resolve => require(['../components/page/work/projectManage/projectManageMiddle.vue'], resolve),
                    meta: {
                        title: '项目管理'
                    },
                    name: 'ProjectManage',
                    children: [{ //用空组件占位 router-view 中间件
                            path: '',
                            component: resolve => require(['../components/page/work/projectManage/projectManage.vue'], resolve),
                        },
                        {
                            path: '/projectManage/projectEdit',
                            component: resolve => require(['../components/page/work/projectManage/projectOption.vue'], resolve),
                            meta: {
                                title: '编辑项目'
                            },
                            name: 'projectEdit'
                        },
                        {
                            path: '/projectManage/projectAdd',
                            component: resolve => require(['../components/page/work/projectManage/projectOption.vue'], resolve),
                            meta: {
                                title: '新建项目'
                            },
                            name: 'projectAdd'
                        }
                    ]
                },
                //擂台管理
                {
                    path: '/arenaManage',
                    component: resolve => require(['../components/page/work/arenaManage/arenaManage.vue'], resolve),
                    meta: { title: '擂台管理' },
                    name: 'ArenaManage'
                },
                //问题管理
                {
                    path: '/problemManage',
                    component: resolve => require(['../components/page/work/problemManage/problemManage.vue'], resolve),
                    meta: { title: '问题管理' },
                    name: 'problemManage'
                },
                //观点管理
                {
                    path: '/viewpointManage',
                    component: resolve => require(['../components/page/work/viewpointManage/viewpointManageMiddle.vue'], resolve),
                    meta: {
                        title: '观点管理'
                    },
                    name: 'viewpointManage',
                    children: [{ //用空组件占位 router-view 中间件
                            path: '',
                            component: resolve => require(['../components/page/work/viewpointManage/viewpointManage.vue'], resolve),
                        },
                        {
                            path:'/viewpointManage/viewpointEdit',
                            component:resolve =>require(['../components/page/work/viewpointManage/commentMiddle.vue'],resolve),
                            meta: { title:'编辑观点' },
                            name:'viewpointEdit',
                            redirect: { path:'/viewpointManage/viewpointEdit' },
                            children:[
                                {
                                    path:'',
                                    component: resolve => require(['../components/page/work/viewpointManage/viewpointEdit.vue'], resolve),
                                },
                                {
                                    path:'/viewpointManage/viewpointEdit/viewComment',
                                    component:resolve =>require(['../components/page/work/viewpointManage/comment.vue'],resolve),
                                    meta: { title:'评论' },
                                    name:'viewComment',
                                }
                            ]
                        }
                    ]
                },
                //漂流瓶管理
                {
                    path: '/driftBottleManage',
                    component: resolve => require(['../components/page/work/driftBottleManage/driftBottleManage.vue'], resolve),
                    meta: { title: '漂流瓶管理' },
                    name: 'driftBottleManage'
                },
                //用户管理
                {
                    path: '/userManage',
                    component: resolve => require(['../components/page/work/userManage/userManageMiddle.vue'], resolve),
                    meta: { title: '用户管理' },
                    name:'userManage',
                    children:[
                        {
                            path:'',
                            component:resolve => require(['../components/page/work/userManage/userManage.vue'], resolve),
                        },
                        {
                            path: '/userManage/userEdit',
                            component: resolve => require(['../components/page/work/userManage/userEdit.vue'], resolve),
                            meta: { title: '编辑用户' },
                            name:'userEdit',
                        }

                    ]
                },
                //邀请处理
                {
                    path: '/invitationManage',
                    component: resolve => require(['../components/page/work/invitationManage/invitationManage.vue'], resolve),
                    meta: { title: '邀请处理' },
                    name: 'invitationManage'
                },

                /*  (配置项) */

                //标签管理
                {
                    path: '/labelManage',
                    component: resolve => require(['../components/page/configure/labelManage/labelManage.vue'], resolve),
                    meta: { title: '标签管理' },
                    name: 'labelManage'
                },
                //马甲管理
                {
                    path: '/vestManage',
                    component: resolve => require(['../components/page/configure/vestManage/vestManageNewMiddle.vue'], resolve),
                    meta: { title: '马甲管理' },
                    name: 'vestManage',
                    children:[
                        { //用空组件占位 router-view 中间件
                            path:'',
                            component: resolve => require(['../components/page/configure/vestManage/vestManage.vue'], resolve),
                        },
                        {
                            path: '/vestManage/vestManageNewViewpoint',
                            component: resolve => require(['../components/page/configure/vestManage/vestManageNewViewpoint.vue'], resolve),
                            meta: { title: '新建观点' },
                            name: 'vestManageNewViewpoint'
                        },
                        {
                            path: '/vestManage/vestManageNewEidt',
                            component: resolve => require(['../components/page/configure/vestManage/vestManageNewEidt.vue'], resolve),
                            meta: { title: '马甲编辑' },
                            name: 'vestManageNewEidt'
                        }
                    ]
                },
                //系统消息
                {
                    path: '/systemMessage',
                    component: resolve => require(['../components/page/configure/systemMessage/systemMessage.vue'], resolve),
                    meta: { title: '系统消息' },
                    name: 'systemMessage'
                },
                //角色管理
                {
                    path: '/roleManage',
                    component: resolve => require(['../components/page/configure/roleManage/roleManage.vue'], resolve),
                    meta: { title: '角色管理' },
                    name: 'roleManage'
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve),
            name: 'Login'
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
