'use strict';

const expect = require( 'chai' ).expect;

const identify = require( '../../lib/identify' );

const identity = require( '../../lib' );

describe( 'lib/index', function() {

    describe( '.identify', function() {

        it( 'normal operation', function() {

            // should be identify function
            expect( identity.identify ).to.equal( identify );
        });
    });
});
