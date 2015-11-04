/*!
 * purl
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * BSD-3-Clause Licensed
 */

/* global describe, it */
'use strict';

var expect = require('expect.js'),
    purl = require('../');

var context = describe;

describe('purl', function () {

  context('on server', function () {

    it('get query param 1', function () {
      expect(purl('http://user:pass@www.google.com:8000/foo/bar/index.html?st=1&lt=10;#/koo9').query("st")).to.be.eql("1");
    });
    it('get query param 2', function () {
      expect(purl('http://user:pass@www.google.com:8000/foo/bar/index.html?st=1&lt=10;#/koo9').query("lt")).to.be.eql("10;");
    });


  });

});

