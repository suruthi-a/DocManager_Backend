const AWS = require('aws-sdk');
const { COGNITO_CONSTANTS } = require("../constants/cognito.constant");
const cognito = new AWS.CognitoIdentityServiceProvider({ region: COGNITO_CONSTANTS.REGION });

exports.createUserInCognito = async (reqUser) => {
    const params = {
        ClientId: COGNITO_CONSTANTS.CLIENT_ID,
        Username: reqUser.name,
        Password: reqUser.password,
        UserAttributes: [
            {
                Name: 'email',
                Value: reqUser.email,
            },
            {
                Name: 'name',
                Value: reqUser.name,
            },
        ],
    };

    try {
        const registrationResult = await cognito.signUp(params).promise();
        console.log('Registration successful:', registrationResult);
        return registrationResult;
    }
    catch (err) {
        console.log('Registration error:', err);
        return err;
    }
}

exports.verifyUserInCognito = async (reqData) => {
    const params = {
        ClientId: COGNITO_CONSTANTS.CLIENT_ID,
        ConfirmationCode: reqData.verifycode,
        Username: reqData.username,
      };
    
      try {
        const verificationResult = await cognito.confirmSignUp(params).promise();
        console.log('Email verification successful:', verificationResult);
        return verificationResult;
      }
      catch (err) {
        console.log('Email verification error:', err);
        return err;
    }
}
exports.loginUserInCognito =async(reqData)=>{
    const params = {
        AuthFlow: COGNITO_CONSTANTS.COGNITO_AUTHFLOW,
        ClientId: COGNITO_CONSTANTS.CLIENT_ID,
        AuthParameters: {
          USERNAME: reqData.email ,
          PASSWORD: reqData.password,
        },
      };
    
      try {
        const authResult = await cognito.initiateAuth(params).promise();
        const accessToken = authResult.AuthenticationResult.AccessToken;
        return accessToken;
      }
      catch (err) {
        console.log('login user error:', err);
        return err;
    }
}