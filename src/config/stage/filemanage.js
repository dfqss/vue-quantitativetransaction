const filemanageRouter = {
    name: null,
    title: '文件管理',
    type: 'folder',
    icon: 'iconfont icon-pinglun',
    order: 9,
    inNav: true,
    permission: ['文件管理'],
    children: [
      {
        title: '任务列表',
        type: 'view',
        name: 'readFile',
        route: '/filemanage/readFile-list.vue',
        filePath: 'view/filemanage/readFile-list.vue',
        inNav: true,
        icon: 'iconfont icon-quan',
        permission: ['任务列表'],
      },
    ],
  }
  
  export default filemanageRouter
  