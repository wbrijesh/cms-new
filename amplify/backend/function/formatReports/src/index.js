exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    //  CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
