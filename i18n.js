"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let i18n = require("i18n");
let numeral = require('numeral');
class I18n {
    constructor() {
        this.version = '1.0.0';
    }
    static init(opt) {
        let si18n = new I18n();
        //setup i18n
        opt = Object.assign({
            register: si18n
        }, opt);
        i18n.configure(opt);
        I18n._defaultLocale = i18n.getLocale();
        //setup numeral
        if (typeof (opt.numeral) === 'object') {
            if (opt.numeral.hasOwnProperty('defaultFormat')) {
                numeral.defaultFormat = opt.numeral.defaultFormat;
                delete opt.numeral.defaultFormat;
            }
            for (let locale in opt.numeral) {
                numeral.register('locale', locale, opt.numeral[locale]);
            }
        }
        // you may register i18n in global scope, up to you
        let register;
        if (typeof opt.register === 'object') {
            register = opt.register;
            // or give an array objects to register to
            if (Array.isArray(opt.register)) {
                register = opt.register;
                register.forEach(function (r) {
                    I18n._applyAPItoObject(r);
                });
            }
            else {
                I18n._applyAPItoObject(opt.register);
            }
        }
        return si18n;
    }
    static _applyAPItoObject(object) {
        var alreadySetted = true;
        let api = I18n._api;
        // attach to itself if not provided
        for (let method in api) {
            if (api.hasOwnProperty(method)) {
                let alias = api[method];
                // be kind rewind, or better not touch anything already existing
                if (!object[alias]) {
                    alreadySetted = false;
                    object[alias] = I18n[method].bind(object);
                }
            }
        }
        // set initial locale if not set
        if (!object.locale) {
            object.locale = I18n._defaultLocale;
        }
        // escape recursion
        if (alreadySetted) {
            return;
        }
    }
    /**
     * Get number value from formatted text
     * @param {string} input
     * @returns {number}
     * @public
     */
    static __nv(input) {
        let output = numeral(input);
        return output.value();
    }
    /**
     * Format display number
     * @param {number} value
     * @private
     */
    static __nf(value) {
        if (!arguments[1]) {
            return numeral(value).format(arguments[1]);
        }
        return numeral(value).format();
    }
}
I18n._api = {
    '__nv': '__nv',
    '__nf': '__nf'
};
exports.I18n = I18n;
