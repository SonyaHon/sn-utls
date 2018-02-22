const Events = require('events');

class SNObject extends Events {
    
    constructor(obj, ...ctor_args) {
        super();
        Object.defineProperty(this, '__raw_values', {
            configurable: false,
            enumerable: false,
            value: {},
            writable: false
        });
        if(obj['_props']) {
            let temp = obj['_props'];
            Object.keys(temp).forEach( (prop) => {
                Object.defineProperty(this.__raw_values, prop, {
                    configurable: false,
                    enumerable: true,
                    writable: true
                });
            } );
        }

        this.set = function(prop, value) {
            this.__raw_values[prop] = value;
        } 

        this.get = function(prop) {
            return this.__raw_values[prop];
        }

        if(!obj['_ctor']) 
            throw new Error('SNObject must have _ctor property.');
        else 
            obj['_ctor'].apply(this, ctor_args);
    }
};

module.exports = SNObject;