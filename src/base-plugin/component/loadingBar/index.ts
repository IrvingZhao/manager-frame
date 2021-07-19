import { newInstance } from './LoadingBar'
import { LoadingBarInstance, LoadingBarOperator, LoadingBarOptions, LoadingBarUpdate } from './define'

let loadingBarInstance: LoadingBarInstance | null
let color = 'primary'
let duration = 800
let failedColor = 'error'
let height = 2
let timer: any

function getLoadingBarInstance() {
  loadingBarInstance =
    loadingBarInstance ||
    newInstance({
      color,
      failedColor,
      height
    })

  return loadingBarInstance
}

function update(options: LoadingBarUpdate) {
  const instance = getLoadingBarInstance()

  instance.update(options)
}

function hide() {
  setTimeout(() => {
    update({
      show: false,
      percent: 0
    })
  }, duration)
}

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

export default {
  start() {
    if (timer) {
      return
    }
    let percent = 0
    update({
      percent,
      status: 'success',
      show: true
    })
    timer = setInterval(() => {
      percent += Math.floor(Math.random() * 3 + 1)
      if (percent > 95) {
        clearTimer()
      }
      update({
        percent,
        status: 'success',
        show: true
      })
    }, 200)
  },
  update(percent: number) {
    clearTimer()
    update({
      percent,
      status: 'success',
      show: true
    })
  },
  finish() {
    clearTimer()
    update({
      percent: 100,
      status: 'success',
      show: true
    })
    hide()
  },
  error() {
    clearTimer()
    update({
      percent: 100,
      status: 'error',
      show: true
    })
    hide()
  },
  config(options: LoadingBarOptions) {
    if (options.color) {
      color = options.color
    }
    if (options.duration) {
      duration = options.duration
    }
    if (options.failedColor) {
      failedColor = options.failedColor
    }
    if (options.height) {
      height = options.height
    }
  },
  destroy() {
    clearTimer()
    const instance = getLoadingBarInstance()
    loadingBarInstance = null
    instance.destroy()
  }
}

export { LoadingBarOperator, LoadingBarOptions }
