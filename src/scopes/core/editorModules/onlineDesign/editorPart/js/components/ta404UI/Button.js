import { getTemplate, getSlotContent, getStringTypeAttr } from '../index.js'
var handle = function(_attr, _slots) {
  //定义默认属性
  let attributes = {
      value: {
        type: 'text',
        value: 'Button'
      },
      type: {
        type: 'selection',
        items: ['primary','dashed', 'danger',''],
        value: ''
      },
      size: {
        type: 'selection',
        items: ['large', 'small', ''],
        value: ''
      },
      shape: {
        type: 'selection',
        items: ['circle', ''],
        value: ''
      },
      block: {
        type: 'boolean',
        value: false
      },
      ['html-type']: {
        type: 'selection',
        items: ['button', 'submit', 'reset'],
        value: ''
      },
      disabled: {
        type: 'boolean',
        value: false
      },
      loading: {
        type: 'boolean',
        value: false
      },
      icon: {
        type: 'text',
        value: ''
      },
      click:{
        type: 'text',
        value: '',
        isEvent:true
      }
    },
    slots = {
      default: []
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
  // let template = `<ta-button draggable="true"  @dragstart="dragStart"
  let template = `<ta-button 
                        ${stringAttr}>
                        ${subContent||attributes.value.value}
                    </ta-button>`

  //删除自定义非ui属性
  template = template.replace(`value="${attributes.value.value}"`, '')

  return { template, attributes, slots }
}
export default handle
