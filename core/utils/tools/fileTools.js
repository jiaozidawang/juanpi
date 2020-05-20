// import BaseConfig from "@/config/base";

let BaseConfig = {
  UPLOAD_MAX_SIZE_IMG: 2048,
  UPLOAD_TYPE_IMG: []
};

export default {
  file2Image(file, callback) {
    let reader = new FileReader();
    reader.readAsDataURL(file); // 读取图像文件 result 为 DataURL, DataURL 可直接 赋值给 img.src
    reader.onload = function (event) {
      callback(event.target.result);
    };
  },

  checkImgMaxSize(vm, file, label = "") {
    if (file.size >= BaseConfig.UPLOAD_MAX_SIZE_IMG * 1000) {
      vm.$Message.warning(label + "文件超出" + BaseConfig.UPLOAD_MAX_SIZE_IMG + "KB");
      return false;
    }
    return true;
  },

  checkImgType(vm, file, label = "") {
    for (const key in BaseConfig.UPLOAD_TYPE_IMG) {
      if (BaseConfig.UPLOAD_TYPE_IMG.hasOwnProperty(key)) {
        const element = BaseConfig.UPLOAD_TYPE_IMG[key];
        if (file.type == element) {
          return true;
        }
      }
    }
    vm.$Message.warning(label + "文件类型不符合规范");
    return false;
  },
  checkUploadImg(vm, file, label = "") {
    if (!this.checkImgMaxSize(vm, file, label)) {
      return false;
    }
    if (!this.checkImgType(vm, file, label)) {
      return false;
    }
    return true;
  }
};
