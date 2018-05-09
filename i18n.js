"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let i18n = require("i18n");
class I18n {
    static init(opt) {
        let si18n = new I18n();
        opt = Object.assign({
            register: si18n
        }, opt);
        i18n.configure(opt);
        return si18n;
    }
}
exports.I18n = I18n;
