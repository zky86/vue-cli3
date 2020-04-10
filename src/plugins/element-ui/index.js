import Vue from 'vue'
import Element from 'element-ui'
import './theme.scss'

Vue.use(Element, { size: '' })

Element.Form.props.labelWidth.default = '20%'
Element.InputNumber.props.controlsPosition.default = 'right'
Element.Switch.props.activeValue.default = 1
Element.Switch.props.inactiveValue.default = 0
Element.Card.props.shadow.default = 'never'

Object.defineProperty(Vue.prototype, '$_confirm', {
  value: ({
    type = 'warning',
    name,
    operateText = '删除',
    operate,
    callback
  }) => {
    let response
    Element.MessageBox({
      title: '提示',
      message: `<span>此操作将<b style="padding: 0 2px;color: #333;">${operateText}</b>该项<b style="color: teal;padding-left:4px;">${name}</b>，是否继续？</span>`,
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true,
      type: type,
      beforeClose: (action, instance, done) => {
        if (instance.confirmButtonLoading) {} else if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '执行中...'
          operate().then(res => {
            instance.confirmButtonLoading = false
            instance.confirmButtonText = '确定'
            response = res
            done()
          }).catch(() => {
            instance.confirmButtonLoading = false
            instance.confirmButtonText = '确定'
          })
        } else {
          done()
        }
      }
    }).then(() => {
      callback && callback(response)
    }).catch(() => {})
  }
})
