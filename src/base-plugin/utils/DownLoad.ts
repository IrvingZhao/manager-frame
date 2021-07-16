export default {
  downloadFile(blob: Blob, name: string): void {
    const reader = new FileReader()
    reader.readAsDataURL(blob) // 转换为base64，可以直接放入a表情href
    reader.addEventListener('load', (e) => {
      const link = document.createElement('a')
      link.download = name
      if (e.target && e.target instanceof FileReader) {
        link.href = (e.target.result || '').toString()
      }
      const body = document.body || document.getElementsByTagName('body')[0]
      body.appendChild(link)
      link.click()
      if (link.remove) {
        link.remove()
      } else {
        body.removeChild(link)
      }
    })
  },
  downloadLink(link: string, name: string): void {
    const a = document.createElement('a')
    a.download = name
    a.href = link
    const body = document.body || document.getElementsByTagName('body')[0]
    body.appendChild(a)
    a.click()
    if (a.remove) {
      a.remove()
    } else {
      body.removeChild(a)
    }
  }
}
