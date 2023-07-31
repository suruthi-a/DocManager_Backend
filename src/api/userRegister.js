const AWS = require('aws-sdk');
const { ENV_CONSTANTS } = require("../constants/env.constant");
const { COGNITO_CONSTANTS } = require("../constants/cognito.constant");
const { unauthorizedResponse, successResponse, errorResponse } = require("../utils/response");
const { createUserInCognito } = require('../service/cognito.service')

exports.handler = async (event) => {
  const reqUser = JSON.parse(event.body);
  try {
    const addUserToCognito = await createUserInCognito(reqUser);
    console.log('Registration:', addUserToCognito);
    return successResponse(200, addUserToCognito);
  } catch (error) {
    console.error('Registration failed:', error);
    return errorResponse(500, error);
  }
}
