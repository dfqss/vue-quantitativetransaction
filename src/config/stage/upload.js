const uploadRouter = {
    name: null,
    title: '文件上传',
    type: 'folder',
    icon: 'iconfont icon-pinglun',
    order: 4,
    inNav: true,
    children: [
      {
        title: '投资指标',
        type: 'view',
        name: 'allIndex',
        route: '/upload/allIndex-list',
        filePath: 'view/upload/allIndex-list.vue',
        inNav: true,
        icon: 'iconfont icon-quan',
      },
      {
        title: '核心指标-往期',
        type: 'view',
        name: 'reRunCoreIndex',
        route: '/upload/reRunCoreIndex-list',
        filePath: 'view/upload/reRunCoreIndex-list.vue',
        inNav: true,
        icon: 'iconfont icon-quan',
      },
    ],
  }
  
  export default uploadRouter
  