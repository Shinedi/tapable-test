const Compiler = require('./compiler.js');

class Myplugin {
    constructor (){

    }

    apply (compiler) {
        // 监听hook
        compiler.hooks.brake.tap('warningLampPlugin', ()=> console.log('warningLampPlugin'));
        compiler.hooks.accelerate.tap('loggerPlugin', newSpeed => {
            console.log(`Accelerating to ${newSpeed}`)
        })
        compiler.hooks.caculateRoutes.tapPromise('caculateRoutes tapPromise', (source, target, routeList, callback) => {
            return new Promise((resolve, reject) => {
                setTimeout(()=> {
                    console.log(`tapPromise to ${source} ${target} ${routeList}`);
                    resolve()
                }, 1000)
            })
        })
    }
}

const myPlugin = new Myplugin();

const options = {
    plugins: [ myPlugin ]
}

const compiler = new Compiler();

for(let plugin of options.plugins) {
    if (typeof plugin === 'function') {
        plugin.call(compiler, compiler)
    } else {
        plugin.apply(compiler)
    }
}

compiler.run();