const { ENV_CONSTANTS } = require("../constants/env.constant");
const { unauthorizedResponse, successResponse, errorResponse } = require("../utils/response");
const { addUsers } = require('../service/db.service');

exports.handler = async (event) => {
  const reqPayload = JSON.parse(event.body);
  try {
    const result = await addUsers(reqPayload);
    console.log(result);
    return successResponse(ENV_CONSTANTS.SUCCESS_CODE, "User Registered Successfully");
  } catch (error) {
    return errorResponse(ENV_CONSTANTS.INTERNALSERVER_ERROR, JSON.stringify({ message: "Internal Server Error" }));
  }
};
