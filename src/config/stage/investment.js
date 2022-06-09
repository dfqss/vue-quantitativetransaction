/**
    title	页面title / 左侧sidebar
    name	使用 Symbol 确保唯一性，若未设置则默认为随机字符串
    type	folder：有子路由，折叠sidebar / tab：子路由在右侧以menuTab展现 / view：直接展示页面
    icon	可直接配置 iconfont 类名 / 也可配置为图片路径
    route	当前页面路由
    filePath	文件路径
    order	路由排序
    inNav	是否在左侧菜单栏显示
    permission	当前路由权限，数组格式，满足数组内任一权限即可展示该页面
 */

const investmentRouter = {
  name: null,
  title: '投资管理',
  type: 'folder',
  icon: 'iconfont icon-tubiao',
  order: 3,
  inNav: true,
  children: [
    {
      title: '投资标初选',
      type: 'view',
      name: 'investment',
      route: '/investment/investment-list',
      filePath: 'view/investment/investment-list.vue',
      inNav: true,
      icon: 'iconfont icon-quan',
    },
    // {
    //   title: '股票池',
    //   type: 'view',
    //   name: 'flow',
    //   route: '/content/flow',
    //   filePath: 'view/content/Flow.vue',
    //   inNav: true,
    //   icon: 'iconfont icon-quan',
    // },
    {
      title: '核心指标历史',
      type: 'view',
      name: 'coreIndexHist',
      route: '/investment/coreIndexHist-list',
      filePath: 'view/investment/coreIndexHist-list.vue',
      inNav: true,
      icon: 'iconfont icon-quan',
    },
    {
      title: '财务分析指标',
      type: 'view',
      name: 'finAnalysis',
      route: '/investment/finAnalysis-list',
      filePath: 'view/investment/finAnalysis-list.vue',
      inNav: true,
      icon: 'iconfont icon-quan',
    },
    {
      title: '成长指标',
      type: 'view',
      name: 'growth',
      route: '/investment/growth-list',
      filePath: 'view/investment/growth-list.vue',
      inNav: true,
      icon: 'iconfont icon-quan',
    },
    {
      title: '杜邦分析指标',
      type: 'view',
      name: 'dupontAnalysis',
      route: '/investment/dupontAnalysis-list',
      filePath: 'view/investment/dupontAnalysis-list.vue',
      inNav: true,
      icon: 'iconfont icon-quan',
    },
    {
      title: '股票估值',
      type: 'view',
      name: 'stockValue',
      route: '/investment/stockValue-list',
      filePath: 'view/investment/stockValue-list.vue',
      inNav: true,
      icon: 'iconfont icon-quan',
    },
    {
      title: '技术分析指标',
      type: 'view',
      name: 'tecAnalysis',
      route: '/investment/tecAnalysis-list',
      filePath: 'view/investment/tecAnalysis-list.vue',
      inNav: true,
      icon: 'iconfont icon-quan',
    },
    {
      title: '行业分类',
      type: 'view',
      name: 'industryClass',
      route: '/investment/industryClass-list',
      filePath: 'view/investment/industryClass-list.vue',
      inNav: true,
      icon: 'iconfont icon-quan',
    },
    {
      title: '证券基础指标',
      type: 'view',
      name: 'secBasic',
      route: '/investment/secBasic-list',
      filePath: 'view/investment/secBasic-list.vue',
      inNav: true,
      icon: 'iconfont icon-quan',
    },
  ],
}

export default investmentRouter
