var shippo_i18n = require('../shippo-i18n'),
  should = require('should');

describe('Switch locale', function () {
  let trans = {};
  beforeEach(function () {
    shippo_i18n.init({
      locales: ['en', 'de', 'fr', 'ru'],
      directory: './locales',
      register: trans,
      updateFiles: false,
      objectNotation: true
    });
  });

  it('should work', function () {
    trans.switchLocale('de');
    should.equal(trans.getLocale(), 'de');

    trans.switchLocale('fr');
    should.equal(trans.getLocale(), 'fr');

    trans.switchLocale('ru');
    should.equal(trans.getLocale(), 'ru');
  })
});