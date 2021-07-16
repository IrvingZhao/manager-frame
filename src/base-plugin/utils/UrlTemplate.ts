export default {
  encodeReserved(str: string): string {
    return str
      .split(/(%[0-9A-Fa-f]{2})/g)
      .map((part) => {
        if (!/%[0-9A-Fa-f]/.test(part)) {
          return encodeURI(part).replace(/%5B/g, '[').replace(/%5D/g, ']')
        }
        return part
      })
      .join('')
  },

  encodeUnreserved(str: string): string {
    return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
      return `%${c.charCodeAt(0).toString(16).toUpperCase()}`
    })
  },

  encodeValue(operator: string, value: string, key?: string): string {
    const result = operator === '+' || operator === '#' ? this.encodeReserved(value) : this.encodeUnreserved(value)

    if (key) {
      return `${this.encodeUnreserved(key)}=${result}`
    }
    return result
  },

  isDefined(value: any): boolean {
    return value !== undefined && value !== null
  },

  isKeyOperator(operator: string): boolean {
    return operator === ';' || operator === '&' || operator === '?'
  },

  getValues(context: any, operator: string, key: string, modifier: string): string[] {
    let value = context[key]
    const result: string[] = []

    if (this.isDefined(value) && value !== '') {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        value = value.toString()

        if (modifier && modifier !== '*') {
          value = value.substring(0, parseInt(modifier, 10))
        }

        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : undefined))
      } else if (modifier === '*') {
        if (Array.isArray(value)) {
          value.filter(this.isDefined).forEach((itemValue) => {
            result.push(this.encodeValue(operator, itemValue, this.isKeyOperator(operator) ? key : undefined))
          })
        } else {
          Object.keys(value).forEach((k) => {
            if (this.isDefined(value[k])) {
              result.push(this.encodeValue(operator, value[k], k))
            }
          })
        }
      } else {
        const tmp: string[] = []

        if (Array.isArray(value)) {
          value.filter(this.isDefined).forEach((itemValue) => {
            tmp.push(this.encodeValue(operator, itemValue))
          })
        } else {
          Object.keys(value).forEach((k) => {
            if (this.isDefined(value[k])) {
              tmp.push(this.encodeUnreserved(k))
              tmp.push(this.encodeValue(operator, value[k].toString()))
            }
          })
        }

        if (this.isKeyOperator(operator)) {
          result.push(`${this.encodeUnreserved(key)}=${tmp.join(',')}`)
        } else if (tmp.length !== 0) {
          result.push(tmp.join(','))
        }
      }
    } else if (operator === ';') {
      if (this.isDefined(value)) {
        result.push(this.encodeUnreserved(key))
      }
    } else if (value === '' && (operator === '&' || operator === '?')) {
      result.push(`${this.encodeUnreserved(key)}=`)
    } else if (value === '') {
      result.push('')
    }
    return result
  },

  parse(template: string): { expand: (context: any) => string } {
    const operators = ['+', '#', '.', '/', ';', '?', '&']
    const getValues = this.getValues.bind(this)
    const encodeReserved = this.encodeReserved.bind(this)

    return {
      expand(context: any) {
        return template.replace(/{([^{}]+)}|([^{}]+)/g, (_, expression, literal) => {
          let curExpression = expression
          if (curExpression) {
            let operator: any = null
            const values: string[] = []

            if (operators.indexOf(curExpression.charAt(0)) !== -1) {
              operator = curExpression.charAt(0)
              curExpression = curExpression.substr(1)
            }

            curExpression.split(/,/g).forEach((variable: string) => {
              const tmp = /([^:*]*)(?::(\d+)|(\*))?/.exec(variable)
              if (tmp) {
                const args = getValues(context, operator, tmp[1], tmp[2] || tmp[3])
                // eslint-disable-next-line no-param-reassign
                context[tmp[1]] = null
                values.push(...args)
              }
            })

            if (operator && operator !== '+') {
              let separator = ','

              if (operator === '?') {
                separator = '&'
              } else if (operator !== '#') {
                separator = operator
              }
              return (values.length !== 0 ? operator : '') + values.join(separator)
            }
            return values.join(',')
          }
          return encodeReserved(literal)
        })
      }
    }
  }
}
