'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const index = require( '../../../lib/identifiers/index' );

describe( 'lib/identifiers/record', function() {

    describe( '.identify', function() {

        [
            'apigateway',
            'dynamodb',
            'cloudwatch-ec2'

        ].forEach( ( testCase ) => {

            let event = require( `../json/${testCase}.json`  );

            it( `${testCase} event source`, function() {

                let result = index.identify( event );

                expect( result ).to.exist;

                let name = testCase;

                if( name.startsWith( 'cloudwatch-' ) ) {

                    let source = 'aws.' + name.split( '-', 2 )[1];
                    expect( result ).to.eql( { type: 'cloudwatch', source } );
                }
                else {

                    expect( result ).to.eql( { type: name } );
                }
            });
        });

        it( 'unknown', function() {

            let event = {
                "whatever": {}
            };

            let result = index.identify( event );

            expect( result ).to.exist;
            expect( result ).to.eql( { type: 'unknown' } );
        });

        it( 'invalid event', function() {

            let result = index.identify();

            expect( result ).to.exist;
            expect( result ).to.eql( { type: 'unknown' } );
        });
    });
});
