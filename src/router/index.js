import Vue from 'vue'
import Router from 'vue-router'
import { Layout, Content } from "../layout"; // 页面整体布局
// import { topRouterMap } from "./topRouter";

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

function filterTopRouterMap(name) {
	let router = topRouterMap.find((item) => {
		return item.parentName === name;
	});
	return router.data; // arr
}

/**
 * 1、roles:后台返回的权限结构;
 * 
 */
//手动跳转的页面白名单
const whiteList = [
	'/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 * 
 */
//默认不需要权限的页面
export const constantRouterMap = [
	{
		path: '',
		component: Layout,
		redirect: '/index/index', 
		hidden: true
	},
	{ 
		path: '/login',
		name: 'login',
        component: resolve => require(['@/page/login'], resolve)
	},
	// { path: '/404', component: () => import('@/page/errorPage/404'), hidden: true },
	// { path: '/401', component: () => import('@/page/errorPage/401'), hidden: true },
	{
		path: '/index',
		name: 'index',
		component: Layout,
		meta: {
			title: '审核中心',
			icon: 'icondashboard',
		},
		// noDropdown:true,
		children: [
			{
				path: 'index',
				name: 'infoShow3',
				meta: {
					title: '甲方审核',
					icon: 'icondashboard',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/index/index'),
			},
			{
				path: 'userlooks',
				name: 'infoShow4',
				meta: {
					title: '人员审核',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/index/SHUser'),
			},
			{
				path: 'orderlooks',
				name: 'infoShow5',
				meta: {
					title: '订单审核',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/index/SHDingDan'),
			},
			{
				path: 'lvlilooks',
				name: 'infoModify',
				meta: {
					title: '履历审核',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/index/SHLvLi'),
			}
		]
	}
]

//注册路由
export default new Router({
	mode: 'hash', // 默认为'hash'模式
	base: '/admin', // 添加跟目录,对应服务器部署子目录
	routes: constantRouterMap
})

//异步路由（需要权限的页面）
export const asyncRouterMap = [
	{
		path: '/Acontrol',
		name: 'userManage',
		component: Layout,
		meta: {
			title: '甲方管理',
			icon: 'iconuser',
		},
		noDropdown:true,     ///true  显示二级子菜单
		children: [
			{
				path: 'Acontrol',
				name: 'errorPage',
				meta: {
					title: '甲方管理',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/AControl'),
			}
		]
	},
	{
		path: '/userControl',
		name: 'share',
		component: Layout,
		meta: {
			title: '人员管理',
			icon: 'iconshare',
		},
		// noDropdown: true,
		children: [
			{
				path: 'liyi',
				name: 'infoModify1',
				meta: {
					title: '礼仪',
					icon: 'iconshare',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/userControl/liyi'),
			},
			{
				path: 'mote',
				name: 'infoModify2',
				meta: {
					title: '模特',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/userControl/mote'),
			},
			{
				path: 'yuedui',
				name: 'infoModify3',
				meta: {
					title: '乐队',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/userControl/yuedui'),
			},
			{
				path: 'wutuan',
				name: 'fundManage',
				meta: {
					title: '舞团',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/userControl/wutuan'),
			}
		]
	},
	{
		path: '/orderControl',
		name: 'infoManage',
		meta: {
			title: '订单管理',
			icon: 'iconinfo',
		},
		component: Layout,
		children: [
			{
				path: 'waitings',
				name: 'fundList',
				meta: {
					title: '待处理',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/orderControl/waiting'),
			},
			{
				path: 'loadings',
				name: 'chinaTabsList',
				meta: {
					title: '进行中',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/orderControl/doing'),
			},
			{
				path: 'dones',
				name: 'fundData',
				meta: {
					title: '已结束',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/orderControl/done'),
			}
		]
	},
	{
		path: '/commands',
		name: 'infoShow',
		meta: {
			title: '评价反馈',
			icon: 'iconpay3',
		},
		component: Layout,
		children: [
			{
				path: 'activitycommands',
				name: 'wechatNumber',
				meta: {
					title: '对活动评价',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/command/activityCommand'),
			},
			{
				path: 'userscommands',
				name: 'typePosition',
				meta: {
					title: '对人员评价',
					routerType: 'leftmenu'
				},
				component: () => import('@/page/command/userCommand'),
			}
		]
	},
	{
		path: '/label',
		name: 'infoShow1',
		meta: {
			title: '添加标签',
			icon: 'iconecharts',
		},
		component: Layout,
		noDropdown: true,
		redirect: '/AllLabel',
		children: [
			{
				path: 'addlabel',
				name: 'fundPosition',
				meta: {
					title: '添加标签'
				},
				component: () => import('@/page/AllLabel')
			}
		]
	},
	{
		path: '/orders',
		name: 'infoShow2',
		meta: {
			title: '发布订单',
			icon: 'iconpermission',
		},
		component: Layout,
		// redirect: '/sendOrder/grabOrder',
		children: [{
			path: 'grabs',
			name: 'incomePayPosition',
			meta: {
				title: '抢单中',
			},
			component: () => import('@/page/sendOrder/grabOrder'),
		}, {
			path: 'grabing',
			name: 'permission',
			meta: {
				title: '进行中',
			},
			component: () => import('@/page/sendOrder/ordering'),
		},
		{
			path: 'grabed',
			name: 'pagePer',
			meta: {
				title: '已结束',
			},
			component: () => import('@/page/sendOrder/ordered'),
		}]
	}
];

/**
 *  路由设置要求：
 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
 *
 * 按需加载路由组件的2种方法：
 * 1、component: () => import('@/page/login')
 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
 *
 *
 *
 * 什么情况下，路由会定位到404页面?
 * 路由中redirect:'',不起作用？
 * 三级子菜单要在顶部展示？
 *
 *
 *
 */

