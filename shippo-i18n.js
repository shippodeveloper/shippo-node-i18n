"use strict";
module.exports = (function () {
    let version = '2.0.0', i18n = require('i18n'), numeral = require('numeral'), moment = require('moment'), _api = {
        '__nv': '__nv',
        '__nf': '__nf',
        '__cf': '__cf',
        '__cv': '__cv',
        '__dtf': '__dtf',
        'switchLocale': 'switchLocale'
    };
    let shippo_i18n = {};
    shippo_i18n.init = function (opt) {
        //setup i18n
        opt = Object.assign({}, opt);
        i18n.configure(opt);
        //setup numeral
        if (typeof (opt.numeral) === 'object') {
            if (opt.numeral.hasOwnProperty('defaultFormat')) {
                numeral.defaultFormat(opt.numeral.defaultFormat);
                delete opt.numeral.defaultFormat;
            }
            for (let locale in opt.numeral) {
                if (numeral.hasOwnProperty('locales') && typeof numeral.locales[locale] !== 'undefined') {
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
                    r.numeral = numeral;
                    r.moment = moment;
                    _applyAPItoObject(r);
                });
            }
            else {
                opt.register.numeral = numeral;
                opt.register.moment = moment;
                _applyAPItoObject(opt.register);
            }
        }
    };
    function _applyAPItoObject(object) {
        let alreadySet = true;
        // attach to itself if not provided
        for (let method in _api) {
            if (_api.hasOwnProperty(method)) {
                let alias = _api[method];
                // be kind rewind, or better not touch anything already existing
                if (!object[alias]) {
                    alreadySet = false;
                    //@ts-ignore
                    object[alias] = shippo_i18n[method].bind(object);
                }
            }
        }
        // set initial locale if not set
        if (!object.locale) {
            object.locale = i18n.getLocale();
        }
        // escape recursion
        if (alreadySet) {
            return;
        }
    }
    /**
     * Get number value from formatted text
     * @param {string} input
     * @returns {number}
     * @public
     */
    shippo_i18n.__nv = function (input) {
        //@ts-ignore
        let output = this.numeral(input);
        return output.value();
    };
    /**
     * Format display number
     * @param {number} value
     * @private
     */
    shippo_i18n.__nf = function (value) {
        if (typeof arguments[1] !== 'undefined') {
            //@ts-ignore
            return this.numeral(value).format(arguments[1]);
        }
        //@ts-ignore
        return this.numeral(value).format();
    };
    /**
     * Format currency text from value
     *
     * @param {number} value
     * @param includeSymbol
     * @returns {string}
     * @private
     */
    shippo_i18n.__cf = function (value, includeSymbol) {
        if (typeof includeSymbol === 'undefined') {
            includeSymbol = true;
        }
        if (includeSymbol === true) {
            //@ts-ignore
            return this.__nf(value, this.__('currency.default_format'));
        }
        //@ts-ignore
        return this.__nf(value);
    };
    /**
     * Get value from currency formatted text
     *
     * @param {string} input
     * @returns {number}
     * @private
     */
    shippo_i18n.__cv = function (input) {
        //@ts-ignore
        return this.__nv(input);
    };
    /**
     *
     * @param source Date|unix time formatted sting, exp: '2018-05-11'
     * @param {string} format define in locate file
     * @returns {string}
     * @private
     */
    shippo_i18n.__dtf = function (source, format) {
        //@ts-ignore
        source = this.moment(source);
        //@ts-ignore
        return source.isValid() ? source.format(this.__('datetime.' + format)) : null;
    };
    /**
     * Change locale
     * @param {string} locale
     */
    shippo_i18n.switchLocale = function (locale) {
        //@ts-ignore
        this.setLocale(locale);
        //@ts-ignore
        this.numeral.locale(this.getLocale());
        //@ts-ignore
        this.moment.locale(this.getLocale());
    };
    return shippo_i18n;
}());
