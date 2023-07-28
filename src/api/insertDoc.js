const AWS = require('aws-sdk');
const { ENV_CONSTANTS } = require("../constants/env.constant");
const { unauthorizedResponse, successResponse, errorResponse } = require("../utils/response");
const { addRecords } = require('../service/db.service');

exports.handler = async (event) => {
  const reqPayload = JSON.parse(event.body);
  try {
    const result = await addRecords(reqPayload);
    console.log(result);
    return successResponse(ENV_CONSTANTS.SUCCESS_CODE, "Records added successfully..!");
  } catch (error) {
    return errorResponse(500, JSON.stringify({ message: "Internal Server Error" }));
  }
};





