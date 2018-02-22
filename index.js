const SNObject = require('./src/sn_object');

let a = new SNObject({
    _ctor: (s) => {
        this.set('prop1', s);
    },
    _props: {
        prop1: {}
    }
}, "Hello World!");

console.log(a.get('prop1'));