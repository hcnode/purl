/*!
 * purl
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * BSD-3-Clause Licensed
 */

/* global describe, it, before */
'use strict';

var path = require('path'),
    fs = require('fs'),
    expect = require('expect.js'),
    jsdom = require('jsdom');

var context = describe;

function doInBrowser(workTodo) {
  var purl = fs.readFileSync(path.join(__dirname, '../dist/purl.js'), 'utf-8');

  jsdom.env({
    html: '<!doctype html><html><head></head><body></body></html>',
    src: [purl],
    done: function (err, window) {
      if (err) expect().fail(JSON.stringify(err));
      workTodo(window);
    }
  });
}

describe('purl', function () {
  var purl;

  before(function (done) {
    doInBrowser(function (window) {
      purl = window.purl;
      done();
    });
  });

  context('in Browser', function () {

    it('should be defined and be a function', function () {
      expect(purl).to.be.ok();
      expect(purl).to.be.a('function');
    });

    it('should parse a complete URL and return its components', function () {
      expect(purl('http://user:pass@www.google.com:8000/foo/bar/index.html?st=1&lt=10;#/koo9')).to.be.eql({
        origin: 'http://user:pass@www.google.com:8000',
        protocol: 'http:',
        userinfo: 'user:pass',
        username: 'user',
        password: 'pass',
        host: 'www.google.com:8000',
        hostname: 'www.google.com',
        port: '8000',
        pathname: '/foo/bar/index.html',
        search: 'st=1&lt=10;',
        hash: '/koo9'
      });

    });

    it('should parse a URL without port and return its components', function () {
      expect(purl('http://user:pass@www.google.com/foo/bar?st=1&lt=10;#/koo9')).to.be.eql({
        origin: 'http://user:pass@www.google.com',
        protocol: 'http:',
        userinfo: 'user:pass',
        username: 'user',
        password: 'pass',
        host: 'www.google.com',
        hostname: 'www.google.com',
        port: undefined,
        pathname: '/foo/bar',
        search: 'st=1&lt=10;',
        hash: '/koo9'
      });
    });

    it('should parse a URL without port and userinfo and return its components', function () {
      expect(purl('http://www.google.com/foo/bar?st=1&lt=10;#/koo9')).to.be.eql({
        origin: 'http://www.google.com',
        protocol: 'http:',
        userinfo: undefined,
        username: undefined,
        password: undefined,
        host: 'www.google.com',
        hostname: 'www.google.com',
        port: undefined,
        pathname: '/foo/bar',
        search: 'st=1&lt=10;',
        hash: '/koo9'
      });
    });

    it('should parse a URL without port, userinfo and hash and return its components', function () {
      expect(purl('http://www.google.com/foo/bar?st=1&lt=10;')).to.be.eql({
        origin: 'http://www.google.com',
        protocol: 'http:',
        userinfo: undefined,
        username: undefined,
        password: undefined,
        host: 'www.google.com',
        hostname: 'www.google.com',
        port: undefined,
        pathname: '/foo/bar',
        search: 'st=1&lt=10;',
        hash: undefined
      });
    });

    it('should parse a URL without port, userinfo, search and hash and return its components', function () {
      expect(purl('http://www.google.com/foo/bar')).to.be.eql({
        origin: 'http://www.google.com',
        protocol: 'http:',
        userinfo: undefined,
        username: undefined,
        password: undefined,
        host: 'www.google.com',
        hostname: 'www.google.com',
        port: undefined,
        pathname: '/foo/bar',
        search: undefined,
        hash: undefined
      });
    });

    it('should parse a URL without port, userinfo, path, search and hash and return its components', function () {
      expect(purl('http://www.google.com/')).to.be.eql({
        origin: 'http://www.google.com',
        protocol: 'http:',
        userinfo: undefined,
        username: undefined,
        password: undefined,
        host: 'www.google.com',
        hostname: 'www.google.com',
        port: undefined,
        pathname: '/',
        search: undefined,
        hash: undefined
      });
    });

    it('should parse a path with search and hash and return its components', function () {
      expect(purl('/foo/bar?st=1&lt=10#foo')).to.be.eql({
        origin: undefined,
        protocol: undefined,
        userinfo: undefined,
        username: undefined,
        password: undefined,
        host: undefined,
        hostname: undefined,
        port: undefined,
        pathname: '/foo/bar',
        search: 'st=1&lt=10',
        hash: 'foo'
      });
    });

    it('should parse a path with search and no hash and return its components', function () {
      expect(purl('/foo/bar?st=1&lt=10')).to.be.eql({
        origin: undefined,
        protocol: undefined,
        userinfo: undefined,
        username: undefined,
        password: undefined,
        host: undefined,
        hostname: undefined,
        port: undefined,
        pathname: '/foo/bar',
        search: 'st=1&lt=10',
        hash: undefined
      });
    });

    it('should parse a path with no search or hash and return its components', function () {
      expect(purl('/foo/bar')).to.be.eql({
        origin: undefined,
        protocol: undefined,
        userinfo: undefined,
        username: undefined,
        password: undefined,
        host: undefined,
        hostname: undefined,
        port: undefined,
        pathname: '/foo/bar',
        search: undefined,
        hash: undefined
      });
    });

    it('should parse a root path and return its components', function () {
      expect(purl('/')).to.be.eql({
        origin: undefined,
        protocol: undefined,
        userinfo: undefined,
        username: undefined,
        password: undefined,
        host: undefined,
        hostname: undefined,
        port: undefined,
        pathname: '/',
        search: undefined,
        hash: undefined
      });
    });

  });

});

