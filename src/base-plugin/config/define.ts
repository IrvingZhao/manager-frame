import { RouteRecordRaw } from 'vue-router'
import { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosTransformer } from 'axios'

// ================== bread 配置

export interface ItemBread {
  path?: string
  click?: typeof Function
  name: string
}

export interface BreadStoreState {
  pageBread: ItemBread[]
  menuBread: ItemBread[]
}

export interface BreadOperator {
  /**
   * 设置面包屑
   * @param breads 面包屑信息
   * */
  set(breads: ItemBread[] | null | undefined): void

  append(breads: ItemBread | ItemBread[]): void

  clear(): void

  splice(index: number): void

  getBread(): ItemBread[]
}

// ================== api 配置 类型
/**
 * 加载条操作
 * */
export interface LoadingOperator {
  /**
   * 开始
   * */
  start(): void

  /**
   * 成功
   * */
  finish(): void

  /**
   * 错误
   * */
  error(): void
}

/**
 * 请求头获取器
 * */
export type HeadGetter = () => { [key: string]: string }

/**
 * 错误消息通知执行器
 * */
export declare function ErrorNotification(message: string): void

export interface AxiosStateOption {
  [key: number]: () => void
}

export interface AxiosInstanceConfig {
  /**
   * 前缀
   * */
  basePath?: string
  /**
   * 成功的编码
   * */
  successCode?: string
  /**
   * loading 操作，默认走全局
   * */
  loadingOperator?: LoadingOperator
  /**
   * 头信息获取
   * <p>追加并覆盖全局</p>
   * */
  headGetter?: HeadGetter
  /**
   * 错误通知，默认走全局
   * */
  errorNotification?: typeof ErrorNotification
  /**
   * 请求体格式化
   * */
  requestFormat?: AxiosTransformer | AxiosTransformer[]
  /**
   * 错误码执行
   * */
  stateOperator?: AxiosStateOption
}

/**
 * axios 全局配置
 * */
export interface AxiosOption {
  loadOperator?: LoadingOperator
  errorNotification?: typeof ErrorNotification
  headGetter?: HeadGetter | HeadGetter[]
  successCode?: string
  stateOperator?: AxiosStateOption
}

/**
 * 响应数据
 * */
export interface ResponseData<T> {
  /**
   * 数据
   * */
  data: T[] | T

  /**
   * 检查成功
   * @return true 成功，false 失败
   * @param notify
   * */
  checkSuccess(notify?: (msg: string) => void): boolean
}

/**
 * axios mock 配置
 * */
export interface MockAxiosInstance extends AxiosInstance {
  (config: AxiosRequestConfig): AxiosPromise

  (url: string, config?: AxiosRequestConfig): AxiosPromise

  defaults: AxiosRequestConfig

  getUri(config?: AxiosRequestConfig): string

  request<T = any, R = ResponseData<T>>(config: AxiosRequestConfig): Promise<R>

  get<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>

  delete<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>

  head<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>

  post<T = any, R = ResponseData<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>

  put<T = any, R = ResponseData<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>

  patch<T = any, R = ResponseData<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
}

// ======================= 路由配置 类型

export interface RouteState {
  prePath?: string
}

export interface StoreRootState {
  route: RouteState
  bread: BreadStoreState
}

/**
 * 路由配置信息
 * */
export interface RouteOption {
  /**
   * 路由配置
   * */
  routes: RouteRecordRaw[]
  /**
   * 根路径
   * */
  base: string
  /**
   * 历史记录方式，默认 history
   * */
  history?: 'hash' | 'history' | 'memory'
  /**
   * 是否自动滚动，默认false
   * */
  autoScroll?: boolean
}

export interface RouteOperator {
  replacePrePath(): void
}

// ========================= install 配置
export interface ConfigOption {
  routeOption: RouteOption
  axiosOption: AxiosOption
}
