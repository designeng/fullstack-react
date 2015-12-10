import React from 'react';
import mocha from 'mocha';
import NameManager from '../../src/name-manager.jsx';

var jsdom = require('jsdom');

describe('A', function () {
    beforeEach(function () {
        global.document = jsdom.jsdom();
        global.window = document.parentWindow;
    });

    it('B', function () {
        React.render(React.createElement(NameManager), document.body);
        // assert.equal(document.querySelector('p').innerHTML, 'hello');
    }); 
});