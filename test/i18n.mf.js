var shippo_i18n = require('../shippo-i18n'),
  should = require("should");

describe('parsing Message format phrases', function() {

  var mfTest = {};

  beforeEach(function() {
    shippo_i18n.init({
      locales: ['en', 'de', 'fr', 'ru'],
      directory: './locales',
      register: mfTest,
      updateFiles: false,
      objectNotation: true
    });
  });

  it('should work with simple strings', function() {
    mfTest.switchLocale('en');
    should.equal('Hello', mfTest.__mf('Hello'));

    mfTest.switchLocale('de');
    should.equal('Hallo', mfTest.__mf('Hello'));
    should.equal('Hallo', mfTest.__mf('Hello'));
    should.equal('Hallo Marcus, wie geht es dir heute?', mfTest.__mf('Hello %s, how are you today?', 'Marcus'));
    should.equal('Hello', mfTest.__mf({ phrase: 'Hello', locale: 'en' }));
    should.equal('Hello', mfTest.__mf({ phrase: 'Hello', locale: 'en' }));
  });

  it('should work with basic replacements', function() {
    mfTest.switchLocale('en');
    should.equal('Hello Marcus', mfTest.__mf('Hello {name}', { name: 'Marcus' }));

    mfTest.switchLocale('de');
    should.equal('Hallo Marcus', mfTest.__mf('Hello {name}', { name: 'Marcus' }));
    should.equal('Hallo Marcus, wie war dein test?', mfTest.__mf('Hello {name}, how was your %s?', 'test', { name: 'Marcus' }));
  });

  it('should work with plurals', function() {
    var msg = 'In {lang} there {NUM, plural,';
    msg += 'zero{are zero for #}';
    msg += 'one{is one for #}';
    msg += 'two{is two for #}';
    msg += 'few{are a few for #}';
    msg += 'many{are many for #}';
    msg += 'other{others for #}}';

    mfTest.switchLocale('en');
    should.equal('In english there others for 0', mfTest.__mf(msg, { NUM: 0, lang: 'english' }));
    should.equal('In english there is one for 1', mfTest.__mf(msg, { NUM: 1, lang: 'english' }));
    should.equal('In english there others for 2', mfTest.__mf(msg, { NUM: 2, lang: 'english' }));
    should.equal('In english there others for 3', mfTest.__mf(msg, { NUM: 3, lang: 'english' }));
    should.equal('In english there others for 4', mfTest.__mf(msg, { NUM: 4, lang: 'english' }));
    should.equal('In english there others for 5', mfTest.__mf(msg, { NUM: 5, lang: 'english' }));
    should.equal('In english there others for 6', mfTest.__mf(msg, { NUM: 6, lang: 'english' }));

    mfTest.switchLocale('de');
    should.equal('In german there others for 0', mfTest.__mf(msg, { NUM: 0, lang: 'german' }));
    should.equal('In german there is one for 1', mfTest.__mf(msg, { NUM: 1, lang: 'german' }));
    should.equal('In german there others for 2', mfTest.__mf(msg, { NUM: 2, lang: 'german' }));
    should.equal('In german there others for 3', mfTest.__mf(msg, { NUM: 3, lang: 'german' }));
    should.equal('In german there others for 4', mfTest.__mf(msg, { NUM: 4, lang: 'german' }));
    should.equal('In german there others for 5', mfTest.__mf(msg, { NUM: 5, lang: 'german' }));
    should.equal('In german there others for 6', mfTest.__mf(msg, { NUM: 6, lang: 'german' }));

    mfTest.switchLocale('fr');
    should.equal('In french there is one for 0', mfTest.__mf(msg, { NUM: 0, lang: 'french' }));
    should.equal('In french there is one for 1', mfTest.__mf(msg, { NUM: 1, lang: 'french' }));
    should.equal('In french there others for 2', mfTest.__mf(msg, { NUM: 2, lang: 'french' }));
    should.equal('In french there others for 3', mfTest.__mf(msg, { NUM: 3, lang: 'french' }));
    should.equal('In french there others for 4', mfTest.__mf(msg, { NUM: 4, lang: 'french' }));
    should.equal('In french there others for 5', mfTest.__mf(msg, { NUM: 5, lang: 'french' }));
    should.equal('In french there others for 6', mfTest.__mf(msg, { NUM: 6, lang: 'french' }));

    mfTest.switchLocale('ru');
    should.equal('In russian there are many for 0', mfTest.__mf(msg, { NUM: 0, lang: 'russian' }));
    should.equal('In russian there is one for 1', mfTest.__mf(msg, { NUM: 1, lang: 'russian' }));
    should.equal('In russian there are a few for 2', mfTest.__mf(msg, { NUM: 2, lang: 'russian' }));
    should.equal('In russian there are a few for 3', mfTest.__mf(msg, { NUM: 3, lang: 'russian' }));
    should.equal('In russian there are a few for 4', mfTest.__mf(msg, { NUM: 4, lang: 'russian' }));
    should.equal('In russian there are many for 5', mfTest.__mf(msg, { NUM: 5, lang: 'russian' }));
    should.equal('In russian there are many for 6', mfTest.__mf(msg, { NUM: 6, lang: 'russian' }));
    should.equal('In russian there is one for 21', mfTest.__mf(msg, { NUM: 21, lang: 'russian' }));
  });
});