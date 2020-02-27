import Vue from 'vue'
import {
    avatar,
    button,
    form,
    input,
    modal,
    containerMask,
    message,
    spin,
    icon,
    menu,
    checkbox,
    drawer,
    badge,
    pageTool,
    tabs,
    tag,
    dropdown,
    select,
    upload,
    divider,
    list,
    breadcrumb,
    notification
} from '@tq/ta404-ui'
import formUtil from '@tq/ta404-ui/es/utils/js/form.util'
import pinyin from '@tq/ta404-ui/es/utils/js/pinyin'
import webStorage from '@tq/ta404-ui/es/utils/js/webStorage'
import urlUtil from '@tq/ta404-ui/es/utils/js/url.util'
import elementUtil from '@tq/ta404-ui/es/utils/js/element.util'
import cookieUtil from '@tq/ta404-ui/es/utils/js/cookie.util'
import windowUtil from '@tq/ta404-ui/es/utils/js/window.util'
import browserType from '@tq/ta404-ui/es/utils/js/browser.util'

Vue.use(avatar)
Vue.use(button)
Vue.use(form)
Vue.use(input)
Vue.use(modal)
Vue.use(icon)
Vue.use(spin)
Vue.use(menu)
Vue.use(badge)
Vue.use(checkbox)
Vue.use(pageTool)
Vue.use(drawer)
Vue.use(containerMask)
Vue.use(message)
Vue.use(tabs)
Vue.use(tag)
Vue.use(dropdown)
Vue.use(select)
Vue.use(upload)
Vue.use(divider)
Vue.use(list)
Vue.use(breadcrumb)

const util = {
    ...cookieUtil,
    ...elementUtil,
    ...formUtil,
    pinyin,
    ...urlUtil,
    webStorage,
    ...windowUtil,
    ...browserType
}
Vue.prototype.Base = {
    ...util,
    ...containerMask.$mask
}
Vue.prototype.$message = message
Vue.prototype.$info = modal.info
Vue.prototype.$success = modal.success
Vue.prototype.$error = modal.error
Vue.prototype.$warning = modal.warning
Vue.prototype.$confirm = modal.confirm
Vue.prototype.$notification = notification
window.message = message
window.notification = notification
window.Modal = modal
window.Spin = spin
window.Base = Vue.prototype.Base