'use strict';

const EVENT_TYPES = [

    ['apigateway', [ 'resource', 'path', 'httpMethod', 'requestContext' ]],
    ['cloudformation', [ 'StackId', 'RequestType', 'ResourceType', 'RequestId', 'ResourceProperties' ]],
    ['cognito', [ 'datasetName', 'region', 'identityId' ]],
    ['lex', [ 'messageVersion', 'invocationSource', 'userId', 'bot', 'outputDialogMode' ]],
    ['iot-button', [ 'serialNumber', 'clickType' ]],
    ['config', ['configRuleArn', 'configRuleName' ]]
];

function identifySimpleEvent( event ) {

    for( let typeInfo of EVENT_TYPES ) {

        let match = true;

        for( let requiredProperty of typeInfo[1] ) {

            if( event[ requiredProperty ] === undefined ) {

                match = false;
                break;
            }
        }

        if( match ) {

            return {

                type: typeInfo[0]
            };
        }
    }

    // no match
    return;
}

module.exports = {

    identify: identifySimpleEvent
};
