const loopbackRouter = {
  name: null,
  title: '历史回测',
  type: 'folder',
  icon: 'iconfont icon-tubiao',
  order: 7,
  inNav: true,
  children: [
    {
      title: '投资标筛选',
      type: 'view',
      name: 'tecAnalysis',
      route: '/investment/tecAnalysis-list',
      filePath: 'view/investment/tecAnalysis-list.vue',
      inNav: true,
      icon: 'iconfont icon-quan',
    },
    {
      title: '股价回测',
      type: 'view',
      name: 'tecAnalysis',
      route: '/investment/tecAnalysis-list',
      filePath: 'view/investment/tecAnalysis-list.vue',
      inNav: true,
      icon: 'iconfont icon-quan',
    },
  ]
}

export default loopbackRouter
