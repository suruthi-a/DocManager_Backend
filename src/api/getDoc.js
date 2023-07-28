const AWS = require('aws-sdk');
const { ENV_CONSTANTS } = require("../constants/env.constant");
const { unauthorizedResponse, successResponse, errorResponse } = require("../utils/response");
const {getRecords}=require('../service/db.service')

exports.handler = async (event) => {
    const reqPayload = JSON.parse(event.body);
    try {
        const data = await getRecords(reqPayload);
        console.log("data"+data);
        if (data.Item) {
            return successResponse( ENV_CONSTANTS.SUCCESS_CODE,data);
        } else {
            return errorResponse(ENV_CONSTANTS.NOTFOUND, JSON.stringify({ message: "User not found" }))
        }
    } catch (error) {
        return errorResponse(ENV_CONSTANTS.INTERNALSERVER_ERROR, JSON.stringify({ message:error }));
    }
};
