/*
event
{
  "id": "1",
  "desc": "my desc",
  "payload": {
      "pay_1":"one",
      "pay_2":"one",
      "pay_3":"one"
  }
}
*/

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DYNAMO_DB_TABLE;

exports.handler = async (event) => {

    console.log("\nENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2))
    console.info("\nEVENT\n" + JSON.stringify(event, null, 2))
    console.warn("Event not processed.")

    var record = {
        "TableName": tableName,
        "Item" : {
            "id": event.Id,
            "ut": event.Ut,
            "event": event
        }
    }

    console.info(record);

    try {
        await dynamodb.put(record).promise();
    } catch (error) {
        throw new Error(`Error in dynamoDB: ${JSON.stringify(error)}`);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
