/**
 * 发布、订阅是一种消息模式
 * 
 * 发布者 发布消息 ------>   广播电台
 * 订阅者 绑定    ------->   听众数量
 * 
 * 简单来说就是消息发布者不直接向订阅者发布消息，而是发布到中介，
 * 而中介根据不同主题对消息进行过滤，并通知对该主题感兴趣的订阅者
 * 
 * 
 *  该模式在前端现在很火的组件化开发十分常用，因为该模式松耦合，
 *  易于扩展的优点正式组件化开发所需要的。
 * 
 */

//优点： 1.松耦合  电台不知道有多少 听众在订阅收听 节目·
//      2.可扩展性 
//      3.更干净的设计  为此我们要深入思考 不同组件是如何 交互的
//      4.灵活性       不需要担心不同的组件是如何组合在一起的。 只要他们共同遵守一份协议就好了

/** 
 * 缺点： 1.无法知道消息传送是成功的还是失败的。紧耦合是需要保证这一点的。
 *       2. 两者之间。互不了解
 *       3. 如果订阅者 和 发布者 数量增加 会导致架构不稳定， 造成负载问题；
 *       4.（恶意的发布者）攻击 系统 。导致恶意系统发布
 *       5. 更新两者关系 是 一个很难的问题， 毕竟不了解对方。
 *       6. 需要中间人
 * 
 * 
 * 结论： 最大的优点也是 最大的缺点.这个模式是设计松耦合系统的很好地方式。  RSS 新闻订阅 pubsub
 */

var PubSub = {};
// 用于储存事件队列
var queue = {};

// 订阅接口
PubSub.on = function(event, cb) {
  if (!queue[event]) {
    queue[event] = [];
  }
  queue[event].push(cb);
};

// 退订接口
PubSub.off = function(event, cb) {
  var currentEvent = queue[event];
  var len = 0;
  if (currentEvent) {
    len = currentEvent.length;
    for (var i = len - 1; i >= 0; i--) {
      if (currentEvent[i] === cb) {
        currentEvent.splice(i, 1);
      }
    }
  }
};

// 发布接口
PubSub.emit = function(event) {
  var currentEvent = queue[event];
  if (currentEvent) {
    for (var i = 0; i < currentEvent.length; i++) {
      currentEvent[i]();
    }
  }
};


//使用：

// 订阅
var callbackA = function () {
    console.log('event a happened')
};
PubSub.on('a', callbackA);
PubSub.on('b', function() {
    console.log('event b happened')
});

// 退订 , 第二个参赛传入回调函数的引用
PubSub.off('a', callbackA);

// 发布
PubSub.emit('a');
PubSub.emit('b');
