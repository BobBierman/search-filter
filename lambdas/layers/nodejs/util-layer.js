// https://medium.com/@anjanava.biswas/nodejs-runtime-environment-with-aws-lambda-layers-f3914613e20e

const consul = (msg) => {
  console.log('consul', msg);
};

const errorResponse = (errorMessage, awsRequestId, callback) => {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};

const notFoundResponse = (awsRequestId, callback) => {
  callback(null, {
    statusCode: 404,
    body: JSON.stringify({
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};

// nodejs uses module.exports and not export
module.exports = {
  consul,
  errorResponse,
  notFoundResponse,
};
