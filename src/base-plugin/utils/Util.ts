import dateFormat from './DateFormatter'

const { sessionStorage } = window
let SCROLL_BAR_WIDTH: number | null = null

export default {
  /**
   * 根据路径获取对象中的数据
   * @return 获取的数据
   * @param obj 对象
   * @param path 路径
   * */
  getValueByPath(obj: any, path: string): any {
    const paths = path.split('.')
    return paths.reduce((pre, cur) => {
      if (!pre) {
        return undefined
      }
      return pre[cur]
    }, obj)
  },

  /**
   * 合并对象，不修改target对象
   * @param target 目标对象
   * @param modify 是否修改当前
   * @param args 数据来源
   * */
  merge(target: any, modify: boolean = false, ...args: any[]): any {
    let result
    if (modify) {
      result = target
    } else {
      result = { ...target }
    }
    args.forEach((source) => {
      Object.entries({ ...source }).forEach(([k, v]) => {
        if (v !== undefined) {
          result[k] = v
        }
      })
    })
    return result
  },

  /**
   * 获取滚动条宽度
   * */
  getScrollBarWidth(): number {
    if (SCROLL_BAR_WIDTH !== null) {
      return SCROLL_BAR_WIDTH
    }

    const outer = document.createElement('div')
    outer.className = 'el-scrollbar__wrap'
    outer.style.visibility = 'hidden'
    outer.style.width = '100px'
    outer.style.position = 'absolute'
    outer.style.top = '-9999px'
    document.body.appendChild(outer)

    const widthNoScroll = outer.offsetWidth
    outer.style.overflow = 'scroll'

    const inner = document.createElement('div')
    inner.style.width = '100%'
    outer.appendChild(inner)

    const widthWithScroll = inner.offsetWidth
    document.body.removeChild(outer)
    // outer.parentNode.removeChild(outer);
    SCROLL_BAR_WIDTH = widthNoScroll - widthWithScroll

    return SCROLL_BAR_WIDTH
  },

  /**
   * 继承，不修改 to 对象
   * @param to 目标对象
   * @param from 来源
   * */
  extend(to: any, from: any): any {
    const result = { ...to }
    Object.entries({ ...from }).forEach(([k, v]) => {
      result[k] = v
    })
    return result
  },
  /**
   * 数组中的对象合并
   * @param arr 对象数组
   * */
  toObject(arr: any[]): any {
    const res = {}
    arr.forEach((item) => {
      this.extend(res, item)
    })
    return res
  },
  /**
   * 写入 sessionStorage 数据
   * @param key 数据key
   * @param value 数据值
   * */
  setItem(key: string, value: any): void {
    if (!key) {
      throw new Error('cache key cannot be null')
    }
    if (sessionStorage) {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  },
  /**
   * 读取 sessionStorage 数据
   * @param key 数据key
   * @return 数据
   * */
  getItem(key: string): any {
    if (!key) {
      throw new Error('cannot get data from null key')
    }
    if (sessionStorage) {
      const data = sessionStorage.getItem(key)
      return data ? JSON.parse(data) : data
    }
    return null
  },
  /**
   * 清空 sessionStorage
   * */
  clearStorage(): void {
    if (sessionStorage) {
      sessionStorage.clear()
    }
  },
  /**
   * 格式化时间，格式为：yyyy-MM-dd
   * @param date 时间
   * @return 格式化后的内容
   * */
  getSimpleDate(date: Date | number | string): string {
    return dateFormat(date, 'yyyy-MM-dd')
  },
  /**
   * 格式化时间，格式为：yyyy-MM-dd HH:mm:ss
   * @param date 时间
   * @return 格式化后的内容
   * */
  getFullDate(date: Date | number | string): string {
    return dateFormat(date, 'yyyy-MM-dd HH:mm:ss')
  },
  /**
   * 格式化时间
   * @param date 时间
   * @param pattern 格式
   * @return 格式化后的内容
   * */
  dateFormat(date: Date | number | string, pattern: string): string {
    return dateFormat(date, pattern)
  }
}
