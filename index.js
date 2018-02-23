const SNObject = require('./src/sn_object');

let a = SNObject.Create({
    _ctor: function(message) {
        this.set('prop1', message);
    },
    _props: {
        prop1: {}
    }
}, 'Hello World!');

let test = a.get('prop1');
console.log(test);
a.set('prop1', 'But Cruel World!');
console.log(test);