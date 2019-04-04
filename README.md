# vue-manage-system #

## 安装步骤 ##
    git clone// 把线上代码克隆到本地
	cd project    // 进入目录
	npm install         // 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:8080
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build


## 目录解释 ##
	一级菜单：'工作台'
			资讯管理:'informationManage',
		
			融资服务:'financingService',
		
			项目管理:'projectManage',
		
			擂台管理:'arenaManage',
		
			问题管理:'problemManage',
		
			观点管理:'viewpointManage',
		
			漂流瓶管理:'driftBottleManage',
		
			用户管理:'userManage',
		
			邀请处理:'invitationManage',

	一级菜单: '配置项'
	
			标签管理: 'labelManage',
		
			马甲管理: 'vestManage',
		
			系统消息: 'systemMessage',
		
			角色管理:'roleManage',
                           

## 其他注意事项 ##

举个栗子，我不想用 Vue-Quill-Editor 这个组件，那我需要分四步走。

第一步：删除该组件的路由，在目录 src/router/index.js 中，找到引入改组件的路由，删除下面这段代码。

```JavaScript
{
    // 富文本编辑器组件
    path: '/editor',
    component: resolve => require(['../components/page/VueEditor.vue'], resolve) 
},
```

第二步：删除引入该组件的文件。在目录 src/components/page/ 删除 VueEditor.vue 文件。

第三步：删除该页面的入口。在目录 src/components/common/Sidebar.vue 中，找到该入口，删除下面这段代码。
	
```js
{
	index: 'editor',
	title: '富文本编辑器'
},
```

第四步：卸载该组件。执行以下命令：
	
	npm un vue-quill-editor -S

完成。

