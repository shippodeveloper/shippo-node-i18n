var I18n = require('../i18n').I18n;
var should = require("should");

describe('Object Notation', function() {
  let i18n = {};
  beforeEach(function() {
    I18n.init({
      locales: ['en', 'de'],
      directory: './locales',
      register: i18n,
      updateFiles: true,
      objectNotation: true
    });
  });

  describe('i18nTranslate', function() {

    beforeEach(function() {
      var catalog = i18n.getCatalog('en');
      delete catalog.nested.path;
    });

    it('should return en translations as expected, using object traversal notation', function() {
      i18n.switchLocale('en');
      should.equal(i18n.__('greeting.formal'), 'Hello');
      should.equal(i18n.__('greeting.informal'), 'Hi');
      should.equal(i18n.__('greeting.placeholder.formal', 'Marcus'), 'Hello Marcus');
      should.equal(i18n.__('greeting.placeholder.informal', 'Marcus'), 'Hi Marcus');
      should.throws(i18n.__('greeting.placeholder.loud', 'Marcus'));
    });

    it('should return en translations as expected, when dot is first or last character', function () {
      i18n.switchLocale('en');
      should.equal(i18n.__('. is first character'), 'Dot is first character');
      should.equal(i18n.__('last character is .'), 'last character is Dot');
      should.equal(i18n.__('few sentences. with .'), 'few sentences with Dot');
    });

    it('should provide proper pluralization support, using object traversal notation', function() {
      i18n.switchLocale('en');
      var singular = i18n.__n({ singular: "cat", plural: "cat", locale: "de" }, 1);
      var plural = i18n.__n({ singular: "cat", plural: "cat", locale: "de" }, 3);
      should.equal(singular, '1 Katze');
      should.equal(plural, '3 Katzen');
    });

    it('should allow for simple pluralization', function() {
      var singular = i18n.__n("nested.deep.plural", 1);
      var plural = i18n.__n("nested.deep.plural", 3);
      should.equal(singular, 'plural');
      should.equal(plural, 'plurals');
    });

    it('should correctly update files', function() {
      should.equal(i18n.__("nested.path"), "nested.path");
      should.equal(i18n.__("nested.path.sub"), "nested.path.sub");
      should.deepEqual(i18n.__("nested.path"), {
        sub: "nested.path.sub"
      });
    });
  });
});