let i18n = require("i18n");

export class I18n {
    public static init(opt:any):I18n {
        let si18n = new I18n();
        opt = (<any>Object).assign({
            register: si18n
        }, opt);

        i18n.configure(opt);

        return si18n;
    }
}
