'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const identifier = require( '../../../lib/identifiers/simple' );

describe( 'lib/identifiers/simple', function() {

    describe( '.identify', function() {

        [
            'apigateway',
            'cloudformation',
            'cognito',
            'lex',
            'iot-button',
            'config'

        ].forEach( ( testCase ) => {

            let event = require( `../json/${testCase}.json`  );

            it( `${testCase} event source`, function() {

                let result = identifier.identify( event );

                expect( result ).to.exist;
                expect( result ).to.eql( { type: testCase } );
            });
        });

        it( 'unknown type', function() {

            // non-cloudwatch event
            let event = require( '../json/s3.json' );

            let result = identifier.identify( event );

            expect( result ).to.not.exist;
        });
    });
});
