const AWS = require('aws-sdk');
const { ENV_CONSTANTS } = require("../constants/env.constant");
const cognito = new AWS.CognitoIdentityServiceProvider({region:'us-east-1'});
const { loginUserInCognito } = require('../service/cognito.service');
const { unauthorizedResponse, successResponse, errorResponse } = require("../utils/response");

exports.handler = async (event) => {
    const reqUser = JSON.parse(event.body);
      try {
        const authResult = await loginUserInCognito(reqUser);
        console.log('User login successful. Access Token:', authResult);
        return successResponse(ENV_CONSTANTS.SUCCESS_CODE,authResult);
      } catch (error) {
        console.error('User login failed:', error);
        return errorResponse(ENV_CONSTANTS.INTERNALSERVER_ERROR,error);
      }
}
