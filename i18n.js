"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let i18n = require("i18n");
let numeral = require('numeral');
class I18n {
    constructor() {
        this.version = '0.1.1';
    }
    static init(opt) {
        //setup i18n
        opt = Object.assign({}, opt);
        this._registerObj = opt.register;
        i18n.configure(opt);
        I18n._defaultLocale = i18n.getLocale();
        //setup numeral
        if (typeof (opt.numeral) === 'object') {
            if (opt.numeral.hasOwnProperty('defaultFormat')) {
                numeral.defaultFormat(opt.numeral.defaultFormat);
                delete opt.numeral.defaultFormat;
            }
            for (let locale in opt.numeral) {
                if (locale === 'en') {
                    continue;
                }
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
        if (typeof arguments[1] !== 'undefined') {
            return numeral(value).format(arguments[1]);
        }
        return numeral(value).format();
    }
    /**
     * Format currency text from value
     *
     * @param {number} value
     * @param includeSymbol
     * @returns {string}
     * @private
     */
    static __cf(value, includeSymbol) {
        if (typeof includeSymbol === 'undefined') {
            includeSymbol = true;
        }
        if (includeSymbol === true) {
            //@ts-ignore
            return this.__nf(value, this.__('format.currency'));
        }
        return this.__nf(value);
    }
    /**
     * Get value from currency formatted text
     *
     * @param {string} input
     * @returns {number}
     * @private
     */
    static __cv(input) {
        return this.__nv(input);
    }
    /**
     * Change locale
     * @param {string} locale
     */
    static switchLocale(locale) {
        i18n.setLocale(locale);
        numeral.locale(i18n.getLocale());
    }
}
I18n._api = {
    '__nv': '__nv',
    '__nf': '__nf',
    '__cf': '__cf',
    '__cv': '__cv',
    'switchLocale': 'switchLocale'
};
exports.I18n = I18n;
