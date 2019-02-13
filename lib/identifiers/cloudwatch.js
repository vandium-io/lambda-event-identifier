'use strict';

function identifyCloudWatchEvent( event ) {

    if( event.id && event[ 'detail-type' ] && event.source &&
        event.account && event.time && event.region ) {

        let source = event.source;

        if( source === 'aws.events' ) {

            source = 'scheduled';
        }

        return {

            type: 'cloudwatch',
            source
        };
    }
    else if( event.awslogs && event.awslogs.data ) {

        return {

            type: 'cloudwatch',
            source: 'logs'
        }
    }
    else {

        // no match
        return;
    }
}

module.exports = {

    identify: identifyCloudWatchEvent
};
