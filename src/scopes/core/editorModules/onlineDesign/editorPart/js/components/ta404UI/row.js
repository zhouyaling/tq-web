import {getTemplate, getSlotContent, getStringTypeAttr} from '../index.js'
import {guid} from '../../tool'
var handle = function (_attr, _slots,{ id }) {
  //定义默认属性
  let attributes = {
      column: {
        type: 'slider',
        max:24,
        min:1,
        value:1,
        children: {}
      },
      align: {
        type: 'selection',
        items: ['top', 'middle', 'bottom', ''],
        value: ''
      },
      gutter: {
        type: 'number',
        value: null,
      },
      justify: {
        type: 'selection',
        items: ['start', 'end', 'center', 'space-around', 'space-between', ''],
        value: ''
      },
      type: {
        type: 'selection',
        items: ['flex', ''],
        value: 'flex'
      }
    },
    slots = {
      default: []
    }

  //覆盖默认属性
  Object.assign(slots, _slots)
  Object.assign(attributes, _attr)

  //根据组件不同需要做的不同操作
  if (attributes.column.value < 0) {
    attributes.column.value = 0
  }
  let max = _attr.column ? _attr.column.value : attributes.column.value
  let components = JSON.parse(JSON.stringify(_Vue.$store.state.online.components))
  let component = components.find(c => c.info.id === id) || { slots }
  let oldSlots = component.slots
  let defaul = [] //default
  let addComponent = (_attr, _slots) => {
    let info = {
      name: 'col',
      ui: 'ta404UI',
      id: guid()
    }
    let colComponent = getTemplate(info, _attr, _slots)
    colComponent.parentId = id
    components.push(colComponent)
    return colComponent
  }
  for (let i = 0; i < max; i++) {
    if (oldSlots.default[i]) {
      defaul.push(oldSlots.default[i])
    } else {
      defaul.push({ id: addComponent().info.id })
    }
  }
  //column数值减少时，子属性要对应的删除
  let arr = oldSlots.default.filter(item => { //得到所有要删除的对象
    return defaul.findIndex(({ id }) => id === item.id) === -1
  })
  arr.forEach(({ id }) => {
    let index = components.findIndex(c => c.info.id === id)
    components.splice(index, 1)
  })
  slots.default = defaul
  _Vue.$store.commit('setState', { components: components })

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
  //自定义方面的属性


  //字符串模板操作
  let stringAttr = getStringTypeAttr(attributes)
  let template = `<ta-row 
                        ${stringAttr}>
                        ${subContent}
                    </ta-row>`

  //删除自定义非ui属性
  template = template.replace(`:column="${attributes.column.value}"`, '')

  return {template, attributes, slots}
}
export default handle
