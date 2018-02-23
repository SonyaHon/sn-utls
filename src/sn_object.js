const Events = require('events');

class SNObject extends Events {

    constructor() {
        super();
        Object.defineProperty(this, '__raw_values', {
            configurable: false,
            enumerable: false,
            value: {},
            writable: false
        });
    }

    static Create(obj, ...ctor_args) {

        let _sn_object = new SNObject();

        if(obj['_props']) {
            let temp = obj['_props'];
            Object.keys(temp).forEach( (prop) => {
                Object.defineProperty(_sn_object.__raw_values, prop, {
                    configurable: false,
                    enumerable: true,
                    writable: true
                });
            } );
        }

        if(!obj['_ctor']) 
            throw new Error('SNObject must have _ctor property.');
        else 
            obj['_ctor'].apply(_sn_object, ctor_args);


        return _sn_object;
    }

    set(prop, new_value) {
        let old_value = this.__raw_values[prop];
        this.__raw_values[prop] = new_value;
        this.emit(`${prop}-set`, old_value, new_value);
    }

    get(prop) {
        return (function() {
            return this.__raw_values[prop];
        }.bind(this))();
    }

};

module.exports = SNObject;