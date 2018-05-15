var shippo_i18n = require('../shippo-i18n'),
  should = require('should');

describe('i18n \'s currency', function () {
  let i18n = {};
  beforeEach(function () {
    shippo_i18n.init({
      locales: ['en', 'vi'],
      directory: './locales',
      register: i18n,
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
        vi: {
          delimiters: {
            thousands: '.',
            decimal: ','
          },
          abbreviations: {
            thousand: 'K',
            million: 'Tr',
            billion: 'Tỷ',
            trillion: 'T.Tỷ'
          },
          currency: {
            symbol: '₫'
          }
        }
      }
    });
  });

  describe('Transform value in currency formatted', function () {
    it('Correct currency formatted text with symbol', function () {
      i18n.switchLocale('en');
      should.equal(i18n.__cf(12345.67), '$12,345.7', 'text display in English');

      i18n.switchLocale('vi');
      should.equal(i18n.__cf(12345.67), '12.346₫', 'text display in Vietnamese');
    });

    it('Correct currency formatted text without symbol', function () {
      i18n.switchLocale('en');
      should.equal(i18n.__cf(12345.67, false), '12,345.67', 'text display in English');

      i18n.switchLocale('vi');
      should.equal(i18n.__cf(12345.67, false), '12.345,67', 'text display in Vietnamese');
    });
  });

  describe('Getting value from currency formatted text', function () {
    it('Correct value from formatted text with symbol', function () {
      i18n.switchLocale('en');
      should.equal(i18n.__cv('$12,345.67'), 12345.67, 'value in English');

      i18n.switchLocale('vi');
      should.equal(i18n.__cv('12.345,67₫'), 12345.67, 'value in Vietnamese');
    });

    it('Correct value from formatted text without symbol', function () {
      i18n.switchLocale('en');
      should.equal(i18n.__cv('12,345.67'), 12345.67, 'value in English');

      i18n.switchLocale('vi');
      should.equal(i18n.__cv('12.345,67'), 12345.67, 'value in Vietnamese');
    });
  });
});