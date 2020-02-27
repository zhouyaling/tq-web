import { getTemplate, getSlotContent, getStringTypeAttr } from '../editorPart/js/components/index'
import {mergeDeep } from '../editorPart/js/tool.js'
const moduleStore = {
  state: {
    onlineCode: {
      templateContent: ``,
      templateName: ``,
      templateType: ``,
      templateId: ``
    },
    components: [], // 组件s
    css: '', // 用户编辑的自定义css字符串
    js: ` //1.js在预览页面不会被解析
          //2.请按照格式来  
            export default {
              data() {
                return {}
              },
              computed: {},
              created() {
              },
              mounted() {
              },
              methods: {},
              watch: {}
            }`,
    currentComponent: {}, // 当前预览选中的组件
    backupComponents: [], // 备份的组件
    copiedComponents: [], // 复制的组件
  },
  getters: {
    getOnlineCode: (state) => {
      return state.onlineCode
    },
    getState: (state) => {
      return state
    }
  },
  mutations: {
    setState (state, obj) {
      Object.assign(state, obj)

      // 保存本地
      // localStorage.store = JSON.stringify(state)
    },
    setOnlineCode (state, value) {
      state.onlineCode = Object.assign(state.onlineCode, value || {})
    }
  },
  actions: {
    delComponent (context, id) {
      // 删除前备份一份
      context.commit('setState', { backupComponents: JSON.parse(JSON.stringify(context.state.components)) })

      let components = context.state.components
      let index = components.findIndex(c => c.info.id === id)
      let component = components[index]
      // 从父组件的slots中删除
      if (component.parentId) {
        let parent = components.find(c => c.info.id === component.parentId)
        let slot = parent.slots[component.slot || component.attributes.slot || 'default']
        let i = slot.findIndex(item => item.id === component.info.id)
        // 删除
        slot.splice(i, 1)

        // 递归获取最父级组件
        let getTop = function (_component) {
          if (_component.parentId) {
            let c = components.find(c => c.info.id === _component.parentId)
            return getTop(c)
          } else {
            return _component
          }
        }

        // 更新模板
        let top = getTop(parent)
        top.template = getTemplate(top.info, top.attributes, top.slots).template
      }
      // 删除当前组件所有子组件
      function delChildren (component) {
        let slots = component.slots
        Object.keys(slots).forEach(slot => {
          if (component.slots[slot].length) {
            component.slots[slot].forEach(val => {
              let childIndex = components.findIndex(c => c.info.id === val.id)
              let hasChild
              if (childIndex >= 0) {
                hasChild = Object.keys(components[childIndex].slots).every(slot => {
                  return components[childIndex].slots[slot].length > 0
                })
              }
              if (hasChild) { delChildren(components[childIndex]) }
              components.splice(childIndex, 1)
            })
          }
        })
      }
      delChildren(component)
      // 删除自身
      index = components.findIndex(c => c.info.id === id) // components已被更新 重新获取索引
      components.splice(index, 1)// 这个更新在严格模式下回报错不过是没有问题的
      // 更新
      context.commit('setState', { currentComponent: {}, components })
      return Promise.resolve(components)
    }
  }
}

export default moduleStore
