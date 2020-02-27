<template>
  <ta-border-layout :layout="{header:'58px'}">
    <div slot="header">
      <ta-button @click="empty">清空</ta-button>
      <ta-button @click="toPreview">预览</ta-button>
      <ta-button @click="toCode">code</ta-button>
      <ta-button @click="toCss">css</ta-button>
      <ta-button @click="toJs">js</ta-button>
      <ta-button v-if="editType=='module'" @click="saveInfo" type="primary">保存</ta-button>
    </div>
    <div class="preview" @dragover="dragOver" @drop="drop" @contextmenu.prevent="onShowMenu">
      <div @click="clickPreview" v-if="showType=='preview'" ref="preview" class="preview-area">
        <div v-if="!item.parentId" :id="item.info.id" v-for="(item,index) in components"></div>
      </div>
      <div v-if="showType=='code'">
        <pre><code>{{getSource(components)}}</code></pre>
      </div>
      <codemirror v-model="css"
                  class="css-editor"
                  v-if="showType=='css'"
                  placeholder="这里添加css样式"
                  :options="{
                    tabSize: 4,
                    mode: 'text/css',
                    lineNumbers: true,
                    line: true}"
      ></codemirror>
      <codemirror v-model="js"
                  v-if="showType=='js'"
                  class="js-editor"
                  :options="{
                    tabSize: 4,
                    mode: 'text/javascript',
                    lineNumbers: true,
                    line: true}"
      ></codemirror>
    </div>

    <!-- 组件拖动属于嵌套操作时，这个弹出框会弹出 -->
    <!--<mu-popover v-if="current.info" :trigger="popover.trigger" :open="popover.open" @close="popover.open=false">-->
    <!--<mu-menu @change="selectedSlot">-->
    <!--<label>-->
    <!--&nbsp;&nbsp;嵌套到{{current.info.name}}:-->
    <!--</label>-->
    <!--<mu-menu-item v-for="(val,key,index) in current.slots" :title="key" :value="key" :key="index" />-->
    <!--</mu-menu>-->
    <!--</mu-popover>-->

    <div v-if="current.info && popover.open"
         class="popover"
         :style="popover.style"
    >
      <div>{{current.info.name}}</div>
      <ta-menu @click="selectedSlot">
        <ta-menu-item v-for="(val,key,index) in current.slots" :key="key">{{key}}</ta-menu-item>
      </ta-menu>
    </div>

    <!--操作弹出框删除什么的-->
    <div v-if="contextmenu.open && current.info"
         class="contextmenu"
         :style="contextmenu.style"
    >
      <div>{{current.info.name}}</div>
      <ta-menu mode="vertical">
        <ta-menu-item key="0" @click="del">删除</ta-menu-item>
        <ta-menu-item key="1" @click="copyComponent">复制</ta-menu-item>
        <ta-menu-item key="2" @click="pasteComponent" v-if="onlineState.copiedComponents.length">黏贴</ta-menu-item>
      </ta-menu>
    </div>
  </ta-border-layout>

</template>

<script>
  import {getTemplate} from './js/components/index'
  import pretty from 'pretty'
  import {guid, mount, mergeDeep} from './js/tool.js'
  import {mapGetters} from 'vuex'
  import scopedCss from 'scopedcss'
  import {codemirror} from 'vue-codemirror-lite'

  require('codemirror/mode/javascript/javascript')
  require('codemirror/mode/vue/vue')
  require('codemirror/addon/hint/show-hint.js')
  require('codemirror/addon/hint/show-hint.css')
  require('codemirror/addon/hint/javascript-hint.js')
  export default {
    name: 'preview',
    components: {
      codemirror
    },
    data() {
      return {
        showType: 'preview', // code//css
        editType: 'page',//page还是module 如果是page那么就不是这个页面保存
        formId:'',
        insertPosition: {
          position: null,
          component: null
        },
        contextmenu: {// 右键弹出菜单
          trigger: null,
          open: false,
          style: {}
        },
        popover: {
          trigger: null,
          open: false,
          style: {}
        }
      }
    },
    created() {
    },
    computed: {
      components: { // 组件们
        get() {
          return this.onlineState.components
        },
        set(components) {
          this.$store.commit('setState', {
            components
          })
        }
      },
      ...mapGetters({
        onlineState: 'getState'
      }),
      current: { // 当前选中组件
        get() {
          return this.onlineState.currentComponent
        }
      },
      css: {
        get() {
          return this.onlineState.css
        },
        set(val) {
          this.$store.commit('setState', {
            css: val
          })
        }
      },
      js: {
        get() {
          return this.onlineState.js
        },
        set(val) {
          this.$store.commit('setState', {
            js: val
          })
        }
      }

    },
    mounted() {
      // 拖动放置位置的虚线框位置计算
      document.ondrag = e => {
        let {
          left,
          top
        } = this.$refs.preview.getBoundingClientRect()
        // 鼠标在预览视图中的相对坐标
        // console.log(e.clientX,e.clientY)
        let preview = this.$refs.preview
        let x = e.clientX - left,
          y = e.clientY - top + preview.scrollTop
        this.components.filter(component => !component.parentId).forEach(component => {
          let {
            offsetLeft,
            offsetTop,
            offsetRight,
            offsetBottom
          } = component.position

          let offset = 5
          // 不在当前元素位置内
          if (!(x > offsetLeft && x < offsetRight && y > offsetTop && y < offsetBottom)) {
            return
          }
          // 上方
          if (y > offsetTop && y < offsetTop + offset) {
            this.setPlaceholder('上方', component)
            return
          }
          // 右方
          if (x < offsetRight && x > offsetRight - offset) {
            this.setPlaceholder('右方', component)
            return
          }
          // 下方
          if (y < offsetBottom && y > offsetBottom - offset) {
            this.setPlaceholder('下方', component)
            return
          }
          // 左方
          if (x > offsetLeft && x < offsetLeft + offset) {
            this.setPlaceholder('左方', component)
          }
        })
      }

      /* 由于启用drag后的元素无法获取到mouseup事件，
        所以监听body的拖拽事件，以便在鼠标松开后，
        删除虚线框占位元素
        */
      document.body.ondragover = e => {
        e.preventDefault()
      }

      document.body.ondrop = e => {
        this.removePlaceholder()
        e.preventDefault()
      }
      //读取数据
      let urlParam = this.Base.getNowPageParam();
      //如果有url传入参数
      if (Object.keys(urlParam).length > 0) {
        //如果有formId传过来就请求模板的code 数据
        //如果有pageId传过来那么请求页面的code数据
        let data = {}, url = '/templateMg/templateMgRestService/getOnlineFormVoByFormId';
        if (urlParam['formId'] || urlParam['pageId']) {
          if (urlParam['formId']) {
            data.formId = urlParam['formId']
            this.editType = 'module'
            this.formId=urlParam['formId'];
          } else if (urlParam['pageId']) {
            data.pageId = urlParam['pageId']
            url = '/appMg/appPageRestService/queryOnlineDevInfo'
          }
          this.Base.submit(null, {
            url: url,
            data: data,
          }, {
            successCallback: (data) => {
              console.log(JSON.parse(data.data.formVo.formData));
              let cpt = {}
              try {
                cpt = JSON.parse(data.data.formVo.formData)
              } catch (e) {

              }
              this.$store.commit('setState', cpt)
              //dom没有渲染完成 window._Vue为undefined，加个延迟
              setTimeout(() => {
                this.mount()
              }, 0)
            }
          })
        }

      } else {
        //否则从本地存储中读取

      }


    },
    methods: {
      //保存模板
      saveInfo() {
        this.Base.submit(null, {
            url: 'templateMg/templateMgRestService/updateOnlineForm',
            data: {
              formId:this.formId,
              formHtml:this.getSource(this.components),
              formData:JSON.stringify({
                components:this.components,
                css:this.css,
                js:this.js
              })
            }
          }, {
            successCallback: (data) => {
              this.$message.success('保存成功!')
            }
          }
        )


      },
      onShowMenu(e) {
        this.clickPreview(e)
        // if(e.target.id!==this.current.info.id){
        //   this.contextmenu.open=false;
        //   return;
        // }
        this.$set(this.contextmenu, 'style', {
          top: e.y + 'px',
          left: e.x + 'px'
        })
        this.contextmenu.open = true
        e.preventDefault()
      },
      toPreview() {
        this.showType = 'preview'
        this.mount()
      },
      toCode() {
        this.showType = 'code'
      },
      toCss() {
        this.showType = 'css'
      },
      toJs() {
        this.showType = 'js'
      },
      dragOver(e) {
        e.preventDefault()
      },
      drop(e) { // 松开拖放,e是容器元素
        // CODE视图的文字拖动也会触发此事件，这里屏蔽掉
        if (!(e.target.className.indexOf('sound-code') !== -1 || e.target.className.indexOf('hljs') !== -1)) {
          let isNest = e.target.className.indexOf('preview') === -1 && e.target.id !== 'placeholder'
          let info = JSON.parse(e.dataTransfer.getData('info'))

          // 如果是内部组件拖动
          if (info.id) {
            let component = this.components[this.components.findIndex(cpt => cpt.info.id === info.id)]
            let {template, attributes, slots} = component
            console.log(component)
            let name = info.name
            if (isNest) {
              // 预览视图中选中组件后，current的值指向选中组件，为空{}就是未选
              if (!this.current.info) {
                return this.message.warn('未选中嵌套目标')
              }
              if (!Object.keys(this.current.slots).length) {
                return this.message.warn('无可嵌套')
              }
              this.popover.trigger = e.target
              this.popover.open = true
              let selectSlot = new Promise((resolve, reject) => {
                this.selectedSlot = value => {
                  this.popover.open = false
                  resolve(value.key)
                }
              })
              selectSlot.then(slot => {
                let components = JSON.parse(JSON.stringify(this.components))
                let index = components.findIndex(item => item.info.id === this.current.info.id)
                // 嵌套模板
                let nestComponent = getTemplate(info, { // 传入{slot}会给获取到的模板添加slot="xxx"
                  slot
                })

                nestComponent.attributes.slot = slot
                nestComponent.parentId = components[index].info.id

                // getTemplate中#可能#修改了components，所以重新获取
                components = JSON.parse(JSON.stringify(this.components))
                index = components.findIndex(item => item.info.id === this.current.info.id)

                // 设置组件的slots
                let slots = components[index].slots || {}
                slots[slot].push({
                  id: nestComponent.info.id
                })

                components.push(nestComponent)

                // 提交一次保存 避免getTemplate中获取nestComponent失败
                this.components = components

                // 嵌套后的模板
                component = getTemplate(this.current.info, this.current.attributes, slots)
                if (!component.template) {
                  throw '没有这个组件的模板'
                }

                // 最父级模板
                let topComponent = this.getParentComponent(this.current)
                topComponent = getTemplate(topComponent.info, topComponent.attributes, topComponent.slots)
                let topIndex = components.findIndex(c => c.info.id === topComponent.info.id)

                components[topIndex] = topComponent
                components[index] = mergeDeep(components[index], component)
                // 更新模板
                this.components = components
                this.mount()
              })
            } else { // 非嵌套操作
              let components = JSON.parse(JSON.stringify(this.components))
              if (!this.insertPosition.position) {
                components.push(component)
                this.components = components
                this.mount()
              } else {
                let index = components.findIndex(component => component.info.id === this.insertPosition.component.info.id)
                let position = this.insertPosition.position
                if (position === '下方' || position === '右方') {
                  index++
                }
                components.splice(index, 0, component)

                // 占位虚线框删除后，把这个也重置为null，为null时就是默认将拖动组件添加到components最后
                this.insertPosition = {
                  component: null,
                  position: null
                }
                this.components = components
                this.fresh()

                /*  else end  */
              }
            }
          } else {
            info.id = guid()
            let name = info.name
            let component,
              template,
              attributes,
              slots
            if (isNest) {
              // 预览视图中选中组件后，current的值指向选中组件，为空{}就是未选
              if (!this.current.info) {
                return message.warning('未选中嵌套目标')
              }
              if (!Object.keys(this.current.slots).length) {
                return message.warning('无可嵌套')
              }
              let pst = e.target.getBoundingClientRect()
              this.popover.style = {
                left: pst.left + 'px',
                top: (pst.top + pst.height) + 'px'
              }
              this.popover.open = true
              let selectSlot = new Promise((resolve, reject) => {
                this.selectedSlot = value => {
                  console.log(value)
                  this.popover.open = false
                  resolve(value.key)
                }
              })
              selectSlot.then(slot => {
                let components = JSON.parse(JSON.stringify(this.components))
                let index = components.findIndex(item => item.info.id === this.current.info.id)
                // 嵌套模板
                let nestComponent = getTemplate(info, { // 传入{slot}会给获取到的模板添加slot="xxx"
                  slot
                })

                nestComponent.attributes.slot = slot
                nestComponent.parentId = components[index].info.id

                // getTemplate中#可能#修改了components，所以重新获取
                components = JSON.parse(JSON.stringify(this.components))
                index = components.findIndex(item => item.info.id === this.current.info.id)

                // 设置组件的slots
                let slots = components[index].slots || {}
                slots[slot].push({
                  id: nestComponent.info.id
                })

                components.push(nestComponent)

                // 提交一次保存 避免getTemplate中获取nestComponent失败
                this.components = components

                // 嵌套后的模板
                component = getTemplate(this.current.info, this.current.attributes, slots)
                if (!component.template) {
                  throw '没有这个组件的模板'
                }

                // 最父级模板
                let topComponent = this.getParentComponent(this.current)
                topComponent = getTemplate(topComponent.info, topComponent.attributes, topComponent.slots)
                let topIndex = components.findIndex(c => c.info.id === topComponent.info.id)

                components[topIndex] = topComponent
                components[index] = mergeDeep(components[index], component)
                // 更新模板
                this.components = components
                this.mount()
              })
            } else { // 非嵌套操作
              let id = guid()
              component = getTemplate(info)
              if (!component.template) {
                throw '没有这个组件的模板'
              }

              let components = JSON.parse(JSON.stringify(this.components))
              if (!this.insertPosition.position) {
                components.push(component)
                this.components = components
                this.mount()
              } else {
                let index = components.findIndex(component => component.info.id === this.insertPosition.component.info.id)
                let position = this.insertPosition.position
                if (position === '下方' || position === '右方') {
                  index++
                }
                components.splice(index, 0, component)

                // 占位虚线框删除后，把这个也重置为null，为null时就是默认将拖动组件添加到components最后
                this.insertPosition = {
                  component: null,
                  position: null
                }
                this.components = components
                this.fresh()

                /*  else end  */
              }
            }
          }
        } else {

        }
      },
      setPlaceholder(position, component) {
        console.log(position)
        // 添加前删除
        this.removePlaceholder()
        // 创建添加元素
        let placeholder = document.createElement('div')
        placeholder.id = 'placeholder'
        // 当前悬停的组件元素
        let el = document.getElementById(component.info.id)
        switch (position) {
          case '上方':
            this.$refs.preview.insertBefore(placeholder, el)
            break
          case '右方':
            placeholder.classList.add('inline')
            this.$refs.preview.insertBefore(placeholder, el.nextSibling)
            break
          case '下方':
            this.$refs.preview.insertBefore(placeholder, el.nextSibling)
            break
          case '左方':
            placeholder.classList.add('inline')
            this.$refs.preview.insertBefore(placeholder, el)
            break
        }
        this.insertPosition = {
          position,
          component
        }
      },
      removePlaceholder() {
        let placeholder = document.getElementById('placeholder')
        if (placeholder) {
          placeholder.parentElement.removeChild(placeholder)
        }
      },
      selectedSlot() {
        // 必需，勿删，会在ondrop中被重写
      },
      mount() {
        // 挂载及更新视图中组件的位置信息
        let components = JSON.parse(JSON.stringify(this.onlineState.components))
        components.filter(component => !component.parentId).forEach(component => {
          mount(component.info.id, component).then(vm => {
            let el = document.getElementById(component.info.id)
            component.position = {
              offsetLeft: el.offsetLeft,
              offsetRight: el.offsetLeft + el.clientWidth,
              offsetTop: el.offsetTop,
              offsetBottom: el.offsetTop + el.clientHeight
            }
            // 每次重新挂载后dom变动，更新scoped style
            this.addUserStyle()
          })
        })
        setTimeout(() => {
          this.components = components
        }, 0)
      },
      fresh() {
        /* 当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，
          它默认用 “就地复用” 策略。
          如果数据项的顺序被改变，
          Vue将不是移动 DOM 元素来匹配数据项的顺序，
           而是简单复用此处每个元素。
          出于此，每次components顺序变动后，只好使用清空再重新渲染的方式，否则不能成功渲染更新
           */
        let components = JSON.parse(JSON.stringify(this.components))
        this.components = []
        this.$refs.preview.innerHTML = ''

        // settimeout会等到dom重绘完成后在执行fn
        setTimeout(() => {
          this.components = components
          this.mount()
        }, 0)
      },
      getComponentNode(node) {
        if (node && node.getAttribute('data-component-active') !== null) {
          return node
        } else {
          if (node.parentElement) {
            return this.getComponentNode(node.parentElement)
          } else {
            return false
          }
        }
      },
      getParentComponent(component) {
        let components = JSON.parse(JSON.stringify(this.components))
        if (component.parentId) {
          return this.getParentComponent(components.find(c => c.info.id === component.parentId))
        } else {
          return component
        }
      },
      clickPreview(e) {
        this.contextmenu.open = false
        let target = e.target
        e.preventDefault()
        let componentHTML = this.getComponentNode(target)
        if (componentHTML) {
          // 添加选中效果
          let list = document.querySelectorAll('[data-component-active="true"]')
          list.forEach(el => {
            el.setAttribute('data-component-active', '')
          })
          componentHTML.setAttribute('data-component-active', 'true')

          // 保存到vuex
          let currentId = componentHTML.id
          let component = this.components.find(component => component.info.id === currentId)
          this.$store.commit('setState', {
            currentComponent: component
          })
        }
      },
      addUserStyle() {
        if (!this.css) {
          return
        }
        // 添加用户编辑的css效果到预览视图
        let style = document.getElementById('custom-layout')
        if (!style) {
          style = document.createElement('style')
          style.id = 'custom-layout'
          style.setAttribute('scoped', '')
          style.type = 'text/css'
          this.$refs.preview.appendChild(style)
        }
        let cssText = document.createTextNode(this.css)
        style.innerHTML = ''
        style.appendChild(cssText)
        // let sysCssText=document.createTextNode(`\ndiv:last-child{margin-bottom:100px;}`)
        // style.appendChild(sysCssText)
        // 动态添加scoped style
        scopedCss.applyTo(this.$refs.preview)
      },

      getComponent(name) { // 获取组件模板
        this.showType = 'preview'
        let component,
          template,
          attributes,
          slots
        // 先模拟个拖过来的组件info
        let info = {
          name: 'Div',
          ui: 'ta404UI',
          id: guid()
        }
        component = getTemplate(info)
        if (!component.template) {
          throw '没有这个模板'
        }

        let components = JSON.parse(JSON.stringify(this.components))
        // 直接添加组件
        components.push(component)
        this.components = components
        this.mount()
        // 插入其他位置添加组件
        // TODO
      },
      del: async function () {
        let components = await this.$store.dispatch('delComponent', this.current.info.id)
        this.fresh()
      },
      copyComponent() {
        let copied = []
        let components = JSON.parse(JSON.stringify(this.components))
        let current = JSON.parse(JSON.stringify(this.current))
        let getCopiedComponents = (component = current) => {
          let hasChild = Object.keys(component.slots).filter(slot => component.slots[slot].length).length

          // 修改id和parentId
          let parentId = guid()

          // 局部的的components可能被child.info.id = guid()所改变，所以重新定义个
          let components = JSON.parse(JSON.stringify(this.components))

          // 找到了就重新赋值id,并且能够说明有传component进来，因为被传进来的id都是被改变的，不会被找到
          if (components.find(c => c.info.id === component.info.id)) {
            component.info.id = parentId
            // 被复制的组件的最父级组件
            component.parentId = null
          }
          if (hasChild) {
            let arr = []
            Object.keys(component.slots).forEach(slot => {
              component.slots[slot].forEach(item => {
                let child = components.find(c => c.info.id === item.id)
                // 赋予新id
                child.info.id = guid()
                child.parentId = parentId
                item.id = child.info.id
                arr.push.apply(arr, getCopiedComponents(child))
              })
            })
            return [component].concat(arr)
          } else {
            return [component]
          }
        }
        let copiedComponents = getCopiedComponents()
        this.$store.commit('setState', {
          copiedComponents
        })
        this.$message.success('复制成功')
        this.contextmenu.open = false
      },
      pasteComponent() {
        let components = JSON.parse(JSON.stringify(this.components))
        let index = components.findIndex(c => c.info.id === this.current.info.id)
        let pst = (document.getElementById(this.current.info.id)).getBoundingClientRect()
        this.popover.style = {
          left: pst.left + 'px',
          top: (pst.top + pst.height) + 'px'
        }
        this.popover.open = true
        let selectSlot = new Promise((resolve, reject) => {
          this.selectedSlot = value => {
            this.popover.open = false
            resolve(value.key)
          }
        })
        selectSlot.then(slot => {
          let copiedComponents = JSON.parse(JSON.stringify(this.onlineState.copiedComponents))
          let pasteComponent = copiedComponents.find(c => !c.parentId)
          components[index].slots[slot].push({
            id: pasteComponent.info.id
          })
          pasteComponent.parentId = components[index].info.id
          pasteComponent.slot = slot
          components = components.concat(copiedComponents)
          this.$store.commit('setState', {
            components,
            copiedComponents: [] // 粘贴后清除剪切板
          })
          let topComponent = this.getParentComponent(components[index])
          let topIndex = components.findIndex(c => c.info.id === topComponent.info.id)
          components[topIndex].template = getTemplate(components[topIndex].info, components[topIndex].attributes, components[topIndex].slots).template
          // 因为getTemplate中需要最新的components，所以提交两次状态
          this.$store.commit('setState', {
            components,
            copiedComponents: [] // 粘贴后清除剪切板
          })
          this.fresh()
        })
      },
      empty() {
        // 清空
        this.$store.commit('setState', {
          css: '', // 用户编辑的自定义css字符串
          currentComponent: {}, // 预览视图的选中组件
          components: [], // 预览视图的组件树
          backupComponents: [],
          copiedComponents: []
        })
        this.fresh()
      },
      getSource(components) { // 预览视图中所有组件的代码
        let code = `<template><div>`
        components.filter(component => !component.parentId).forEach(component => {
          code += component.template
        })
        code += `\n</div></template>`
        // 添加用户编辑的css
        let cssText = this.onlineState.css
        if (cssText) {
          cssText = '\n<style scoped>\n' + cssText
          cssText += '\n</style>\n'
          code += cssText
        }
        // 添加用户编辑的js
        let jsText = this.onlineState.js
        if (jsText) {
          jsText = '\n<script>\n' + jsText
          jsText += '\n<\/script>\n'
          code += jsText
        }

        // 代码美化的
        code = pretty(code)

        /* 把组件标签中包含的用户不需要的属性删掉，
            因为它只是为了适应预览视图，
            如，组件默认的“position:fixed”会使组件跑到预览视图外
          */
        code = code.replace(/ style=".*?"/g, '')
        code = code.replace(/ tabIndex=".*?"/g, '')
        code = code.replace(/ id=".*?"/g, '')
        code = code.replace(/ data-component-active/g, '')
        code = code.replace(/\n\n/g, '\n')
        return code
      }
    },

    watch: {}
  }

</script>

<style lang="less" type="text/less">
  .preview-area {
    height: 100%;
  }

  .preview {
    width: 100%;
    height: 100%;
  }

  .vue-grid-layout {
    position: relative;
    width: 800px;
    height: 450px;
    /*overflow: hidden;*/
    /*background: url('../../assets/desktop_background.png') no-repeat;*/
  }

  #placeholder {
    min-height: 50px;
    border: 1px dashed lightgray;
  }

  #placeholder.inline {
    min-height: 50px;
    min-width: 50px;
    border: 1px dashed lightgray;
    display: inline-block;
    vertical-align: middle;
  }

  .vue-grid-layout > div {
    position: absolute;
    background: indianred;
  }

  .contextmenu, .popover {
    position: fixed;
    width: 120px;
    border: 1px solid #ccc;
    padding: 10px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow:@box-shadow-base;
    z-index: 99999;
    top: 0px;

    > div {
      line-height: 32px;
      width: 100%;
    }

    > ul {
      border: none;
    }
  }

  .css-editor, .js-editor {
    height: 100%;
    border: none;
  }

  .CodeMirror {
    height: 100%;
  }

  .CodeMirror-vscrollbar {
    .beautifyScrollbar();
  }

  [data-component-active] {
    &:hover {
      box-shadow: inset 0px 0px 0px 1px red !important;
    }

    &:focus {
      box-shadow: inset 0px 0px 0px 1px red !important;
    }

  }

  [data-component-active="true"] {
    box-shadow: inset 0px 0px 0px 1px red !important;
  }

</style>
