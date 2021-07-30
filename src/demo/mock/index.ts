import Mock from 'mockjs'
import Basic from './basic'

Basic.forEach((item) => {
  Mock.mock(`/api${item.path}`, item.method, item.mock)
})
