import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const dynamoDbDocument = DynamoDBDocument.from(new DynamoDB())

const groupsTable = process.env.GROUPS_TABLE
const imagesTable = process.env.IMAGES_TABLE

export async function handler(event) {
  console.log('Caller event', event)
  const groupId = event.pathParameters.groupId

  // TODO: Implement this function

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: []
    })
  }
}

async function groupExists(groupId) {
  const result = await dynamoDbDocument.get({
    TableName: groupsTable,
    Key: {
      id: groupId
    }
  })

  console.log('Get group: ', result)
  return !!result.Item
}

async function getImagesPerGroup(groupId) {
    // TODO: Implement this function
}
