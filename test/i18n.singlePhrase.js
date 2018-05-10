var i18n = require('../i18n').I18n,
    should = require("should"),
    fs = require('fs');

var directory = './locales';

function putJson(l, d) {
    fs.writeFileSync(directory + '/' + l + '.json', JSON.stringify(d, null, '\t'));
}

describe('Module Defaults', function() {

    var TestScope = {};
    var locales = ['en', 'de', 'fr'];

    beforeEach(function() {
        TestScope = {};
        TestScope = i18n.init({
            locales: locales,
            directory: "./locales",
            updateFiles: true,
            syncFiles: true,
            objectNotation: true
        });

        TestScope.setLocale('en');
    });

    it('__() should return translated parsed and substituted string in en', function(done) {
        TestScope.setLocale('en');
        should.deepEqual(TestScope.__('Hello'), 'Hello');
        should.deepEqual(TestScope.__('Hello %s', 'Marcus'), 'Hello Marcus');
        should.deepEqual(TestScope.__('Hello {{name}}', { name: 'Marcus' }), 'Hello Marcus');

        done();
    });
    it('__() should return translated parsed and substituted string in de', function(done) {
        TestScope.setLocale('de');
        should.deepEqual(TestScope.__('Hello'), 'Hallo');
        should.deepEqual(TestScope.__('Hello %s', 'Marcus'), 'Hallo Marcus');
        should.deepEqual(TestScope.__('Hello {{name}}', { name: 'Marcus' }), 'Hallo Marcus');

        done();
    });
    it('__() should return translated parsed and substituted string in fr', function(done) {
        TestScope.setLocale('fr');
        should.deepEqual(TestScope.__('Hello'), 'Bonjour');
        should.deepEqual(TestScope.__('Hello %s', 'Marcus'), 'Bonjour Marcus');
        should.deepEqual(TestScope.__('Hello {{name}}', { name: 'Marcus' }), 'Bonjour Marcus');

        done();
    });
});