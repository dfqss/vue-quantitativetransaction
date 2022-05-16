const investmentRouter = {
  name: null,
  title: '投资管理',
  type: 'folder',
  icon: 'iconfont icon-tushuguanli',
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
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '股票池',
      type: 'view',
      name: 'flow',
      route: '/content/flow',
      filePath: 'view/content/Flow.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default investmentRouter
