function prefixZero(data: number, length: number): string {
  const result: string[] = []
  const dataStr = data.toString()
  const numberLength = dataStr.length
  for (let i = 0; i < length - numberLength; i += 1) {
    result.push('0')
  }
  result.push(dataStr)
  return result.join('')
}

const formatConfig: { [key: string]: (date: Date, length: number) => string } = {
  y(date, length) {
    return date.getFullYear().toString().substr(-length, length)
  },
  /**
   * @return {string}
   */
  M(date, length) {
    const month = date.getMonth() + 1
    return length === 1 ? month.toString() : prefixZero(month, 2)
  },
  d(date, length) {
    const dateNum = date.getDate()
    return length === 1 ? dateNum.toString() : prefixZero(dateNum, 2)
  },
  /**
   * @return {string}
   */
  H(date, length) {
    const hour = date.getHours()
    return length === 1 ? hour.toString() : prefixZero(hour, 2)
  },
  m(date, length) {
    const minutes = date.getMinutes()
    return length === 1 ? minutes.toString() : prefixZero(minutes, 2)
  },
  s(date, length) {
    const seconds = date.getSeconds()
    return length === 1 ? seconds.toString() : prefixZero(seconds, 2)
  },
  /**
   * @return {string}
   */
  S(date, length) {
    const milliseconds = date.getMilliseconds()
    return milliseconds.toString().substr(0, length)
  }
}

export default function dateFormat(date: Date | number | string, pattern: string): string {
  let formatDate
  if (!pattern) {
    throw new SyntaxError('pattern is null')
  }
  if (!date) {
    return ''
  }
  if (date instanceof Date) {
    formatDate = date
  } else {
    formatDate = new Date(date)
  }
  const resultArray: string[] = []
  const patternLength = pattern.length
  let nowLetter = ''
  let repeatLength = 0
  for (let i = 0; i < patternLength; i += 1) {
    const itemLetter = pattern[i]
    if (itemLetter === nowLetter) {
      repeatLength += 1
    } else {
      if (formatConfig[nowLetter]) {
        resultArray.push(formatConfig[nowLetter](formatDate, repeatLength))
      }
      if (formatConfig[itemLetter]) {
        nowLetter = itemLetter
        repeatLength = 1
      } else {
        nowLetter = ''
        repeatLength = 0
        resultArray.push(itemLetter)
      }
    }
  }
  if (formatConfig[nowLetter]) {
    resultArray.push(formatConfig[nowLetter](formatDate, repeatLength))
  }
  return resultArray.join('')
}
