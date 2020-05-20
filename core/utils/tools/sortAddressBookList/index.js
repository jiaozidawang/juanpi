import UNICODE from "./unicode";
import ALL_MAP from "./map";
// import { copy } from '../objectTools';
/**
 * @author liuyunxiao
 * @date 2019-03-17
 * @desc 通讯录数据排序
 * @param {String} key 需要被排序的字段名
 * @param {String} data 需要被排序的列表数据
 * @param {String} needAll 是否需要显示全部26个字母
 * @example let sortList = new sortAddressBookList('name', listData)  // sortList = [{title: 'A', items: []}, ...]
 */
export default class sortAddressBookList {
  constructor(key, data, needAll) {
    this.data = data;
    this.FREQUENT_PEOPLE = "常用联系人";

    return needAll
      ? this.getListGroupAll(key, data)
      : this.getListGroup(key, data);
  }
  getListGroupAll(key, data) {
    let map = ALL_MAP;
    let others = {
      title: "#",
      items: []
    };
    let copyData = JSON.parse(JSON.stringify(data))
    copyData.forEach((item, index) => {
      let fsEn = this._convertChar(item[key]);
      map.forEach(item2 => {
        if (item2.title == fsEn) {
          item2.items.push(item);
          delete copyData[index];
        }
      });
    });

    copyData.forEach(item => {
      if(item[key]){
        others.items.push(item);
      }
    })
    if(others.items.length > 0) map.push(others);
    return map;
  }
  getListGroup(key, data) {
    let map = {
      frequent: {
        title: this.FREQUENT_PEOPLE,
        items: []
      }
    };
    data.forEach(item => {
      let fsEn = this._convertChar(item[key]);
      // 如果map没有这个字母
      if (!map[fsEn]) {
        map[fsEn] = {
          title: fsEn,
          items: []
        };
      }
      map[fsEn].items.push(item);
    });
    return this._sort(map);
  }
  _convertChar(str) {
    // 获取首个字符
    let firstChar = str.substr(0, 1);
    // 获取首个字符的拼音并转换为大写
    let fsEn = this._getPinyin(firstChar).toUpperCase();
    return fsEn;
  }
  _getPinyin(str) {
    if (str.length <= 0) return;
    let enReg = /[\u4e00-\u9fa5]/;
    // 如果不是中文字符，直接返回第一个字母
    if (!enReg.test(str)) {
      return str.substr(0, 1);
    }
    // 如果是中文，转化为拼音之后返回第一个字母
    for (let name in UNICODE) {
      if (UNICODE[name].indexOf(str) != -1) {
        return name.substr(0, 1);
      }
    }
  }
  _sort(map) {
    let fre = [];
    let ret = [];
    let unt = {
      title: "#",
      items: []
    };
    for (let key in map) {
      let val = map[key];
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val);
      } else if (val.title === this.FREQUENT_PEOPLE) {
        fre.push(val);
      } else {
        unt.items.push(val.items[0]);
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0);
    });
    return fre.concat(ret).concat(unt);
  }
}
