const {
    SyncHook,
    AsyncSeriesHook
} = require('tapable');

class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newspeed']),
            brake: new SyncHook(),
            caculateRoutes: new AsyncSeriesHook(['source', 'target', 'routes'])
        }
    }
}

const myCar = new Car();

myCar.hooks.brake.tap('warningLampPlugin', ()=> console.log('warningLampPlugin'));
myCar.hooks.accelerate.tap('loggerPlugin', newSpeed => {
    console.log(`Accelerating to ${newSpeed}`)
})

myCar.hooks.caculateRoutes.tapPromise('caculateRoutes tapPromise', (source, target, routeList, callback) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            console.log(`tapPromise to ${source} ${target} ${routeList}`);
            resolve()
        }, 1000)
    })
})

myCar.hooks.brake.call();
myCar.hooks.accelerate.call(10);

myCar.hooks.caculateRoutes.promise('Async', 'hook', 'demo').then(()=> {
    console.log('cost');
}, err => {
    console.log(err);
    console.timeEnd('cost')
});
