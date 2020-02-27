import ta404UI from  './ta404UI'

//获取组件模板
let getTemplate=function (info,attr={},slots={}) {
   let component;
   switch (info.ui) {
     case 'ta404UI':
       component=ta404UI[info.name](attr,slots,info)
       break
   }
  //为了不让二次获取模板时丢失slot信息
  component.slot = component.attributes.slot.value

  //为了不让slot出现在属性面板
  delete component.attributes.slot

  //没有class属性的，添加class属性
  if (!component.attributes.class) {
    component.attributes.class = {
      type: 'text',
      value: ''
    }
  }

  //添加组件标识 (info.id是唯一标识)
  component.template = component.template.replace(' ', ' data-component-active tabIndex="0" ')

  component.info = info

  return component

}

let getSlotContent = function(slots) {
  let inner = ''
  let components = JSON.parse(JSON.stringify(_Vue.$store.state.online.components))
  Object.keys(slots).forEach(slot => {
    slots[slot].forEach(({ id }) => {
      let component = components.find(component => component.info.id === id)
      let children = []
      Object.keys(component.slots).forEach(slot => {
        component.slots[slot].forEach(item => children.push(item))
      })

      component.attributes.slot = component.slot //设置当前组件的slot ，getTemplate中根据这个属性设置模板的slot，不存在则不设置
      component = getTemplate(component.info, component.attributes, component.slots)

      //为嵌套的组件添加id属性 具备id属性 才能选中后属性视图内容变更
      if (component.template.indexOf(`id="${id}"`) == -1)
        component.template = component.template.replace(' ', ` id="${id}" `)

      inner += component.template
    })
  })
  return inner
}
let getStringTypeAttr = function(attributes) {

  // value为空的不添加到模板中
  let stringAttr = ''
  Object.keys(attributes).forEach(key => {
    let attrKey
    let arr = ['text', 'selection', 'icon','ionicon', 'color'] //这些类型都不用加bind

    if (arr.includes(attributes[key].type) || attributes[key].notBind) {
      attrKey = key
    } else {
      attrKey = `:${key}`
    }
    if(attributes[key].isEvent){
      attrKey = `@${key}`
    }
    let attr = attributes[key].value ? `${attrKey}="${attributes[key].value}"\n` : ''
    stringAttr += attr
  })
  return stringAttr
}
export { getSlotContent, getTemplate, getStringTypeAttr }
