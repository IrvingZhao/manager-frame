import mitt from 'mitt'
import { ConnectAddress } from './define'

const greeter = mitt()

let ws: WebSocket | null = null

export default {
  addMessageHandle(type: string, handle: (data: any) => void): void {
    greeter.on(type, handle)
  },

  removeMessageHandle(type: string, handle: (data: any) => void): void {
    greeter.off(type, handle)
  },

  connect(token: string, connectAddress?: ConnectAddress): void {
    if (ws && ws.readyState === WebSocket.OPEN) {
      return
    }
    const protocol = connectAddress?.protocol || window.location.protocol.replace('http', 'ws')
    const host = connectAddress?.protocol || window.location.host
    const path = connectAddress?.path || '/socket/push'
    const port = connectAddress?.port || ''
    ws = new WebSocket(`${protocol}//${host}${port && `:${port}`}${path}`)
    ws.addEventListener('open', () => {
      if (ws) {
        ws.send(
          JSON.stringify({
            type: 'BIND_TOKEN',
            data: token
          })
        )
      }
    })
    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)
      greeter.emit(data.type, data.data)
    })
  },

  disConnect(): void {
    if (ws) {
      ws.close()
    }
  }
}
