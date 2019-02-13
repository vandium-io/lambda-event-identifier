'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const index = require( '../../lib/index' );

const identifiers = require( '../../lib/identifiers/index' );

describe( 'lib/index', function() {

    describe( '.identify', function() {

        it( 'normal operation', function() {

            // should be identify function
            expect( index.identify ).to.exist;
            expect( index.identify ).to.equal( identifiers.identify );
        });
    });
});
