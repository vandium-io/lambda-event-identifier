[![Build Status](https://travis-ci.org/vandium-io/lambda-event-identifier.svg?branch=master)](https://travis-ci.org/vandium-io/lambda-event-identifier)
[![npm version](https://badge.fury.io/js/%40vandium%2Fevent-identifier.svg)](https://badge.fury.io/js/%40vandium%2Fevent-identifier)

# @vandium/event-identifier

Library to identify [AWS Lambda](https://aws.amazon.com/lambda/details) events using [Node.js](https://nodejs.org).

## Features

* Lightweight
* No dependencies

## Installation
Install via npm.

	npm install @vandium/event-identifier --save


## Getting Started

To use the library, call the `identify()` function which will return information
about the event. Currently the `type` of the event is set in the object or
`unknown`.

```js
const identifier = require( '@vandium/event-identifier' );

// handler for s3 events
exports.handler = function( event, context, callback ) {

    if( identifier.indentify( event ).type !== 's3' ) {

        return callback( new Error( 'not s3 service!' ) );
    }

    callback( null, 'success!' );
}
```

For CloudWatch events, the object will contain have the `type` set to
`cloudwatch` and the `source` set to the service that fired the event.

## Feedback

We'd love to get feedback on how you're using lambda-tester and things we could add to make this tool better. Feel free to contact us at `feedback@vandium.io`

## License

[BSD-3-Clause](https://en.wikipedia.org/wiki/BSD_licenses)
