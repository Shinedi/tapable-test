const {
    SyncHook,
    AsyncSeriesHook
} = require('tapable');

module.exports = class Compiler {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newspeed']),
            brake: new SyncHook(),
            caculateRoutes: new AsyncSeriesHook(['source', 'target', 'routes'])
        }
    }
    run () {
        this.accelerate(10);
        this.brake()
        this.caculateRoutes('Async', 'hook', 'demo')
    }

    accelerate (speed) {
        this.hooks.accelerate.call(speed);
    }

    brake () {
        this.hooks.brake.call();
    }

    caculateRoutes () {
        this.hooks.caculateRoutes.promise(...arguments).then(()=> {
        }, err => {
            console.log(err);
        });
        
    }
}