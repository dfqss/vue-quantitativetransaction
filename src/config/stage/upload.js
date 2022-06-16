const uploadRouter = {
    name: null,
    title: '文件上传',
    type: 'folder',
    icon: 'iconfont icon-tubiao',
    order: 4,
    inNav: true,
    children: [
      {
        title: '八大指标',
        type: 'view',
        name: 'allIndex',
        route: '/upload/allIndex-list',
        filePath: 'view/upload/allIndex-list.vue',
        inNav: true,
        icon: 'iconfont icon-quan',
      },
    ],
  }
  
  export default uploadRouter
  