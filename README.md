[![Build Status](https://travis-ci.org/vandium-io/lambda-event-identifier.svg?branch=master)](https://travis-ci.org/vandium-io/lambda-event-identifier)
[![npm version](https://badge.fury.io/js/lambda-event-identifier.svg)](https://badge.fury.io/js/lambda-event-identifier)

# lambda-event-identifier

Library to identify [AWS Lambda](https://aws.amazon.com/lambda/details) events using [Node.js](https://nodejs.org).

## Features

* Lightweight
* No dependencies

## Installation
Install via npm.

	npm install @vandium/event-identifier --save


## Getting Started

To use the library, call the `identify()` function which will return the service name or `unknown` if the
service cannot be determined.

```js
const identifier = require( '@vandium/event-identifier' );

// handler for s3 events
exports.handler = function( event, context, callback ) {

    if( identifier.indentify( event ) !== 's3' ) {

        return callback( new Error( 'not s3 service!' ) );
    }

    callback( null, 'success!' );
}
```

## Feedback

We'd love to get feedback on how you're using lambda-tester and things we could add to make this tool better. Feel free to contact us at `feedback@vandium.io`

## License

[BSD-3-Clause](https://en.wikipedia.org/wiki/BSD_licenses)
