var I18n = require('../i18n').I18n,
  should = require('should');

describe('18n numeral', function () {
  var translator = {};

  beforeEach(function() {
    I18n.init({
      locales: ['en', 'de', 'fr', 'ru'],
      directory: './locales',
      register: translator,
      updateFiles: false,
      objectNotation: true,
      defaultFormat: '0,0[.]0'
    });
  });

  describe('Format display text', function () {
    it('default format', function () {
      translator.setLocale('en');
      should.equal(translator.__nf(12345.67), '12,345.67', 'text display in English');

      translator.setLocale('fr');
      should.equal(translator.__nf(12345.67), '12.345,67', 'text display in French');
    });

    it('thousand delimiter', function () {
    });

    it('decimal delimiter', function () {
    });

    it('remove zero at first string', function () {
    });
  });
  
  describe('abbreviations', function () {
    it('abbreviating thousands', function () {
    });

    it('abbreviating millions', function () {
    });

    it('abbreviating billions', function () {
    });
  })
});