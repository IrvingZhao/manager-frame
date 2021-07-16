import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { App } from 'vue'
import UrlTemplate from '../utils/UrlTemplate'
import Util from '../utils/Util'
import {
  AxiosInstanceConfig,
  HeadGetter,
  LoadingOperator,
  ErrorNotification,
  AxiosOption,
  MockAxiosInstance,
  ResponseData,
  AxiosStateOption
} from './define'

let GLOBAL_LOAD_OPERATOR: LoadingOperator
let GLOBAL_ERROR_NOTIFICATION: typeof ErrorNotification
const GLOBAL_HEADER_GETTER: HeadGetter[] = []
let GLOBAL_SUCCESS_CODE: string
let GLOBAL_APP: App
const $HTTP_CACHE: { [key: string]: MockAxiosInstance } = {}
let GLOBAL_AXIOS: MockAxiosInstance
const GLOBAL_STATE_OPERATOR: AxiosStateOption = {}

class ResponseDataWrap<T> implements ResponseData<T> {
  constructor(resData) {
    this.data = resData.data
    this.code = resData.code
    this.msg = resData.msg
  }

  private readonly code: string

  private readonly msg: string

  public data: T[] | T

  public checkSuccess(notify): boolean {
    const res = this.code === 'SUCCESS'
    if (res && notify) {
      notify(this.msg)
    }
    return res
  }
}

function buildAxios(config: AxiosInstanceConfig): MockAxiosInstance {
  const requestConfig: AxiosRequestConfig = {
    baseURL: config.basePath,
    transformRequest: config.requestFormat
  }
  const instance: MockAxiosInstance = axios.create(requestConfig)
  const notification = config.errorNotification || GLOBAL_ERROR_NOTIFICATION
  const loadOperator = config.loadingOperator || GLOBAL_LOAD_OPERATOR
  const headerGetters = [...GLOBAL_HEADER_GETTER]
  const stateOperators = { ...GLOBAL_STATE_OPERATOR }
  Object.entries(config.stateOperator || {}).forEach(([k, v]) => {
    stateOperators[k] = v
  })
  if (config.headGetter) {
    headerGetters.push(config.headGetter)
  }
  // 请求拦截
  instance.interceptors.request.use((cfg: AxiosRequestConfig) => {
    const interConfig = cfg
    loadOperator.start()
    // 设置请求头
    const headArray = headerGetters.map((item) => item())
    const head = Util.merge({}, ...headArray)
    Object.entries(head).forEach(([k, v]) => {
      interConfig.headers[k] = v
    })
    // 设置url
    if (interConfig.url) {
      interConfig.url = UrlTemplate.parse(interConfig.url).expand(interConfig.params)
    }
    return interConfig
  })

  function notifyResult(res) {
    const { status } = res
    const { code, msg } = res.data
    if (status === 200) {
      if (code === GLOBAL_SUCCESS_CODE) {
        loadOperator.finish()
      } else {
        loadOperator.error()
        if (msg) {
          notification(msg)
        }
      }
    } else {
      loadOperator.error()
      const operator = stateOperators[status]
      if (operator) {
        operator()
      } else if (msg) {
        notification(msg)
      }
    }
  }

  // 响应拦截
  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      notifyResult(res)
      return new ResponseDataWrap(res.data) as any
    },
    (error) => {
      notifyResult(error.response)
      return new ResponseDataWrap(error.response.data) as any
    }
  )
  return instance
}

export default {
  install(app: App, option: AxiosOption) {
    GLOBAL_APP = app
    GLOBAL_ERROR_NOTIFICATION = option.errorNotification || (() => undefined)
    if (option.headGetter) {
      if (option.headGetter instanceof Array) {
        GLOBAL_HEADER_GETTER.push(...option.headGetter)
      } else {
        GLOBAL_HEADER_GETTER.push(option.headGetter)
      }
    }
    GLOBAL_LOAD_OPERATOR = option.loadOperator || {
      start: () => undefined,
      finish: () => undefined,
      error: () => undefined
    }

    GLOBAL_SUCCESS_CODE = option.successCode || ''
    Object.entries(option.stateOperator || {}).forEach(([k, v]) => {
      GLOBAL_STATE_OPERATOR[k] = v
    })

    GLOBAL_APP.config.globalProperties.$http = $HTTP_CACHE
  },
  createAxios(config: AxiosInstanceConfig, key?: string) {
    const instance = buildAxios(config)
    if (key) {
      $HTTP_CACHE[key] = instance
    } else {
      GLOBAL_APP.config.globalProperties.$axios = instance
      GLOBAL_AXIOS = instance
    }
  },
  getAxios(key?: string) {
    if (key) {
      return $HTTP_CACHE[key]
    }
    return GLOBAL_AXIOS
  }
}
