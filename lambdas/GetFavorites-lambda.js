const AWS = require('aws-sdk');
const util = require('/opt/nodejs/util-layer');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  if (!event.requestContext.authorizer) {
    util.errorResponse('Authorization not configured', context.awsRequestId, callback);
    return;
  }

  const username = event.requestContext.authorizer.claims['cognito:username'];

  const params = {
    TableName: 'SEF_Favorites',
    Key: {
      'Username': username
    }
  };

  ddb.get(params)
    .promise()
    .then((response) => {
      if (response.Item) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            Favorites: response.Item.Favorites
          }),
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
      } else {
        callback(null, {
          statusCode: 404,
          body: {},
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    })
    .catch((err) => {
      console.error(err);
      util.errorResponse(err.message, context.awsRequestId, callback)
    });
};
