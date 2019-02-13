'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const identifier = require( '../../../lib/identifiers/record' );

describe( 'lib/identifiers/record', function() {

    describe( '.identify', function() {

        [
            'cloudfront',
            'dynamodb',
            'kinesis-firehose',
            'kinesis',
            's3',
            'ses',
            'sns',
            'sqs'

        ].forEach( ( testCase ) => {

            let event = require( `../json/${testCase}.json`  );

            it( `${testCase} event source`, function() {

                let result = identifier.identify( event );

                expect( result ).to.exist;
                expect( result ).to.eql( { type: testCase } );
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

            let result = identifier.identify( event );

            expect( result ).to.exist;
            expect( result ).to.eql( { type: 'whatever' } );
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

            let result = identifier.identify( event );

            expect( result ).to.not.exist;
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

            let result = identifier.identify( event );

            expect( result ).to.not.exist;
        });

        it( 'No records', function() {

            let event = {
                "Records": []
            };

            let result = identifier.identify( event );

            expect( result ).to.not.exist;
        });

        it( 'unknown type', function() {

            // non-cloudwatch event
            let event = require( '../json/apigateway.json' );

            let result = identifier.identify( event );

            expect( result ).to.not.exist;
        });
    });
});
