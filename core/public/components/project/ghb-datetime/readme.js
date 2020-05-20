 /**
  * @desc 日期选择组件 直接使用需要在group里面使用
  * @param {String} 时间格式，不支持特殊字符，只能类似 YYYY-MM-DD HH:mm 这样的格式（不支持秒 ss）, 另外支持 YYYY-MM-DD A 这样的格式(A为上下午) 默认值 YYYY-MM-DD
  * @param {String} value 表单值，v-model绑定
  * @param {String} inlineDesc 描述字符
  * @param {String} placeholder 提示文字，当value为空时显示
  * @param {Number} minYear 可选择的最小年份
  * @param {Number} maxYear 可选择的最大年份
  * @param {Number} minHour 限定小时最小值 默认0
  * @param {Number} maxHour 限定小时最大值 默认23
  * @param {String} confirmText 确认按钮文字
  * @param {String} cancelText 取消按钮文字
  * @param {String} clearText 显示在中间的自定义按钮的文字
  * @param {String} yearRow 年份的渲染模板
  * @param {String} monthRow 月份的渲染模板
  * @param {String} dayRow 日期的渲染模板
  * @param {String} hourRow 小时的渲染模板
  * @param {String} minuteRow 分钟的渲染模板
  * @param {String} startDate 限定最小日期，格式必须为 YYYY-MM-DD，注意该限制只能限定到日期，不能限定到小时分钟。小时限定请使用min-hour和max-hour
  * @param {String} endDate 限定最大日期，格式必须为 YYYY-MM-DD，注意该限制只能限定到日期，不能限定到小时分钟
  * @param {Boolean} required 是否必填 默认 false
  * @param {Function} displayFormat 自定义显示值
  * @param {Function} computeHoursFunction 动态设置小时列表，参数为 (value, isToday, generateRange)
  * @param {Function} computeDaysFunction 动态设置日期列表，参数为 ({year, month, min, max}, generateRange)
  * @param {String} readonly 只读模式，显示类似于 cell
  * @param {Boolean} show 控制显示
  * @param {Array} minuteList 定义分钟列表，比如 ['00', '15', '30', '45']
  * @param {Array} hourList 定义小时列表，比如 ['09', '10', '11', '12']
  * @param {String} defaultSelectedValue 设置默认选中日期，当前 value 为空时有效
  * @param {Object} orderMap 自定义列顺序, 如 {year: 1, month: 2, day: 3, hour: 4, minute: 5, noon: 6}
  * @event on-change	(value)	表单值变化时触发, 参数 (newVal)	--
  * @event on-clear	--	点击显示在中间的自定义按钮时触发	--
  * @event on-show	--	弹窗显示时触发	--
  * @event on-hide	(type), type is one of [cancel, confirm]	弹窗关闭时触发	v2.7.4
  * @event on-cancel	--	点击取消按钮或者遮罩时触发，等同于事件 on-hide(cancel)	v2.7.4
  * @event on-confirm	(value) 	点击确定按钮时触发，等同于事件 on-hide(confirm)
  * @slot default  触发元素内容
  * @slot title  title slot
  *
  *
  * //以 plugin 形式使用时，请在入口（main.js）处引入
  * import DatetimePlugin from "@comps/ghb-datetime/plugin";
  * Vue.use(DatetimePlugin);
  *
  * // 组件内使用
  * this.$vux.datetime.show({
  *   value: '', // 其他参数同 props
  *   onHide () {
  *     const _this = this
  *   },
  *   onShow () {
  *     const _this = this
  *   }
  * })
  *
  * this.$vux.datetime.hide()
  */
