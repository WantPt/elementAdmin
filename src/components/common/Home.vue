<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-Bread></v-Bread>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
//import vTags from './Tags.vue';
import vBread from './Breadcrumb.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        }
    },
    components: {
        vHead,
        vSidebar,
        vBread
    },
    created() {
        bus.$on('collapse', msg => {
            this.collapse = msg;
        })
        console.log("%c", "background: url(https://graph.baidu.com/resource/12bc97c493488ef414e6e01543836841.jpg) no-repeat center; background-size:100% 100%;padding-left:150px;padding-bottom: 150px;margin-left:470px;")
        console.log("%c", "background: url(https://graph.baidu.com/resource/1b9593de7916556213aae01543836040.jpg) no-repeat center; background-size:100% 100%;padding-left:150px;padding-bottom: 150px;margin-left:300px;")
        console.log("%c", "background: url(https://graph.baidu.com/resource/138b2ebb99f890c8b8c7c01543836115.jpg) no-repeat center; background-size:100% 100%;padding-left:150px;padding-bottom: 150px;margin-left:640px;")
        console.log([
            "%c                   _ooOoo_",
            "                  o8888888o",
            "                  88\" . \"88",
            "                  (| -_- |)",
            "                  O\\  =  /O",
            "               ____/`---'\\____",
            "             .'  \\\\|     |//  `.",
            "            /  \\\\|||  :  |||//  \\",
            "           /  _||||| -:- |||||-  \\",
            "           |   | \\\\\\  -  /// |   |",
            "           | \\_|  ''\\---/''  |   |",
            "           \\  .-\\__  `-`  ___/-. /",
            "         ___`. .'  /--.--\\  `. . __",
            "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
            "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
            "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
            "======`-.____`-.___\\_____/___.-`____.-'======",
            "                   `=---='",
            "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        ].join('\n'), 'color: #fad144;');
        console.log('%c     佛祖保佑   T_T    永无BUG', 'color: #fa4844;font-size: 16px;font-weight: bold');
        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        })
    }
}

</script>
