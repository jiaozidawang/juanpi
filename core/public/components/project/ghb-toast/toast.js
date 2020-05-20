import ToastComponent from './index.vue';

const Toast = {};

// 注册Toast
Toast.install = function (Vue) {
  // 生成一个Vue的子类
  // 同时这个子类也就是组件
  const ToastConstructor = Vue.extend(ToastComponent)
  // 生成一个该子类的实例
  const instance = new ToastConstructor();

  // 将这个实例挂载在我创建的div上
  // 并将此div加入全局挂载点内部
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法
  Vue.prototype.$toast = (msg, type, {duration= 2000, position= 'bottom'} = {}) => {

    // 防抖
    if (instance.show == true) {
      return;
    }

    // 设定toast 的定位
    if(position == 'middle') {
      instance.$el.style.bottom= "50%";
    } else if (position == 'bottom') {
      instance.$el.style.bottom= "10%";
    }
    instance.position = position;


    if(type == 'loading') {
      duration = 9999999;
      // 创建mask
      let masker = document.createElement('div');
      masker.className = 'ghb-toast-mask';
      document.body.appendChild(masker);
      masker.addEventListener('touchmove', e => {
        e.preventDefault();
      })
    }

    // 设定toast文字信息
    instance.message = msg;

    instance.show = true;

    // 设定toast 图标类型
    instance.type = type;

    // 设定toast持续显示时间，默认2000毫秒
    setTimeout(() => {
      instance.show = false;
    }, duration);
  }

  Vue.prototype.$hideToast = () => {
    instance.show = false;
    let masker = document.querySelector('.ghb-toast-mask');

    // 清除遮罩
    if(masker) {
      document.body.removeChild(masker);
    }
  }
}
export default Toast
