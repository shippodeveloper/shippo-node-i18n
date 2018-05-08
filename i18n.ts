export class i18n {
    private numeral;
    private currency;

    constructor(numeral, currency) {
        this.numeral = numeral;
        this.currency = currency;
    }

    configure(opt: object) {
    }

    readonly version = "1.0.0";

    /** set current locale **/
    setLocale(object, locale, skipImplicitObjects) {
    }

    /** get current locale **/
    getLocale() {}

    /** translates a single phrase @see https://www.npmjs.com/package/i18n */
    __(phrase: any):string {
        let output:string;

        return output;
    }

    /** plurals translation of a single phrase @see https://www.npmjs.com/package/i18n **/
    __n(singular:string, plural, count):string {
        let output:string;

        return output;
    }

    /** translates advanced message with format format @see https://www.npmjs.com/package/i18n **/
    __mf(phrase: any): string {
        let output:string;

        return output;
    }

    /** list of translated message for a given phrase in each language **/
    __l(phrase:any) {
    }

    /** returns a hashed list of translations for a given phrase in each language. **/
    __h(phase:any) {
    }

    /** get numeral value **/
    __nv(input:string):number {
        let value:number;
        return value;
    }

    /** format number **/
    __nf(input:number, format:string):string {
        let output:string;
        return output;
    }

    /** get currency value **/
    __cv(input: string):number {
        let value:number;
        return value;
    }

    /** format currency display **/
    __cf(input: number): string {
        let output:string;
        return output;
    }

    __df():string {
    }
}