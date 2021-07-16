/**
 * 下载工具类
 * */
export interface DownloadUtil {
  /**
   * 下载文件
   * @param blob 文件内容
   * @param name 文件名
   * */
  downloadFile(blob: Blob, name: string): void

  /**
   * 下载文件
   * @param link 文件地址
   * @param name 文件名称
   * */
  downloadLink(link: string, name: string): void
}

/**
 * 树形数据生成配置
 * */
export interface GenerateTreeOption {
  /**
   * 返回对象中的父节点属性key，locales,null,"" 则不设置父节点属性
   * */
  parentNodeKey?: string
  /**
   * 数组转map对象，生成树节点时，可同时，将列表数据放入map中
   * */
  mapCache?: any
  /**
   * 对象id属性key 默认为 id
   * */
  idKey?: string
  /**
   * 对象父节点id属性key，默认为 parent
   * */
  parentKey?: string
  /**
   * 子节点属性key，默认为 children
   * */
  childrenKey?: string
  /**
   * 结果写入对象
   * */
  result?: any[]
  /**
   * 遍历时，每个对象调用，设置对象使用
   * */
  loop?: (item: any) => void
}

/**
 * 树路径获取
 * */
export interface TreePathConfig {
  /**
   * 父节点对象的属性名,默认为 parentNode
   * */
  parentNodeKey?: string
  /**
   * 返回结果是否包含当前节点,默认为 true
   * */
  hasCurrent?: boolean
  /**
   * 添加到返回结果的属性,默认为整个节点
   * */
  dataKey?: string
  /**
   * 属性获取器，优先级大于 dataKey
   * */
  dataGetter?: (item: any) => any
}

export interface TreeQueryOption {
  key: string
  value: any
  childrenNode?: string
}

export interface TreeUtil {
  /**
   * 生成树型数据
   * @param data 列表数据
   * @param config 生成配置
   * */
  generateTree(data: any[], config?: GenerateTreeOption): any[]

  /**
   * 获取树路径
   * @param data 树节点
   * @param config 获取配置
   * */
  getTreePath(data: any, config?: TreePathConfig): any[]

  /**
   * 设置当前节点及子节点属性
   * @param current 当前节点
   * @param propKey 属性key
   * @param propValue 属性值
   * @param childrenNode 子节点，默认为：children
   * */
  setCurrentAndChildProp(current: any, propKey: string, propValue: any, childrenNode?: string): void

  /**
   * 获得当前节点及子节点的某个属性，并返回数组
   * @param current 当前节点
   * @param propKey 获取的属性key
   * @param childrenNode 子节点属性key，默认为：children
   * @return Array 属性列表
   */
  getCurrentAndChildProp(current: any, propKey: string, childrenNode?: string): any[]

  /**
   * 根据参数，查询单个数据
   * @param tree 树形数据
   * @param option 查询配置
   * @return 查询结果
   * */
  queryTreeNode(tree: any[], option: TreeQueryOption): any
}

/**
 * 地址格式化
 * */
export interface UrlTemplateInterface {
  encodeReserved(str: string): string

  encodeUnreserved(str: string): string

  encodeValue(operator: string, value: string, key?: string): string

  isDefined(value: any): boolean

  isKeyOperator(operator: string): boolean

  getValues(context: any, operator: string, key: string, modifier: string): string[]

  parse(template: string): { expand: (context: any) => string }
}

/**
 * 工具类
 * */
export interface Utils {
  /**
   * 合并对象
   * @param target 目标对象
   * @param args 数据来源
   * */
  merge(target: any, ...args: any[]): any

  /**
   * 获取滚动条宽度
   * */
  getScrollBarWidth(): number

  /**
   * 继承
   * @param to 目标对象
   * @param from 来源
   * */
  extend(to: any, from: any): any

  /**
   * 数组中的对象合并
   * @param arr 对象数组
   * */
  toObject(arr: any[]): any

  /**
   * 写入 sessionStorage 数据
   * @param key 数据key
   * @param value 数据值
   * */
  setItem(key: string, value: any): void

  /**
   * 读取 sessionStorage 数据
   * @param key 数据key
   * @return 数据
   * */
  getItem(key: string): any

  /**
   * 清空 sessionStorage
   * */
  clearStorage(): void

  /**
   * 格式化时间，格式为：yyyy-MM-dd
   * @param date 时间
   * @return 格式化后的内容
   * */
  getSimpleDate(date: Date | number | string): string

  /**
   * 格式化时间，格式为：yyyy-MM-dd HH:mm:ss
   * @param date 时间
   * @return 格式化后的内容
   * */
  getFullDate(date: Date | number | string): string

  /**
   * 格式化时间
   * @param date 时间
   * @param pattern 格式
   * @return 格式化后的内容
   * */
  dateFormat(date: Date | number | string, pattern: string): string
}

/**
 * websocket 连接配置
 * */
export interface ConnectAddress {
  /**
   * 协议，默认跟随浏览器
   * */
  protocol?: string
  /**
   * 连接域名，默认跟随访问地址
   * */
  host?: string
  /**
   * 连接地址，默认为：/socket/push
   * */
  path?: string
  /**
   * 连接端口
   * */
  port?: number
}

/**
 * websocket 通知工具类
 * */
export interface WebSocket {
  /**
   * 连接
   * @param token 认证信息
   * @param connectAddress 链接地址配置
   * */
  connect(token: string, connectAddress?: ConnectAddress): void

  /**
   * 断开连接
   * */
  disConnect(): void

  /**
   * 添加消息监听
   * @param type 消息类型
   * @param handle 消息执行器
   * */
  addMessageHandle(type: string, handle: (data: any) => void): void

  /**
   * 注销消息监听器
   * @param type 消息类型
   * @param handle 注册时的消息执行器对象
   * */
  removeMessageHandle(type: string, handle: (data: any) => void): void
}
