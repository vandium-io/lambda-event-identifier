'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const identifier = require( '../../../lib/identifiers/cloudwatch' );

describe( 'lib/identifiers/cloudwatch', function() {

    describe( '.identify', function() {

        [
            [ 'logs', 'cloudwatch-logs' ],
            [ 'scheduled', 'cloudwatch-scheduled' ],
            'aws.batch',
            'aws.codebuild',
            'aws.codecommit',
            'aws.codedeploy',
            'aws.codepipeline',
            'aws.ec2',
            'aws.autoscaling',
            'aws.ecs',
            'aws.emr',
            'aws.gamelift',
            'aws.glue',
            'aws.guardduty',
            'aws.health',
            'aws.kms',
            'aws.macie',
            'aws.signin',
            'aws.opsworks',
            'aws.sagemaker',
            'aws.sms',
            'aws.ssm',
            'aws.tag',
            'aws.trustedadvisor',
            'aws.workspaces'

        ].forEach( ( testCase ) => {

            let source;
            let sourceFile;

            if( Array.isArray( testCase ) ) {

                source = testCase[0];
                sourceFile = testCase[1];
            }
            else {

                source = testCase;
                sourceFile = 'cloudwatch-' + testCase.split( '.' )[1];
            }

            let event = require( `../json/${sourceFile}.json`  );

            it( `${source} event source`, function() {

                let result = identifier.identify( event );

                expect( result ).to.exist;
                expect( result ).to.eql( { type: 'cloudwatch', source } );
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
