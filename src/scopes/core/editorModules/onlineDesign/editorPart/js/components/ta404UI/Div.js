import { getTemplate, getSlotContent, getStringTypeAttr } from '../index.js'
var handle=function (_attr,_slots) {
  //默认属性
  let attributes = {
  }
  let slots = {
    default: []
  }
  //合并属性
  Object.assign(slots, _slots)
  Object.assign(attributes, _attr)
  //根据组件不同需要做的不同操作

  //获取插槽模板内容
  var subContent = getSlotContent(slots) || '&nbsp;'
  //设置当前组件的slot
  if (attributes.slot && attributes.slot !== 'default') {
    attributes.slot = {
      type: 'text',
      value: attributes.slot
    }
  } else {
    attributes.slot = {
      type: 'text',
      value: ''
    }
  }

  //字符串模板操作
  let stringAttr = getStringTypeAttr(attributes)
  let template = `<div ${stringAttr} style="height:100px;border:1px solid red;width: 200px">
                        ${subContent}
                    </div>`

  template = template.replace(/text=".*?"/g, '') //模板字符串中删除text属性

  return { template, attributes, slots }
}
export default handle
