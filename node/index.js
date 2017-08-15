var assert = require('assert');


// 一个对象默认是可扩展的,所以它也是非冻结的.
// assert(Object.isFrozen({}) === false);


describe("Object.isFrozen",function(){
    it('1,新创建的对象默认是非冻结的',function(){
        assert(Object.isFrozen({}) === false);
    });
});


var vacuouslyFrozen = Object.preventExtensions({});
describe("Object.isFrozen",function(){
    it('2,一个不可扩展的空对象同时也是一个冻结对象.',function(){
        assert(Object.isFrozen(vacuouslyFrozen) === true);
    });
});


var oneProp = { p: 42 };
describe("Object.isFrozen",function(){
    it('3,一个非空对象默认也是非冻结的.',function(){
        assert(Object.isFrozen(oneProp) === false);
    });
});


var oneProp1 = { p: 42 };
Object.preventExtensions(oneProp1);
describe("Object.isFrozen",function(){
    it('4,让这个对象变的不可扩展,并不意味着这个对象变成了冻结对象,因为p属性仍然是可以配置的(而且可写的).',function(){
        assert(Object.isFrozen(oneProp1) === false);
    });
});


var oneProp2 = { p: 42 };
Object.preventExtensions(oneProp2);
delete oneProp2.p;
describe("Object.isFrozen",function(){
    it('5,...如果删除了这个属性,则它会成为一个冻结对象.',function(){
        assert(Object.isFrozen(oneProp2) === true);
    });
});


var nonWritable = { e: "plep" };
Object.preventExtensions(nonWritable);
Object.defineProperty(nonWritable, "e", { writable: false }); // 变得不可写
describe("Object.isFrozen",function(){
    it('6,一个不可扩展的对象,拥有一个不可写但可配置的属性,则它仍然是非冻结的.',function(){
        assert(Object.isFrozen(nonWritable) === false);
    });
});


var nonWritable1 = { e: "plep" };
Object.preventExtensions(nonWritable1);
Object.defineProperty(nonWritable1, "e", { writable: false }); // 变得不可写
Object.defineProperty(nonWritable1, "e", { configurable: false }); // 变得不可配置
describe("Object.isFrozen",function(){
    it('7,把这个属性改为不可配置,会让这个对象成为冻结对象.',function(){
        assert(Object.isFrozen(nonWritable1) === true);
    });
});


var nonConfigurable = { release: "the kraken!" };
Object.preventExtensions(nonConfigurable);
Object.defineProperty(nonConfigurable, "release", { configurable: false });
describe("Object.isFrozen",function(){
    it('8,一个不可扩展的对象,拥有一个不可配置但可写的属性,则它仍然是非冻结的.',function(){
        assert(Object.isFrozen(nonConfigurable) === false);
    });
});


var nonConfigurable1 = { release: "the kraken!" };
Object.preventExtensions(nonConfigurable1);
Object.defineProperty(nonConfigurable1, "release", { configurable: false });
Object.defineProperty(nonConfigurable1, "release", { writable: false });
describe("Object.isFrozen",function(){
    it('9,把这个属性改为不可写,会让这个对象成为冻结对象.',function(){
        assert(Object.isFrozen(nonConfigurable1) === true);
    });
});


var accessor = { get food() { return "yum"; } };
describe("Object.isFrozen",function(){
    it('10,一个不可扩展的对象,值拥有一个访问器属性,则它仍然是非冻结的.',function(){
        Object.preventExtensions(accessor);
        assert(Object.isFrozen(accessor) === false);
    });
});


var accessor1 = { get food() { return "yum"; } };
Object.preventExtensions(accessor1);
Object.defineProperty(accessor1, "food", { configurable: false });
describe("Object.isFrozen",function(){
    it('11,...但把这个属性改为不可配置,会让这个对象成为冻结对象.',function(){
        assert(Object.isFrozen(accessor1) === true);
    });
});


// 使用Object.freeze是冻结一个对象最方便的方法.
var frozen = { 1: 81 };
describe("Object.isFrozen",function(){
    Object.freeze(frozen);
    it('12,一个冻结对象也是一个密封对象.',function(){
        assert.equal(Object.isSealed(frozen),true);
    });
});


describe("Object.isFrozen",function(){
    it('13,frozen 是一个不可扩展的对象.',function(){
        assert.equal(Object.isExtensible(frozen), false);
    });
});

