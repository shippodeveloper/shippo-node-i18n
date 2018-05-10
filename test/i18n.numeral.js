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
    it('Correct format with default setting', function () {
      translator.switchLocale('en');
      should.equal(translator.__nf(12345.67), '12,345.67', 'text display in English');

      translator.switchLocale('fr');
      should.equal(translator.__nf(12345.67), '12.345,67', 'text display in French');
    });

    it('Correct format with thousand delimiter', function () {
      translator.switchLocale('en');
      should.equal(translator.__nf(12345.67, '0,0'), '12,346', 'text display in English');

      translator.switchLocale('fr');
      should.equal(translator.__nf(12345.67, '0,0'), '12.346', 'text display in French');
    });

    it('Correct format with decimal delimiter', function () {
      translator.switchLocale('en');
      should.equal(translator.__nf(12345.67, '0.0'), '12345.7', 'text display in English');

      translator.switchLocale('fr');
      should.equal(translator.__nf(12345.67, '0.0'), '12345,7', 'text display in French');
    });

    // it('remove zero at first string', function () {
    //   translator.switchLocale('en');
    //   should.equal(translator.__nf(1234567, '0,0'), '123,457', 'text display in English');
    //
    //   translator.switchLocale('fr');
    //   should.equal(translator.__nf(1234567, '0,0'), '123.457', 'text display in French');
    // });
  });
  
  describe('abbreviations', function () {
    it('abbreviating thousands', function () {
      translator.switchLocale('en');
      should.equal(translator.__nf(12300, '0,0.0a'), '12.3k', 'text display in English');

      translator.switchLocale('fr');
      should.equal(translator.__nf(12300, '0,0.0a'), '12,3K', 'text display in French');
    });

    it('abbreviating millions', function () {
      translator.switchLocale('en');
      should.equal(translator.__nf(12300000, '0,0.0a'), '12.3m', 'text display in English');

      translator.switchLocale('fr');
      should.equal(translator.__nf(12300000, '0,0.0a'), '12,3M', 'text display in French');
    });

    it('abbreviating billions', function () {
      translator.switchLocale('en');
      should.equal(translator.__nf(12300000000, '0,0.0a'), '12.3b', 'text display in English');

      translator.switchLocale('fr');
      should.equal(translator.__nf(12300000000, '0,0.0a'), '12,3B', 'text display in French');
    });

    it('abbreviating trillions', function () {
      translator.switchLocale('en');
      should.equal(translator.__nf(12300000000000, '0,0.0a'), '12.3t', 'text display in English');

      translator.switchLocale('fr');
      should.equal(translator.__nf(12300000000000, '0,0.0a'), '12,3T', 'text display in French');
    });
  });

  describe('get number value', function () {
    it('Get correct value from string included delimiter', function () {
      translator.switchLocale('en');
      should.equal(translator.__nv('12,345.67'), 12345.67, 'value in English');

      translator.switchLocale('fr');
      should.equal(translator.__nv('12.345,67'), 12345.67, 'value in French');
    });

    it('Get correct value from abbreviating text', function () {
      translator.switchLocale('en');
      should.equal(translator.__nv('12.3k'), 12300, 'value in English');
      should.equal(translator.__nv('12.3m'), 12300000, 'value in English');
      should.equal(translator.__nv('12.3b'), 12300000000, 'value in English');
      should.equal(translator.__nv('12.3t'), 12300000000000, 'value in English');

      translator.switchLocale('fr');
      should.equal(translator.__nv('12,3K'), 12300, 'value in French');
      should.equal(translator.__nv('12,3M'), 12300000, 'value in French');
      should.equal(translator.__nv('12,3B'), 12300000000, 'value in French');
      should.equal(translator.__nv('12,3T'), 12300000000000, 'value in French');
    });
  })
});