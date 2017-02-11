function Animal(){
    this.species = '物种';
}

function CatGod(name, color){
    this.name = name;
    this.color = color;
}

//猫神明catGod 想得到 Ainmal 的功能。。
function CatGod(name, color){
    Animal.apply(this,arguments);//继承 1.通过call或者apply 的方法 
    this.name = name;
    this.color = color;
}

var cat1 = new CatGod('大毛','黄色');
console.log(cat1.species);  // 物种


//继承 2.catGod 出生父亲（发生变化） 认了一个干爹 (切忌这行代码要一起使用)
//new 认干爹是最最常用的方法啦。
CatGod.prototype = new Animal();  //这种方式也叫类式继承
CatGod.prototype.constructor = CatGod; //但是dna 还是自己的

//继承 3.不认干爹 ，借用外挂 【直接拿来用】---问题是弄坏了就不好了!!
function Animal(){};
Animal.prototype.species = '物种';

CatGod.prototype = Animal.prototype; //相当于直接使用干爹的外挂。不小心被修改，玩坏了，就糟糕啦！
CatGod.prototype.constructor = CatGod;
var cat1 = new Cat('大毛','黄色');
console.log(cat1.species); 

//继承 4. 利用虚拟 后代 来继承
var F = function(){};
F.prototype = Animal.prototype;     //虚拟人 拿来animal的外挂
CatGod.prototype = new F();   //catGod 再认虚拟人当干爹
CatGod.prototype.constuctor = Cat;                      

//封装一下
function extend(Child, Parent){
    var F = function(){};
    F.prototype = Parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.uber = parent.prototype; //备用而已
}

//继承 5.拷贝继承 
function extend2(Child, Parent){
    var p = Parent.prototype;
    var c = Child.prototype;
    for(var key in p){
        c[key] = p[key];
    }
    c.uber = p;
};