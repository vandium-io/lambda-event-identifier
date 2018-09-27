'use strict';

const EVENT_TYPES = [

    ['apigateway', [ 'resource', 'path', 'httpMethod', 'requestContext' ]],
    ['cloudformation', [ 'StackId', 'RequestType', 'ResourceType', 'RequestId', 'ResourceProperties' ]],
    ['scheduled', [ 'account', 'region', 'source', 'id', 'detail-type' ]],
    ['cloudwatch', [ 'awslogs' ]],
    ['cognito', [ 'datasetName', 'region', 'identityId' ]],
    ['lex', [ 'messageVersion', 'invocationSource', 'userId', 'bot', 'outputDialogMode' ]],
    ['iot-button', [ 'serialNumber', 'clickType' ]],
    ['config', ['configRuleArn', 'configRuleName' ]]
];

function firstRecord( event ) {

    let records = event.Records || event.records || [];

    return records[0];
}

function identify( event ) {

    let id = 'unknown';

    let record = firstRecord( event );

    if( record ) {

        let type = record.eventSource || record.EventSource;

        if( type ) {

            id = type.split( ':', 2 )[1] || 'unknown';
        }
        else if( record.cf ) {

            id = 'cloudfront';
        }
        else if( record.kinesisRecordMetadata ) {

            id = 'kinesis-firehose';
        }
    }
    else {

        for( let typeInfo of EVENT_TYPES ) {

            let match = true;

            for( let requiredProperty of typeInfo[1] ) {

                if( event[ requiredProperty ] === undefined ) {

                    match = false;
                    break;
                }
            }

            if( match ) {

                id = typeInfo[0];
                break;
            }
        }
    }

    return id;
}

module.exports = identify;
