import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const dynamoDbDocument = DynamoDBDocument.from(new DynamoDB())

const imagesTable = process.env.IMAGES_TABLE
const imageIdIndex = process.env.IMAGE_ID_INDEX

export async function handler(event) {
  console.log('Caller event', event)
  const imageId = event.pathParameters.imageId

  const result = await dynamoDbDocument
    .query({
      TableName: imagesTable,
      IndexName: imageIdIndex,
      KeyConditionExpression: 'imageId = :imageId',
      ExpressionAttributeValues: {
        ':imageId': imageId
      }
    })

  if (result.Count !== 0) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result.Items[0])
    }
  }

  return {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }
}
