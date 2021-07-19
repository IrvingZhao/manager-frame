export interface LoadingBarProps {
  /**
   * 成功颜色
   * */
  color: string
  /**
   * 失败颜色
   * */
  failedColor: string
  /**
   * 高度
   * */
  height: number
}

export interface LoadingBarUpdate {
  percent?: number
  status?: string
  show?: boolean
}

export interface LoadingBarInstance {
  update(options: LoadingBarUpdate): void

  destroy(): void
}

export interface LoadingBarOptions extends LoadingBarProps {
  /**
   * 加载条 关闭时的延迟时间
   * */
  duration: number
}

export interface LoadingBarOperator {
  start(): void

  update(percent: number): void

  finish(): void

  error(): void

  config(options: LoadingBarOptions): void

  destroy(): void
}
