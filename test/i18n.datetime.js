let I18n = require('../i18n').I18n,
    should = require('should');

describe('I18n datetime format', function () {
  let i18n = {};

  before(function () {
    I18n.init({
      locales: ['en', 'vi'],
      directory: './locales',
      register: i18n,
      updateFiles: false,
      objectNotation: true,
    });
  });

  it('Correct format full date time', function () {
    let date = new Date(2018, 9, 24, 10, 33, 30, 0);
    let date2 = new Date(2018, 9, 24, 0, 0, 0, 0);

    i18n.switchLocale('en');
    //with date object
    should.equal(i18n.__dtf(date, 'full_date_time'), '10/24/2018 10:33:30', 'English');
    should.equal(i18n.__dtf(date2, 'full_date_time'), '10/24/2018 00:00:00', 'English');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'full_date_time'), '10/24/2018 10:33:30', 'English');
    should.equal(i18n.__dtf('2018-10-24 00:00:00', 'full_date_time'), '10/24/2018 00:00:00', 'English');

    i18n.switchLocale('vi');
    //with date object
    should.equal(i18n.__dtf(date, 'full_date_time'), '24/10/2018 10:33:30', 'Vietnamese');
    should.equal(i18n.__dtf(date2, 'full_date_time'), '24/10/2018 00:00:00', 'Vietnamese');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'full_date_time'), '24/10/2018 10:33:30', 'Vietnamese');
    should.equal(i18n.__dtf('2018-10-24 00:00:00', 'full_date_time'), '24/10/2018 00:00:00', 'Vietnamese');
  });

  it('Correct format date', function () {
    let date = new Date(2018, 9, 24, 10, 33, 30, 0);

    i18n.switchLocale('en');
    //with date object
    should.equal(i18n.__dtf(date, 'date'), '10/24/2018', 'English');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'date'), '10/24/2018', 'English');

    i18n.switchLocale('vi');
    //with date object
    should.equal(i18n.__dtf(date, 'date'), '24/10/2018', 'Vietnamese');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'date'), '24/10/2018', 'Vietnamese');
  });

  it('Correct format time', function () {
    let date = new Date(2018, 9, 24, 10, 33, 30, 0);
    let date2 = new Date(2018, 9, 24, 0, 0, 0, 0);

    i18n.switchLocale('en');
    //with date object
    should.equal(i18n.__dtf(date, 'time'), '10:33:30', 'English');
    should.equal(i18n.__dtf(date2, 'time'), '00:00:00', 'English');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'time'), '10:33:30', 'English');
    should.equal(i18n.__dtf('2018-10-24 00:00:00', 'time'), '00:00:00', 'English');

    i18n.switchLocale('vi');
    //with date object
    should.equal(i18n.__dtf(date, 'time'), '10:33:30', 'Vietnamese');
    should.equal(i18n.__dtf(date2, 'time'), '00:00:00', 'Vietnamese');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'time'), '10:33:30', 'Vietnamese');
    should.equal(i18n.__dtf('2018-10-24 00:00:00', 'time'), '00:00:00', 'Vietnamese');
  });

  it('Correct format short date', function () {
    let date = new Date(2018, 9, 24, 10, 33, 30, 0);

    i18n.switchLocale('en');
    //with date object
    should.equal(i18n.__dtf(date, 'short_date'), '10/24', 'English');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'short_date'), '10/24', 'English');

    i18n.switchLocale('vi');
    //with date object
    should.equal(i18n.__dtf(date, 'short_date'), '24/10', 'Vietnamese');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'short_date'), '24/10', 'Vietnamese');
  });

  it('Correct format short time', function () {
    let date = new Date(2018, 9, 24, 10, 33, 30, 0);
    let date2 = new Date(2018, 9, 24, 0, 0, 0, 0);

    i18n.switchLocale('en');
    //with date object
    should.equal(i18n.__dtf(date, 'short_time'), '10:33', 'English');
    should.equal(i18n.__dtf(date2, 'short_time'), '00:00', 'English');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'short_time'), '10:33', 'English');
    should.equal(i18n.__dtf('2018-10-24 00:00:00', 'short_time'), '00:00', 'English');

    i18n.switchLocale('vi');
    //with date object
    should.equal(i18n.__dtf(date, 'short_time'), '10:33');
    should.equal(i18n.__dtf(date2, 'short_time'), '00:00');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'short_time'), '10:33');
    should.equal(i18n.__dtf('2018-10-24 00:00:00', 'short_time'), '00:00');
  });

  it('Correct format short date time', function () {
    let date = new Date(2018, 9, 24, 10, 33, 30, 0);
    let date2 = new Date(2018, 9, 24, 0, 0, 0, 0);

    i18n.switchLocale('en');
    //with date object
    should.equal(i18n.__dtf(date, 'short_date_time'), '10/24 10:33', 'English');
    should.equal(i18n.__dtf(date2, 'short_date_time'), '10/24 00:00', 'English');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'short_date_time'), '10/24 10:33', 'English');
    should.equal(i18n.__dtf('2018-10-24 00:00:00', 'short_date_time'), '10/24 00:00', 'English');

    i18n.switchLocale('vi');
    //with date object
    should.equal(i18n.__dtf(date, 'short_date_time'), '24/10 10:33', 'Vietnamese');
    should.equal(i18n.__dtf(date2, 'short_date_time'), '24/10 00:00', 'Vietnamese');
    //unix input
    should.equal(i18n.__dtf('2018-10-24 10:33:30', 'short_date_time'), '24/10 10:33', 'Vietnamese');
    should.equal(i18n.__dtf('2018-10-24 00:00:00', 'short_date_time'), '24/10 00:00', 'Vietnamese');
  });
});