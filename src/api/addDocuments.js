const AWS = require('aws-sdk');
const { ENV_CONSTANTS } = require("../constants/env.constant");
const { unauthorizedResponse, successResponse, errorResponse } = require("../utils/response");
const { addRecords } = require('../service/db.service');
const {getUserTokenInfo} = require('../service/auth.service')

exports.handler = async (event) => {
  try {
    const userTokenInfo = await getUserTokenInfo(event);
    console.log("userTokenInfo Status:" + userTokenInfo);
    if (userTokenInfo == "TOKEN_EXPIRED") {
      return unauthorizedResponse(ENV_CONSTANTS.UNAUTHORIZED, userTokenInfo);
    }
    const reqPayload = JSON.parse(event.body);
    const result = await addRecords(reqPayload,userTokenInfo);
    console.log(result);
    return successResponse(ENV_CONSTANTS.SUCCESS_CODE, "Records added successfully..!");
  } catch (error) {
    return errorResponse(500, JSON.stringify({ message: "Internal Server Error" }));
  }
};





