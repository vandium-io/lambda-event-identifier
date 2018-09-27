'use strict';

function identify( event ) {

    let id = 'unknown';

    if( Array.isArray( event.Records ) ) {

        let record = event.Records[0];

        let type = record.eventSource || record.EventSource;

        if( type ) {

            id = type.split( ':', 2 )[1] || 'unknown';
        }
        else if( record.cf ) {

            id = 'cloudfront';
        }
        else if( record.messageId && record.md5OfBody ) {

            id = 'sqs';
        }
    }
    else if( Array.isArray( event.records ) ) {

        let record = event.records[0];

        if( record.kinesisRecordMetadata ) {

            id = 'kinesis-firehose';
        }
    }
    else if( event.resource && event.path && event.httpMethod && event.requestContext && event.requestContext.apiId ) {

        id = 'apigateway';
    }
    else if( event.StackId &&
        event.RequestType &&
        event.ResourceType &&
        event.RequestId &&
        (event.ResourceProperties && event.ResourceProperties.StackName) ) {

        id = "cloudformation";
    }
    else if( event.account && event.region && event.source && event.id && event[ 'detail-type' ] ) {

        id = 'scheduled';
    }
    else if( event.awslogs && event.awslogs.data ) {

        id = 'cloudwatch';
    }
    else if( event.datasetName && event.region && event.identityId ) {

        id = 'cognito';
    }
    else if( event.messageVersion && event.invocationSource && event.userId && event.bot && event.outputDialogMode ) {

        id = 'lex';
    }
    else if( event.serialNumber && event.clickType ) {

        id = 'iot-button';
    }
    else if( event.configRuleArn && event.configRuleName ) {

        id = 'config';
    }

    return id;
}

module.exports = identify;
