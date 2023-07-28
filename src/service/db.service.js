const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.addRecords=async(reqPayload)=>{
    const params = {
        TableName: 'Records',
        Item: {
            "id": reqPayload.id,
            "title": reqPayload.title,
            "description": reqPayload.description,
            "user_id":reqPayload.user_id
        }
      };
      const data = await dynamoDB.put(params).promise();
      return data;      
}

exports.addUsers=async(reqPayload)=>{
    const params = {
        TableName: 'Users',
        Item: {
            "id": reqPayload.id,
            "name": reqPayload.name,
            "email": reqPayload.email
        }
      };
      const data = await dynamoDB.put(params).promise();
      return data;      
}


exports.getRecords=async(reqPayload)=>{
    const params = {
        TableName: "Records",
        Key: {
            "id": "1",
            "user_id":"1"
        }
    }; 

      const data = await dynamoDB.get(params).promise();
      return data;      
}