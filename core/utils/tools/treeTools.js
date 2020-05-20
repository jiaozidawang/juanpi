export default {
  params: [],
  parent: '',
  target: '',
  // 生成树
  getTree(data, parent, target, root = "0") {
    this.params = data;
    this.parent = parent;
    this.target = target;
    let output = {};
    // 第一层数组
    output.children = [];
    // 先按pid==0创建一维数组
    for (var i = 0; i < this.params.length; i++) {
      if (this.params[i][this.parent] == root) {
        output.children.push(this.params[i]);
      }
    }
    // 第二层数组开始递归
    output = this.childNode(output);
    return output.children;
  },
  childNode(list) {
    if (list.children != undefined) {
      var len = list.children.length;
      // for循环为广度优先，确保所有数组都能遍历以便
      for (var i = 0; i < len; i++) {
        list.children[i] = this.findEqual(list.children[i]);
        // 递归方法为深度优先，确保可以一直探究到最下层的子节点
        this.childNode(list.children[i]);
      }
    }
    return list;
  },
  findEqual(list) {
    for (var i = 0; i < this.params.length; i++) {
      if (this.params[i][this.parent] == list[this.target]) {
        if (list.children == undefined) {
          list.children = [];
        }
        list.children.push(this.params[i]);
      }
    }
    return list;
  },

  // 获取父节点
  getParents(data, parent, target, lastChildParent = "0", root = "0") {
    console.log(data);
    this.params = data;
    this.parent = parent;
    this.target = target;
    return this.findParents(lastChildParent, root);
  },
  findParents(parentsId, root, path = []) {
    for (let index = 0; index < this.params.length; index++) {
      const element = this.params[index];
      if (element[this.target] == parentsId) {
        path.unshift(element);
        if (element[this.parent] != root) {
          this.findParents(element[this.parent], root, path);
        }
        return path;
      }
    }
    return path;
  }
};
