import Vue from 'vue'
import preview from '../preview'

var guid = function () { // 获取随机ID，组件拖到预览视图后就会被设置个ID
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4()
}
var mount = function (id, _component) { // 解析生成vue组件
  let components = _Vue.$store.state.online.components
  let component = components.find(c => c.info.id === id)
  return new Promise((resolve, reject) => {
    // 需要延迟才能取到document.getElementById(id)
    setTimeout(() => {
      let data = {}
      if (_component.attributes) {
        Object.keys(_component.attributes).forEach(key => {
          data[key] = _component.attributes[key].value
        })
      }

      if (component.uid) { // 销毁旧实例

      }
      // 去掉点击事件们
      let temp = _component.template.replace(/@.*/g, '')
      let vm = new Vue({
        name: id.toString(),
        data () {
          return data
        },
        template: temp,
        el: document.getElementById(id),
        mounted () {
          this.$el.id = id
          if (component) {
            component.uid = this._uid
          }

          // 添加选中效果
          let info = _Vue.$store.state.online.currentComponent.info
          if (!info) { this.$el.click() }
        },
        methods: {
          dragStart (e) {
            // 自身
            e.dataTransfer.setData('info', JSON.stringify(_Vue.$store.state.online.currentComponent.info))
          }
        }
      })
      resolve(vm)
    }, 200)
  })
}
/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep (target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, {
            [key]: {} })
        }
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, {
          [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

export {
  guid,
  mount,
  mergeDeep
}
