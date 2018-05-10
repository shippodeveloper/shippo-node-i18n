let i18n = require("i18n");
let numeral = require('numeral');

export class I18n {
    public readonly version:string = '1.0.0';
    private static _api = {
        '__nv' : '__nv',
        '__nf' : '__nf'
    };
    private static _defaultLocale:string;

    public static init(opt:any):I18n {
        let si18n = new I18n();

        //setup i18n
        opt = (<any>Object).assign({
            register: si18n
        }, opt);

        i18n.configure(opt);
        I18n._defaultLocale = i18n.getLocale();

        //setup numeral
        if (typeof(opt.numeral) === 'object') {
            if (opt.numeral.hasOwnProperty('defaultFormat')) {
                numeral.defaultFormat = opt.numeral.defaultFormat;
                delete opt.numeral.defaultFormat;
            }
            for(let locale in opt.numeral) {
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
                register.forEach(function(r:any) {
                    I18n._applyAPItoObject(r);
                });
            } else {
                I18n._applyAPItoObject(opt.register);
            }
        }
        return si18n;
    }

    private static _applyAPItoObject(object:any) {
        var alreadySetted = true;

        let api:any = I18n._api;

        // attach to itself if not provided
        for (let method in api) {
            if (api.hasOwnProperty(method)) {
                let alias:string = api[method];

                // be kind rewind, or better not touch anything already existing
                if (!object[alias]) {
                    alreadySetted = false;
                    object[alias] = (<any>I18n)[method].bind(object);
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
    public static __nv(input:string):number {
        let output = numeral(input);
        return output.value();
    }

    /**
     * Format display number
     * @param {number} value
     * @private
     */
    public static __nf(value: number) {
        if(!arguments[1]) {
            return numeral(value).format(arguments[1]);
        }

        return numeral(value).format();
    }
}
