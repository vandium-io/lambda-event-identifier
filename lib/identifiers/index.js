'use strict';

const IDENTIFIERS = [

    require( './record' ),
    require( './cloudwatch' ),
    require( './simple' )
];

function identify( event ) {

    let result;

    if( event ) {

        for( let identifier of IDENTIFIERS ) {

            result = identifier.identify( event );

            if( result ) {

                break;
            }
        }
    }
    
    if( !result ) {

        result = { type: 'unknown' };
    }

    return result;
}

module.exports = {

    identify
};
