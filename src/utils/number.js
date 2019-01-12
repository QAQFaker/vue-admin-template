// limit-input-number.js

// 设置组件中的指定属性的值
const setValue = function(exp, value, context) {
  value = isNaN(value) ? '' : value
  new Function('context', 'value', `context.${exp} = value`)(context, value)
}
// 自定义指令
export default {
  bind(el, { expression }, { context }) {
    // 初始化lastValue
    el.lastValue = el.value

    // 通过dataset 判断是否允许小数点
    const allowDot = !!el.dataset.dotrange
    const dotRange = el.dataset.dotrange || `{0,2}` // 默认
    const pattern = `^[0-9]+${allowDot ? `(.[0-9]${dotRange})?` : ''}$`

    if (!expression) {
      throw new TypeError('请绑定expression')
    }

    el.handleInputEvent = function(e) {
      setTimeout(() => {
        if (e.target.value === '') {
          setValue(expression, '', context)
          // 遇到非法数值，则重置
          e.target.value = ''
        } else if (e.target.value !== '' && !new RegExp(pattern).test(e.target.value)) {
          setValue(expression, parseFloat(e.target.lastValue), context)
          // 遇到非法数值，则重置为lastValue
          e.target.value = e.target.lastValue
          if (allowDot) {
            // 这个时候，根据业务逻辑，可以收起键盘，给出吐司提示
            e.target.blur()
            context.showToast(`小数点后最多${dotRange.replace(/[}{]/g, '').split(',')[1]}位`)
          }
        }
        e.target.lastValue = e.target.value
      }, 0)
    }
    el.addEventListener('input', el.handleInputEvent, false)
  },
  unbind(el) {
    el && el.removeEventListener('input', el.handleInputEvent, false)
  }
}

