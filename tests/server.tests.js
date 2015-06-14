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

