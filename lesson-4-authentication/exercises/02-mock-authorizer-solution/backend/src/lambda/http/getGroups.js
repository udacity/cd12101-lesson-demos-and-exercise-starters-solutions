import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const dynamoDbClient = DynamoDBDocument.from(new DynamoDB())

const groupsTable = process.env.GROUPS_TABLE

export async function handler(event) {
  console.log('Processing event: ', event)

  const scanCommand = {
    TableName: groupsTable
  }
  const result = await dynamoDbClient.scan(scanCommand)
  const items = result.Items

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items
    })
  }
}
