import attrWidth from './attrs/attrWidth'
import attrText from './attrs/attrText'
import attrHeight from './attrs/attrHeight'
import attrSelect from './attrs/attrSelect'
import attrFontFamily from './attrs/attrFontFamily'
import attrColor from './attrs/attrColor'
import attrBorder from './attrs/attrBorder'
import attrFormat from './attrs/attrFormat'
import attrBoolean from './attrs/attrBoolean'
import attrNumber from './attrs/attrNumber'
import attrGridColumns from './attrs/attrGridColumns'
import attrSelectItems from './attrs/attrSelectItems'
import attrSelectItemsC from './attrs/attrSelectItemsC'

import componentsSrc from './componentsSrc';
import componentsAttr from './componentsAttr';
import colorPicker from './colorPicker.vue'
import dragList from './dragList/dragList'
import dragListItem from './dragList/dragListItem'

const components = [
  attrWidth,
  attrText,
  attrHeight,
  attrSelect,
  attrFontFamily,
  attrColor,
  attrBorder,
  attrFormat,
  attrBoolean,
  attrNumber,
  attrGridColumns,
  attrSelectItems,
  attrSelectItemsC,
  componentsSrc,
  componentsAttr,
  colorPicker,
  dragList,
  dragListItem
]
const install = function (Vue) {
  components.forEach(function (cmp) {
    return Vue.component(cmp.name, cmp);
  })
}
export default {
  install,
  componentsSrc,
  componentsAttr,
  attrSelectItems,
  attrSelectItemsC,
  colorPicker,
  dragList,
  dragListItem
}



