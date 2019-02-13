'use strict';

function identifyRecordEvent( event ) {

    let records = (event.Records || event.records || []);

    let record = records[0];

    if( record ) {

        let type = record.eventSource || record.EventSource;

        if( type ) {

            type = type.split( ':', 2 )[1];
        }
        else if( record.cf ) {

            type = 'cloudfront';
        }
        else if( record.kinesisRecordMetadata ) {

            type = 'kinesis-firehose';
        }

        if( type ) {

            return { type };
        }
    }

    // no match
    return;
}

module.exports = {

    identify: identifyRecordEvent
};
