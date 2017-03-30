'use strict';

const expect = require( 'chai' ).expect;

const identify = require( '../../lib/identify' );

describe( 'lib/identify', function() {

    describe( '.identify', function() {

        [
            [ 'apigateway' ],
            [ 'cloudformation' ],
            [ 'cloudwatch' ],
            [ 'dynamodb' ],
            [ 'kinesis' ],
            [ 'cognito' ],
            [ 'lex' ],
            [ 'sns' ],
            [ 'ses' ],
            [ 'scheduled' ],
            [ 's3 put', 's3-put', 's3' ],
            [ 's3 delete', 's3-delete', 's3' ],

        ].forEach( ( testCase ) => {

            let desc, sourceFile, id;

            if( testCase.length === 1 ) {

                desc = testCase[0];
                sourceFile = testCase[0];
                id = testCase[0];
            }
            else {

                desc = testCase[0];
                sourceFile = testCase[1];
                id = testCase[2];
            }

            let event = require( `./json/${sourceFile}.json`  );

            it( `${desc} event source`, function() {

                expect( identify( event ) ).to.equal( id );
            });
        });

        it( 'other record based event source', function() {

            let event = {
                "Records": [
                    {
                        "eventVersion": "2.0",
                        "eventTime": "1972-01-01T00:00:00.000Z",
                        "requestParameters": {
                            "sourceIPAddress": "127.0.0.1"
                        },
                        "whatever": {
                        },
                        "awsRegion": "us-east-1",
                        "eventName": "ObjectCreated:Put",
                        "userIdentity": {
                            "principalId": "EXAMPLE"
                        },
                        "eventSource": "aws:whatever"
                    }
                ]
            };

            expect( identify( event ) ).to.equal( 'whatever' );
        });

        it( 'other record based event with "eventSource" with out "aws:xxxxx"', function() {

            let event = {
                "Records": [
                    {
                        "eventVersion": "2.0",
                        "eventTime": "1972-01-01T00:00:00.000Z",
                        "requestParameters": {
                            "sourceIPAddress": "127.0.0.1"
                        },
                        "whatever": {
                        },
                        "awsRegion": "us-east-1",
                        "eventName": "ObjectCreated:Put",
                        "userIdentity": {
                            "principalId": "EXAMPLE"
                        },
                        "eventSource": "whatever"
                    }
                ]
            };

            expect( identify( event ) ).to.equal( 'unknown' );
        });

        it( 'other record based event without "eventSource"', function() {

            let event = {
                "Records": [
                    {
                        "eventVersion": "2.0",
                        "eventTime": "1972-01-01T00:00:00.000Z",
                        "requestParameters": {
                            "sourceIPAddress": "127.0.0.1"
                        },
                        "whatever": {
                        },
                        "awsRegion": "us-east-1",
                        "eventName": "ObjectCreated:Put",
                        "userIdentity": {
                            "principalId": "EXAMPLE"
                        }
                    }
                ]
            };

            expect( identify( event ) ).to.equal( 'unknown' );
        });

        it( 'unknown event', function() {

            let event = {

                whatever: true
            };

            expect( identify( event ) ).to.equal( 'unknown' );
        });
    });
});
