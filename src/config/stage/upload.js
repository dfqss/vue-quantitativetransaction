const uploadRouter = {
    name: null,
    title: '文件上传',
    type: 'folder',
    icon: 'iconfont icon-pinglun',
    order: 8,
    inNav: true,
    permission: ['文件上传'],
    children: [
      {
        title: '投资指标',
        type: 'view',
        name: 'allIndex',
        route: '/upload/allIndex-list',
        filePath: 'view/upload/allIndex-list.vue',
        inNav: true,
        icon: 'iconfont icon-quan',
        permission: ['投资指标文件上传'],
      },
      {
        title: '核心指标-往期',
        type: 'view',
        name: 'reRunCoreIndex',
        route: '/upload/reRunCoreIndex-list',
        filePath: 'view/upload/reRunCoreIndex-list.vue',
        inNav: true,
        icon: 'iconfont icon-quan',
        permission: ['往期核心指标文件上传'],
      },
    ],
  }
  
  export default uploadRouter
  