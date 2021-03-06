import {getTemplate, getSlotContent, getStringTypeAttr} from '../index.js'

var handle = function (_attr, _slots) {
  //定义默认属性
  let attributes = {
      disabled: {
        type: 'boolean',
        value: false
      },
      size: {
        type: 'selection',
        items: ['small', 'large', 'middle', ''],
        value: ''
      },
      type: {
        type: 'selection',
        items: ['search', '', 'middle', ''],
        noBind: true
      }
    },
    slots = {
      default: []
      // addonAfter:[],
      // addonBefore:[],
      // prefix:[],
      // suffix:[]
    }

  //覆盖默认属性
  Object.assign(slots, _slots)
  Object.assign(attributes, _attr)

  //根据组件不同需要做的不同操作


  //获取插槽模板内容
  var subContent = getSlotContent(slots)
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
  let template = `<ta-input 
                        ${stringAttr}>
                        ${subContent}
                    </ta-input >`


  return {template, attributes, slots}
}
export default handle
