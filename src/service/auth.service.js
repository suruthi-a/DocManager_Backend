const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();
const { CognitoJwtVerifier } = require("aws-jwt-verify");
const { COGNITO_CONSTANTS } = require("../constants/cognito.constant");

exports.getUserTokenInfo = async (event) => {
    let accessToken = event.headers.Authorization;
  
    const verifier = CognitoJwtVerifier.create({
      userPoolId: COGNITO_CONSTANTS.USERPOOL_ID,
      tokenUse: COGNITO_CONSTANTS.TOKEN_USE,
      clientId: COGNITO_CONSTANTS.CLIENT_ID,
      // scope: ENV_COGNITOCONSTANTS.SCOPE,
    });
  
    const useraccessToken = accessToken.split(" ")[1];
    try {
      const userPayload = await verifier.verify(useraccessToken);
      console.log("Token is valid. Payload:", userPayload);
      return userPayload.sub;
    } catch (err) {
      console.log(err);
      //console.log(err);
      return "TOKEN_EXPIRED";
    }
  };