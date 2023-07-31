const { ENV_CONSTANTS } = require("../constants/env.constant");
const { verifyUserInCognito } = require('../service/cognito.service')
const { unauthorizedResponse, successResponse, errorResponse } = require("../utils/response");

exports.handler = async (event) => { 
    const reqUserPayload=JSON.parse(event.body);
     try{
        const verifyUser = await verifyUserInCognito(reqUserPayload);
        return successResponse(ENV_CONSTANTS.SUCCESS_CODE,verifyUser);
      } catch (error) {
        console.error('Email verification failed:', error);
        return errorResponse(ENV_CONSTANTS.INTERNALSERVER_ERROR,error);
      }
}     
    