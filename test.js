/*!
 * to-template <https://github.com/jonschlinkert/to-template>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var path = require('path');
var toVinyl = require('to-vinyl');
var toTemplate = require('./');
require('should');
require('mocha');


describe('.toTemplate()', function () {
  describe('errors', function () {
    it('should throw an error when `file` is not an object:', function () {
      (function () {
        toTemplate();
      }).should.throw('to-template expects `file` to be an object');
    });

    it('should throw an error when `file.contents` is not a buffer:', function () {
      (function () {
        toTemplate({});
      }).should.throw('to-template expects `file.contents` to be a buffer or string.');
    });
  });

  describe('properties', function () {
    it('should create a template object from a vinyl file object:', function () {
      var file = toVinyl({path: process.cwd() + '/README.md', content: '---\ntitle: README\n---\nThis is content'});

      toTemplate(file).should.eql({
        history: [path.resolve('./README.md')],
        cwd: path.resolve('.'),
        base: path.resolve('.'),
        content: '---\ntitle: README\n---\nThis is content',
        relative: 'README.md',
        path: path.resolve('./README.md'),
        data: {}
      });
    });
  });
});

