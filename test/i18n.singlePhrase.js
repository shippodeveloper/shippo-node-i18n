var shippo_i18n = require('../shippo-i18n'),
    should = require("should"),
    fs = require('fs');

var directory = './locales';

function putJson(l, d) {
    fs.writeFileSync(directory + '/' + l + '.json', JSON.stringify(d, null, '\t'));
}

describe('Module Defaults', function() {

    var translator = {};
    var locales = ['en', 'de', 'fr'];

    before(function() {
      shippo_i18n.init({
            locales: ['en', 'de', 'fr', 'ru'],
            directory: './locales',
            register: translator,
            updateFiles: false,
            objectNotation: true
        });
    });

    it('__() should return translated parsed and substituted string in en', function(done) {
        translator.switchLocale('en');
        should.deepEqual(translator.__('Hello'), 'Hello');
        should.deepEqual(translator.__('Hello %s', 'Marcus'), 'Hello Marcus');
        should.deepEqual(translator.__('Hello {{name}}', { name: 'Marcus' }), 'Hello Marcus');

        done();
    });
    it('__() should return translated parsed and substituted string in de', function(done) {
        translator.switchLocale('de');
        should.deepEqual(translator.__('Hello'), 'Hallo');
        should.deepEqual(translator.__('Hello %s', 'Marcus'), 'Hallo Marcus');
        should.deepEqual(translator.__('Hello {{name}}', { name: 'Marcus' }), 'Hallo Marcus');

        done();
    });
    it('__() should return translated parsed and substituted string in fr', function(done) {
        translator.switchLocale('fr');
        should.deepEqual(translator.__('Hello'), 'Bonjour');
        should.deepEqual(translator.__('Hello %s', 'Marcus'), 'Bonjour Marcus');
        should.deepEqual(translator.__('Hello {{name}}', { name: 'Marcus' }), 'Bonjour Marcus');

        done();
    });
});