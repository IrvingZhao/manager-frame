import { GenerateTreeOption, TreePathConfig, TreeQueryOption } from './define'

export default {
  /**
   * 生成树型数据
   * @param data 列表数据
   * @param config 生成配置
   * */
  generateTree(data: any[], config?: GenerateTreeOption): any[] {
    const parentNodeKey = config ? config.parentNodeKey : null
    const result = config ? config.result || [] : []
    const mapCache = config ? config.mapCache || {} : {}
    const idKey = config ? config.idKey || 'id' : 'id'
    const parentKey = config ? config.parentKey || 'parent' : 'parent'
    const childrenKey = config ? config.childrenKey || 'children' : 'children'
    const itemLoop = config ? config.loop || (() => undefined) : () => undefined

    data.forEach((item) => {
      mapCache[item[idKey]] = item
    })
    data.forEach((item) => {
      itemLoop(item)
      const loopItem = item
      const cacheParentKey = loopItem[parentKey]
      if (cacheParentKey) {
        if (mapCache[cacheParentKey]) {
          if (!mapCache[cacheParentKey][childrenKey]) {
            mapCache[cacheParentKey][childrenKey] = []
          }
          mapCache[cacheParentKey][childrenKey].push(loopItem)
          if (parentNodeKey) {
            loopItem[parentNodeKey] = mapCache[cacheParentKey]
          }
        } else {
          // 如果当前节点的父节点id未找到指定对象，则当前对象作为根节点的自己节点
          result.push(loopItem)
        }
      } else {
        result.push(loopItem)
      }
    })
    return result
  },
  /**
   * 获取树路径
   * @param data 树节点
   * @param config 获取配置
   * */
  getTreePath(data: any, config?: TreePathConfig): any[] {
    const parentNode = config ? config.parentNodeKey || 'parentNode' : 'parentNode'
    const hasCurrent = config ? config.hasCurrent !== false : true
    const dataKey = config?.dataKey
    const dataGetter = config?.dataGetter || (dataKey && ((item) => item[dataKey])) || ((item) => item)
    const pathArr: any[] = []
    let parent = hasCurrent ? data : data[parentNode]
    while (parent) {
      pathArr.push(dataGetter(parent))
      parent = parent[parentNode]
    }
    return pathArr.reverse()
  },
  /**
   * 设置当前节点及子节点属性
   * @param current 当前节点
   * @param propKey 属性key
   * @param propValue 属性值
   * @param childrenNode 子节点
   * */
  setCurrentAndChildProp(current: any, propKey: string, propValue: any, childrenNode = 'children'): void {
    const childArr: any[] = []
    const loopCurrent = current
    loopCurrent[propKey] = propValue
    if (loopCurrent[childrenNode]) {
      loopCurrent[childrenNode].forEach((item: any) => {
        childArr.push(item)
      })
    }
    while (childArr.length > 0) {
      const childItem = childArr.pop()
      childItem[propKey] = propValue
      if (childItem[childrenNode]) {
        childItem[childrenNode].forEach((item: any) => {
          childArr.push(item)
        })
      }
    }
  },
  /**
   * 获得当前节点及子节点的某个属性，并返回数组
   * @param current 当前节点
   * @param propKey 获取的属性key
   * @param childrenNode 子节点属性key，默认为 children
   * @return Array 属性列表
   */
  getCurrentAndChildProp(current: any, propKey: string, childrenNode = 'children'): any[] {
    const result: any[] = []
    if (current[propKey]) {
      result.push(current[propKey])
    }
    const childArr: any[] = [...current[childrenNode]]
    let childItem = childArr.shift()
    while (childItem) {
      if (childItem[propKey]) {
        result.push(childItem[propKey])
      }
      if (childItem[childrenNode]) {
        childItem[childrenNode].forEach((item: any) => {
          childArr.push(item)
        })
      }
      childItem = childArr.shift()
    }
    return result
  },
  /**
   * 根据参数，查询单个数据
   * @param tree 树形数据
   * @param tree 树形数据
   * @param option 查询配置
   * @return 查询结果
   * */
  queryTreeNode(tree: any[], option: TreeQueryOption): any {
    const childrenNode = option.childrenNode || 'children'
    const dataArr: any = [...tree]
    let item = dataArr.shift()
    while (item) {
      if (item[option.key] === option.value) {
        return item
      }
      if (item[childrenNode]) {
        dataArr.push(...item[childrenNode])
      }
      item = dataArr.shift()
    }
    return null
  }
}
