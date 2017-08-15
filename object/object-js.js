// Object

var obj1 = {a:1,b:2},
obj2 = {b:3,c:4};
var assignObj = Object.assign({},obj1,obj2);

var $app = document.getElementById('app');

function outDiv (str){
    var div = document.createElement('div');
    div.append(str);
    return div;
}

function appendDiv(str){
    $app.append(outDiv(JSON.stringify(str)));
}

appendDiv('assign');
appendDiv(assignObj);


// Object.defineProperties()
var obj = {};
var defineObj = Object.defineProperties(obj,{
    'a':{
        value:'is a',
        enumerable:true,
        writable:true,
        configurable:true
    },
    'b':{
        value:'is b',
        enumerable:false,
        writable:false,
        configurable:false
    }
});
appendDiv(defineObj);




// Object.defineProperty()

var o = {}; // 创建一个新对象

// Example of an object property added with defineProperty with a data property descriptor
Object.defineProperty(o, "a", {
  value : 37,
  writable : true,
  enumerable : true,
  configurable : true
});

// 对象o拥有了属性a，值为37

// Example of an object property added with defineProperty with an accessor property descriptor
var bValue;
Object.defineProperty(o, "b", {
  get : function(){
    return bValue;
  },
  set : function(newValue){
    bValue = newValue;
  },
  enumerable : true,
  configurable : true
});


// Object.freeze()
// 深度冻结
function deepFreeze (o) {
  var prop, propKey;
  Object.freeze(o); // 首先冻结第一层对象.
  for (propKey in o) {
    prop = o[propKey];
    if (!o.hasOwnProperty(propKey) || !(typeof prop === "object") || Object.isFrozen(prop)) {
      // 跳过原型链上的属性和已冻结的对象.
      continue;
    }

    deepFreeze(prop); //递归调用.
  }
}

