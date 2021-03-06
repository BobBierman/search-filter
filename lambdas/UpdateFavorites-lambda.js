const AWS = require('aws-sdk');
const util = require('/opt/nodejs/util-layer');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  if (!event.requestContext.authorizer) {
    util.errorResponse('Authorization not configured', context.awsRequestId, callback);
    return;
  }

  // Because we're using a Cognito User Pools authorizer, all of the claims
  // included in the authentication token are provided in the request context.
  // This includes the username as well as other attributes.
  const username = event.requestContext.authorizer.claims['cognito:username'];
  console.log('Received event (', username, '): ', event);

  // The body field of the event in a proxy integration is a raw string.
  // In order to extract meaningful values, we need to first parse this string
  // into an object. A more robust implementation might inspect the Content-Type
  // header first and use a different parsing strategy based on that value.
  const requestBody = JSON.parse(event.body);

  // const pickupLocation = requestBody.PickupLocation;
  const favorites = requestBody.Favorites;

  ddb.put({
    TableName: 'SEF_Favorites',
    Item: {
      Username: username,
      Favorites: favorites,
      UpdateTime: new Date().toISOString()
    },
  })
  .promise()
    .then(() => {
      // You can use the callback function to provide a return value from your Node.js
      // Lambda functions. The first parameter is used for failed invocations. The
      // second parameter specifies the result data of the invocation.

      // Because this Lambda function is called by an API Gateway proxy integration
      // the result object must use the following structure.
      callback(null, {
        statusCode: 201,
        body: JSON.stringify({
          Username: username,
          Favorites: favorites
        }),
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    })
    .catch((err) => {
      console.error(err);

      // If there is an error during processing, catch it and return
      // from the Lambda function successfully. Specify a 500 HTTP status
      // code and provide an error message in the body. This will provide a
      // more meaningful error response to the end client.
      util.errorResponse(err.message, context.awsRequestId, callback)
    });
};
