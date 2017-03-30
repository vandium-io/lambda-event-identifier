'use strict';

function identify( event ) {

    let id = 'unknown';

    if( Array.isArray( event.Records ) ) {

        let record = event.Records[0];

        let type = record.eventSource || record.EventSource;

        if( type ) {

            id = type.split( ':', 2 )[1] || 'unknown';
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

    return id;
}

module.exports = identify;
