export declare class I18n {
    readonly version: string;
    private static _api;
    private static _defaultLocale;
    static init(opt: any): I18n;
    private static _applyAPItoObject(object);
    /**
     * Get number value from formatted text
     * @param {string} input
     * @returns {number}
     * @public
     */
    static __nv(input: string): number;
    /**
     * Format display number
     * @param {number} value
     * @private
     */
    static __nf(value: number): any;
}
