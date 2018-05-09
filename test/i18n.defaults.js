var i18n = require('../i18n').I18n,
  should = require("should"),
  fs = require('fs');

describe('Module Defaults', function() {

  var testScope = {};

  beforeEach(function() {
    testScope = i18n.init({
      locales: ['en', 'de'],
      directory: './defaultlocales'
    });
    testScope.__('Hello');
  });

  afterEach(function() {
    var stats = fs.lstatSync('./defaultlocales');
    should.exist(stats);
    if (stats) {
      try {
        fs.unlinkSync('./defaultlocales/de.json');
        fs.unlinkSync('./defaultlocales/en.json');
        fs.rmdirSync('./defaultlocales');
      } catch (e) {}
    }

  });

  it('should be possible to setup a custom directory', function() {
    var stats = fs.lstatSync('./defaultlocales');
    should.exist(stats);
  });

  it('should be possible to read custom files with default a extension of .json (issue #16)', function() {
    var statsde = fs.lstatSync('./defaultlocales/de.json'),
      statsen = fs.lstatSync('./defaultlocales/en.json');
    should.exist(statsde);
    should.exist(statsen);
  });

});