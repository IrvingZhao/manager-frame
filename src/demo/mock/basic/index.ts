import Mock from 'mockjs'

const resourceMock = Mock.mock({
  code: 'SUCCESS',
  msg: '获取成功',
  data: {
    menus: [
      { id: 'menu1', name: '一级菜单', sort: 0, icon: '', parent: null, path: null },
      { id: 'menu1-1', name: '多条件列表', sort: 0, icon: '', parent: 'menu1', path: '/demo/multi' },
      { id: 'menu1-2', name: '普通列表', sort: 0, icon: '', parent: 'menu1', path: '/demo/normal' }
    ],
    pages: [
      { id: 'page1', name: '测试多条件列表页', key: 'demo-list', type: 'page', path: '/demo/multi' },
      { id: 'page1-op1', name: '新增', key: 'add', type: 'operator', path: '', pageId: '', refPageId: '' },
      { id: '', name: '', key: '', type: '', path: '', pageId: '', refPageId: '' },
      { id: '', name: '', key: '', type: '', path: '', pageId: '', refPageId: '' }
    ]
  }
})

const profileMock = Mock.mock({
  code: 'SUCCESS',
  msg: '成功',
  data: {
    nickname: 'Mock用户',
    icon: null,
    depart: null
  }
})

const mockData = [
  { path: '/basic/frame/resource', method: 'get', mock: resourceMock },
  { path: '/basic/frame/profile', method: 'get', mock: profileMock }
]

export default mockData
