const { SyncHook } = require('tapable');

const hook = new SyncHook(['args1', 'args2', 'args3']);
// 绑定事件到webpack事件流
hook.tap('hook1', (args1, arg2, arg3) => {
  console.log(args1, arg2, arg3)
});

// 执行绑定的事件
hook.call(1,2,3)