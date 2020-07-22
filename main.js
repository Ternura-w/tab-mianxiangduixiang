var that;//定义全局变量
class Tab {
  constructor(id) {//接收传递过来的参数
    //获取元素
    that = this;//让that 等于 constructor里的this
    this.main = document.querySelector(id);
    
    this.add = this.main.querySelector('.tabadd');
    //li的父元素
    this.ul = this.main.querySelector('.firstnav ul:first-child');
    //section 父元素
    this.fsection = this.main.querySelector('.tabscon');
    this.init();//this指向函数的调用者
  }
  init() {
    this.updateNode();
    //init初始化操作让相关元素绑定事件
    this.add.onclick = this.addTab;
    for(var i = 0;i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;// 点击完之后调用，不用加()
      this.remove[i].onclick = this.removeTab;
      this.spans[i].ondblclick = this.editTab;
      this.sections[i].ondblclick = this.editTab;
    }
  }
  // 动态获取 
  updateNode() {
    this.lis = this.main.querySelectorAll('li');
    this.sections = this.main.querySelectorAll('section');
    this.remove = this.main.querySelectorAll('.iconfont');
    this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
  }
  // 1.切换功能
  toggleTab() {
    // console.log(this.index)
    that.clearClass();
    this.className = 'liactive';
    that.sections[this.index].className = 'conactive';
  }
  clearClass() {
    for(var i = 0;i<this.lis.length;i++) {
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }
  // 2.添加功能  新元素->绑定事件->格式化
  addTab() {
    that.clearClass();
    //(1)创建li元素和section元素
    var random = Math.random();//生成随机数
    var li = '<li class="liactive"><span>测试</span><i class="iconfont">&#xe608;</i></li>';
    var section = '<section class = "conactive">测试'+random+'</section>';
    //(2)把两个元素追加到对应的父元素里面
    that.ul.insertAdjacentHTML('beforeend',li);
    that.fsection.insertAdjacentHTML('beforeend',section);
    that.init();//页面加载完之后，给新添加的选项卡绑定
  }
  // 3.删除功能
  removeTab(e) {
     e.stopPropagation();//阻止冒泡
    var index = this.parentNode.index;
    console.log(index);
    // 根据索引号删除对应的li 和 section
    that.lis[index].remove();
    that.sections[index].remove();
    that.init();
    //当我们删除的不是选定状态下的 li的时候 原来的选中状态li保持不变
    if(document.querySelector('.liactive')) return;
    //当我们删除了选中状态li 让他的前一个li 处于选定状态
    index--;
    // click() 手动调用点击事件 不需要鼠标触发
    that.lis[index] && that.lis[index].click();
  }
  // 4.修改功能
  editTab() {
    var str = this.innerHTML;
    //双击时禁止选定文字
    window.getSelection?window.getSelection().removeAllRanges():document.section.empty();
    this.innerHTML = '<input type = "text">';
    var input = this.children[0];
    input.value = str;
    input.select();//让文本框中的文字处于选定状态
    //当我们离开文本框就把文本框里面的值给span
    input.onblur = function() {
      this.parentNode.innerHTML = this.value;
    }
    //按下回车也可以把文本框的值给span
    input.onkeyup = function(e) {
      if(e.keyCode === 13) {//键盘对象
        this.blur();//手动调用表单失去焦点事件 不需要鼠标离开操作
      }
    }
  }
}
new Tab('#tab');
//实例化最大的对象-tab