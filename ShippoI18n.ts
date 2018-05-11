let i18n = require('i18n');
let numeral = require('numeral');
let moment = require('moment');

export class ShippoI18n {
    public readonly version:string = '0.1.2';
    private static _api = {
        '__nv' : '__nv',
        '__nf' : '__nf',
        '__cf' : '__cf',
        '__cv' : '__cv',
        '__dtf' : '__dtf',
        'switchLocale' : 'switchLocale'
    };
    private static _defaultLocale:string;

    private static _registerObj:any;

    public static init(opt:any) {

        //setup i18n
        opt = (<any>Object).assign({}, opt);

        this._registerObj = opt.register;

        i18n.configure(opt);
        ShippoI18n._defaultLocale = i18n.getLocale();

        //setup numeral
        if (typeof(opt.numeral) === 'object') {
            if (opt.numeral.hasOwnProperty('defaultFormat')) {
                numeral.defaultFormat(opt.numeral.defaultFormat);
                delete opt.numeral.defaultFormat;
            }
            for(let locale in opt.numeral) {
                if(locale === 'en') { continue;}
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
                    ShippoI18n._applyAPItoObject(r);
                });
            } else {
                ShippoI18n._applyAPItoObject(opt.register);
            }
        }
    }

    private static _applyAPItoObject(object:any) {
        var alreadySetted = true;

        let api:any = ShippoI18n._api;

        // attach to itself if not provided
        for (let method in api) {
            if (api.hasOwnProperty(method)) {
                let alias:string = api[method];

                // be kind rewind, or better not touch anything already existing
                if (!object[alias]) {
                    alreadySetted = false;
                    object[alias] = (<any>ShippoI18n)[method].bind(object);
                }
            }
        }

        // set initial locale if not set
        if (!object.locale) {
            object.locale = ShippoI18n._defaultLocale;
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
    public static __nf(value: number):string {
        if(typeof arguments[1] !== 'undefined') {
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
    public static __cf(value:number, includeSymbol:any):string {
        if(typeof includeSymbol === 'undefined') {
            includeSymbol = true;
        }

        if (includeSymbol === true) {
            //@ts-ignore
            return this.__nf(value, this.__('currency.default_format'));
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
    public static __cv(input:string): number {
        return this.__nv(input);
    }

    /**
     *
     * @param source Date|unix time formatted sting, exp: '2018-05-11'
     * @param {string} format define in locate file
     * @returns {string}
     * @private
     */
    public static __dtf(source: any, format: string): string {
        source = moment(source);
        //@ts-ignore
        return source.isValid()? source.format(this.__('datetime.' +format)): null;
    }

    /**
     * Change locale
     * @param {string} locale
     */
    public static switchLocale(locale:string) {
        i18n.setLocale(locale);
        numeral.locale(i18n.getLocale());
        moment.locale(i18n.getLocale());
    }
}
