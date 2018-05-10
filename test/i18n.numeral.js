var I18n = require('../i18n').I18n,
  should = require('should');

describe('i18n numeral', function () {
  var translator = {};

  before(function() {
    I18n.init({
      locales: ['en', 'de', 'fr', 'ru'],
      directory: './locales',
      register: translator,
      updateFiles: false,
      objectNotation: true,
      numeral: {
        defaultFormat: '0,0.00',
        en: {
          delimiters: {
            thousands: ',',
            decimal: '.'
          },
          abbreviations: {
            thousand: 'K',
            million: 'M',
            billion: 'B',
            trillion: 'T'
          },
          currency: {
            symbol: '$'
          }
        },
        fr: {
          delimiters: {
            thousands: '.',
            decimal: ','
          },
          abbreviations: {
            thousand: 'K',
            million: 'M',
            billion: 'B',
            trillion: 'T'
          },
          currency: {
            symbol: '€'
          }
        }
      }
    });
  });

  describe('Format display text', function () {
    // it('default format', function () {
    //   translator.setLocale('en');
    //   should.equal(translator.__nf(12345.67), '12,345.67', 'text display in English');
    //
    //   translator.setLocale('fr');
    //   should.equal(translator.__nf(12345.67), '12.345,67', 'text display in French');
    // });

    it('thousand delimiter', function () {
      translator.switchLocale('en');
      should.equal(translator.__nf(12345.67, '0,0'), '12,346', 'text display in English');

      translator.switchLocale('fr');
      should.equal(translator.__nf(12345.67, '0,0'), '12.346', 'text display in French');
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